import {BOWL_PARTIALS,bowlEnvelope,type Analysis,type Preset} from './physics';
export async function analyzeFile(file:File,onProgress:(n:number)=>void):Promise<{analysis:Analysis;buffer:AudioBuffer}>{
if(file.size>50*1024*1024)throw Error('Please choose an audio file smaller than 50 MB.');
const ctx=new OfflineAudioContext(1,1,24000);let buffer:AudioBuffer;
try{buffer=await ctx.decodeAudioData(await file.arrayBuffer())}catch{throw Error('This file could not be decoded. Choose a valid MP3, WAV, or M4A file.')}
if(buffer.duration>480)throw Error('Please choose a track up to 8 minutes long for browser rendering.');
if(buffer.duration<.05)throw Error('This audio file is too short to render.');
const mono=new Float32Array(buffer.length);for(let c=0;c<buffer.numberOfChannels;c++){const channel=buffer.getChannelData(c);for(let i=0;i<mono.length;i++)mono[i]+=channel[i]/buffer.numberOfChannels}
const analysis=await new Promise<Analysis>((resolve,reject)=>{const worker=new Worker('/cyma-assets/analyze-worker.js');worker.onmessage=({data})=>{if(data.error){worker.terminate();reject(Error(data.error))}else if(data.result){worker.terminate();resolve(data.result)}else onProgress(data.progress)};worker.onerror=()=>{worker.terminate();reject(Error('Audio processing failed. Try a shorter file.'))};worker.postMessage({samples:mono,sampleRate:buffer.sampleRate,name:file.name},[mono.buffer])});
return {analysis,buffer};
}
export class AudioPlayer {
 timer:ReturnType<typeof setInterval>|null=null;generation=0;
 ctx:AudioContext|null=null;envelopes:GainNode[]=[];nodes:(AudioBufferSourceNode|OscillatorNode)[]=[];gain:GainNode|null=null;
 stop(){this.generation++;if(this.timer)clearInterval(this.timer);this.timer=null;for(const node of this.nodes){try{node.stop();node.disconnect()}catch{}}this.nodes=[];this.envelopes.forEach(node=>node.disconnect());this.envelopes=[];this.gain?.disconnect();this.gain=null}
 // Call from the click handler so browsers can unlock audio during the gesture.
 unlock(){this.ctx??=new AudioContext();return this.ctx.resume()}
 async play(id:Preset,offset:number,buffer?:AudioBuffer){
 this.stop();if(id==='schumann')return;
 const generation=this.generation;await this.unlock();if(generation!==this.generation)return;const ctx=this.ctx!;if(ctx.state!=='running')throw Error('Sound is paused by the browser. Click Enable sound to resume it.');const gain=ctx.createGain();const level=id==='bowl'?.24:id==='custom'?.8:.12;gain.gain.setValueAtTime(0,ctx.currentTime);gain.gain.linearRampToValueAtTime(level,ctx.currentTime+.035);gain.connect(ctx.destination);this.gain=gain;
 if(id==='custom'&&buffer){const source=ctx.createBufferSource();source.buffer=buffer;source.connect(gain);source.start(0,Math.min(offset,buffer.duration-.01));this.nodes.push(source);return}
 if(id==='432'||id==='528'){const o=ctx.createOscillator();o.frequency.value=Number(id);o.connect(gain);o.start();this.nodes.push(o);return}
 if(id==='bowl'){
 const envs=BOWL_PARTIALS.map(([f,a,d])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=f;
 const phase=2*Math.PI*f*offset;o.setPeriodicWave(ctx.createPeriodicWave(new Float32Array([0,Math.sin(phase)]),new Float32Array([0,Math.cos(phase)])));o.connect(g);g.connect(gain);this.envelopes.push(g);this.nodes.push(o);return{o,g,a,d}});
 const curves=(block:number)=>envs.map(({a,d})=>Float32Array.from({length:1801},(_,i)=>a*.55*bowlEnvelope(offset+block+i/60,d)));
 // Build the first curves BEFORE reading the scheduling clock. Scheduling in
 // the past makes browsers clamp the first start and overlap the next block.
 const first=curves(0),start=ctx.currentTime+.12;
 envs.forEach(({o,g},i)=>{g.gain.setValueCurveAtTime(first[i],start,30);o.start(start)});
 let scheduled=30;const schedule=()=>{while(scheduled<ctx.currentTime-start+35){
 // A heavily throttled background tab may miss its lookahead. Resume in the
 // future, preserving oscillator phase, instead of queuing stale envelopes.
 const block=Math.max(scheduled,ctx.currentTime-start+.25),values=curves(block);
 envs.forEach(({g},i)=>g.gain.setValueCurveAtTime(values[i],start+block,30));scheduled=block+30;
 }};schedule();this.timer=setInterval(schedule,10000);
 }

 }
 destroy(){this.stop();this.ctx?.close()}
}
