import {Muxer,ArrayBufferTarget} from 'mp4-muxer';
import {Physics,peaksAt,type Analysis,type Mode,type Settings} from './physics';
import {Renderer} from './renderer';
import {remuxTimed} from './remux';
import {withDeadline,abortError} from './async';
import {EXPORT_WIDTH as W,EXPORT_HEIGHT as H,EXPORT_FPS as FPS,EXPORT_BITRATE as BITRATE} from './composition';
export async function exportMP4(data:Analysis,settings:Settings,modeData:Mode[],radial:Float32Array,onProgress:(n:number)=>void,signal:AbortSignal,onPhase:(phase:string)=>void=()=>{}):Promise<Blob>{
 const args=[data,settings,modeData,radial,onProgress,signal,onPhase] as const;
 if(signal.aborted)throw abortError();
 if(typeof VideoEncoder!=='undefined'&&typeof VideoFrame!=='undefined'){
 try{const support=await withDeadline(VideoEncoder.isConfigSupported(config),signal,10000,'The video encoder did not respond.');if(support.supported)return await exportNative(...args)}
 catch(error){if(signal.aborted||(error as Error).name==='AbortError')throw abortError();onPhase('Retrying with the compatible encoder…');onProgress(0)}
 }
 return exportSoftware(...args);
}
const config:VideoEncoderConfig={codec:'avc1.420028',width:W,height:H,bitrate:BITRATE,framerate:FPS,latencyMode:'realtime',avc:{format:'avc'}};
async function exportNative(data:Analysis,settings:Settings,modeData:Mode[],radial:Float32Array,onProgress:(n:number)=>void,signal:AbortSignal,onPhase:(phase:string)=>void):Promise<Blob>{
onPhase('Rendering frames…');
const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const renderer=new Renderer(canvas,radial,settings.particles,true);const physics=new Physics(modeData);
const muxer=new Muxer({target:new ArrayBufferTarget(),video:{codec:'avc',width:W,height:H},fastStart:'in-memory',firstTimestampBehavior:'strict'});
let failure:Error|undefined,lastOutput=performance.now(),outputFrames=0;const durationUs=Math.round(data.duration*1e6);const frames=Math.ceil(durationUs*FPS/1e6);
const durations=new Map<number,number>();
const encoder=new VideoEncoder({output:(chunk,meta)=>{try{lastOutput=performance.now();outputFrames++;const bytes=new Uint8Array(chunk.byteLength);chunk.copyTo(bytes);muxer.addVideoChunkRaw(bytes,chunk.type,chunk.timestamp,durations.get(chunk.timestamp)??chunk.duration??33333,meta)}catch(e){failure=e as Error}},error:e=>{failure=e}});
try{encoder.configure(config);for(let i=0;i<frames;i++){
 if(signal.aborted)throw new DOMException('Export cancelled','AbortError');if(failure)throw failure;
 const timestamp=Math.round(i*1e6/FPS),end=Math.min(durationUs,Math.round((i+1)*1e6/FPS)),duration=end-timestamp;
 durations.set(timestamp,duration);const t=timestamp/1e6;
 renderer.draw(physics.solve(peaksAt(data,'custom',t,settings.denoise),settings,t),t,settings.exposure,W,H);
 const frame=new VideoFrame(canvas,{timestamp,duration});try{encoder.encode(frame,{keyFrame:i%60===0})}finally{frame.close()}
 if(i%5===0){onProgress((i+1)/frames*.97);await new Promise(resolve=>setTimeout(resolve,0))}
 while(encoder.encodeQueueSize>8&&!failure&&!signal.aborted){if(performance.now()-lastOutput>45000)throw Error('The video encoder stopped responding.');await new Promise(resolve=>setTimeout(resolve,10))}
 }
 onPhase('Finishing the MP4 file…');onProgress(.98);await withDeadline(encoder.flush(),signal,60000,'The video encoder could not finish the MP4.');if(outputFrames!==frames)throw Error('The video encoder returned incomplete frames.');if(failure)throw failure;if(signal.aborted)throw new DOMException('Export cancelled','AbortError');muxer.finalize();onProgress(1);
 return new Blob([muxer.target.buffer],{type:'video/mp4'});
}finally{if(encoder.state!=='closed')encoder.close();renderer.destroy()}
}

async function exportSoftware(data:Analysis,settings:Settings,modeData:Mode[],radial:Float32Array,onProgress:(n:number)=>void,signal:AbortSignal,onPhase:(phase:string)=>void):Promise<Blob>{
 onPhase('Rendering with the compatible encoder…');
 const worker=new Worker('/cyma-assets/encode-worker.js?v=1080p-wide-1');const canvas=document.createElement('canvas');const renderer=new Renderer(canvas,radial,settings.particles,true),physics=new Physics(modeData);const readback=document.createElement('canvas');readback.width=W;readback.height=H;const ctx=readback.getContext('2d',{willReadFrequently:true})!;
 const ask=(message:object,transfer:Transferable[]=[]):Promise<{mp4?:ArrayBuffer}>=>withDeadline(new Promise((resolve,reject)=>{
 if(signal.aborted){reject(new DOMException('Export cancelled','AbortError'));return}
 const abort=()=>{worker.terminate();reject(new DOMException('Export cancelled','AbortError'))};signal.addEventListener('abort',abort,{once:true});
 worker.onmessage=({data})=>{signal.removeEventListener('abort',abort);if(data.error)reject(Error(data.error));else resolve(data)};
 worker.onerror=()=>{signal.removeEventListener('abort',abort);reject(Error('The software encoder could not start. Try a current desktop browser.'))};worker.postMessage(message,transfer);
 }),signal,90000,'The compatible encoder stopped responding. Please try exporting again.');
 try{await ask({type:'init',width:W,height:H,fps:FPS,kbps:BITRATE/1000});const frames=Math.ceil(Math.round(data.duration*1e6)*FPS/1e6);for(let i=0;i<frames;i++){if(signal.aborted)throw new DOMException('Export cancelled','AbortError');const t=i/FPS;renderer.draw(physics.solve(peaksAt(data,'custom',t,settings.denoise),settings,t),t,settings.exposure,W,H);ctx.drawImage(canvas,0,0);const rgba=ctx.getImageData(0,0,W,H).data;await ask({type:'frame',rgba:rgba.buffer},[rgba.buffer]);onProgress((i+1)/frames*.97)}onPhase('Finishing the MP4 file…');onProgress(.98);const result=await ask({type:'finish'});if(!result.mp4?.byteLength)throw Error('The encoder did not produce an MP4.');const mp4=remuxTimed(result.mp4!,data.duration);onProgress(1);return new Blob([mp4],{type:'video/mp4'});
 }finally{worker.terminate();renderer.destroy()}
}
