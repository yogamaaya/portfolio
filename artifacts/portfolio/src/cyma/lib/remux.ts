import {Muxer,ArrayBufferTarget} from 'mp4-muxer';
// Read the software encoder's one-video-track MP4 and remux its compressed
// samples onto the original audio timeline, including a partial last frame.
type Box={start:number;end:number;type:string};
export function remuxTimed(input:ArrayBuffer,duration:number):ArrayBuffer{
 const v=new DataView(input),bytes=new Uint8Array(input);const u=(p:number)=>v.getUint32(p);
 function boxes(start:number,end:number){const result:Box[]=[];while(start+8<=end){const size=u(start);if(size<8||start+size>end)throw Error('Invalid encoded MP4 structure.');result.push({start,end:start+size,type:String.fromCharCode(...bytes.subarray(start+4,start+8))});start+=size}return result}
 function child(parent:Box,type:string){const found=boxes(parent.start+8,parent.end).find(b=>b.type===type);if(!found)throw Error(`Missing MP4 ${type} box.`);return found}
 const moov=boxes(0,input.byteLength).find(b=>b.type==='moov');if(!moov)throw Error('Encoded video has no movie metadata.');
 const trak=child(moov,'trak'),mdia=child(trak,'mdia'),minf=child(mdia,'minf'),stbl=child(minf,'stbl');
 const stsd=child(stbl,'stsd'),entry=stsd.start+16;const avcc=boxes(entry+86,entry+u(entry)).find(b=>b.type==='avcC');if(!avcc)throw Error('H.264 decoder settings are missing.');
 const width=v.getUint16(entry+32),height=v.getUint16(entry+34);if(!width||!height)throw Error('Encoded video dimensions are missing.');
 const description=bytes.slice(avcc.start+8,avcc.end),codec=`avc1.${Array.from(description.slice(1,4)).map(n=>n.toString(16).padStart(2,'0')).join('')}`;
 const stsz=child(stbl,'stsz'),fixed=u(stsz.start+12),sampleCount=u(stsz.start+16),sizes=Array.from({length:sampleCount},(_,i)=>fixed||u(stsz.start+20+i*4));
 const stsc=child(stbl,'stsc'),map=Array.from({length:u(stsc.start+12)},(_,i)=>({first:u(stsc.start+16+i*12),count:u(stsc.start+20+i*12)}));
 const stco=child(stbl,'stco'),offsets=Array.from({length:u(stco.start+12)},(_,i)=>u(stco.start+16+i*4));const stss=boxes(stbl.start+8,stbl.end).find(b=>b.type==='stss');const keys=stss?new Set(Array.from({length:u(stss.start+12)},(_,i)=>u(stss.start+16+i*4))):null;
 const expected=Math.ceil(Math.round(duration*1e6)*30/1e6);if(sampleCount!==expected)throw Error('The encoder returned an incomplete set of video frames.');
 const muxer=new Muxer({target:new ArrayBufferTarget(),video:{codec:'avc',width,height},fastStart:'in-memory'});
 let sample=0,mapIndex=0;for(let chunk=1;chunk<=offsets.length;chunk++){while(mapIndex+1<map.length&&map[mapIndex+1].first<=chunk)mapIndex++;let pos=offsets[chunk-1];for(let j=0;j<map[mapIndex].count;j++){const size=sizes[sample],ts=Math.round(sample*1e6/30),end=Math.min(Math.round(duration*1e6),Math.round((sample+1)*1e6/30));muxer.addVideoChunkRaw(bytes.slice(pos,pos+size),!keys||keys.has(sample+1)?'key':'delta',ts,end-ts,sample===0?{decoderConfig:{codec,codedWidth:width,codedHeight:height,description}}:undefined);pos+=size;sample++}}
 muxer.finalize();return muxer.target.buffer;
}
