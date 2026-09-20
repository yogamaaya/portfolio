export type Preset = '432'|'528'|'schumann'|'bowl'|'custom';
export type Settings = {radius:number;depth:number;damping:number;exposure:number;denoise:boolean;sensitivity:number;particles:number};
export type Peak = {f:number;a:number};
export type Analysis = {duration:number;sampleRate:number;hop:number;frames:Peak[][];rawFrames:Peak[][];wave:number[];name:string};
export type Mode = {m:number;n:number;alpha:number;coupling:number};
export type ActiveMode = {index:number;m:number;re:number;im:number;f:number};
export const MAX_MODES=32;
export const DEFAULTS:Settings={radius:20,depth:5,damping:1,exposure:2.2,denoise:true,sensitivity:3,particles:0};
export const BOWL_PARTIALS=[[174,1,7],[463.3,.62,5],[863,.36,3.6],[1328,.17,2.5],[111,.48,9],[231.7,.32,6]];
export const PRESETS:{id:Preset;label:string;detail:string;hz:string}[]=[
{id:'432',label:'432 Hz · Pure tone',detail:'A single sine drive. Watch the particles gather along its standing-wave structure.',hz:'432'},
{id:'528',label:'528 Hz · Pure tone',detail:'A higher sine drive. The water keeps its momentum as its modes respond.',hz:'528'},
{id:'schumann',label:'Schumann resonance · 7.83 Hz',detail:'A slow 7.83 Hz drive. Explore the vessel’s response to a low-frequency pulse.',hz:'7.83'},
{id:'bowl',label:'Tibetan bowl & gong',detail:'Continuous ringing. A new strike every 12 seconds joins the previous decay.',hz:'MULTI'}];
export function frequency(alpha:number,s:Settings){const k=alpha/(s.radius/1000);return Math.sqrt((9.80665*k+.0728/998.2*k*k*k)*Math.tanh(k*s.depth/1000))/(2*Math.PI)}
// Sum causal strikes. Both amplitude and its first derivative are continuous
// at every boundary; neither oscillator phase nor the prior tail is reset.
export function bowlEnvelope(t:number,decay:number){if(t<0)return 0;let a=0;for(let strike=Math.max(0,Math.floor(t/12)-12);strike<=Math.floor(t/12);strike++){const u=t-12*strike;const attack=1-Math.exp(-u/.09);a+=attack*attack*Math.exp(-u/decay)}return a}
export function presetPeaks(id:Preset,t:number):Peak[]{if(id==='432'||id==='528')return[{f:Number(id),a:.7}];if(id==='schumann')return[{f:7.83,a:.7}];if(id==='bowl')return BOWL_PARTIALS.map(([f,a,d])=>({f,a:a*bowlEnvelope(t,d)}));return[]}
export function peaksAt(data:Analysis|undefined,id:Preset,t:number,clean:boolean):Peak[]{
 if(id!=='custom'||!data)return presetPeaks(id,t);
 const frames=clean?data.frames:data.rawFrames,pos=Math.max(0,t*data.sampleRate/data.hop),index=Math.min(frames.length-1,Math.floor(pos)),mix=pos-Math.floor(pos),a=frames[index]||[],b=frames[Math.min(index+1,frames.length-1)]||[];
 // Interpolate matching spectral ridges; new/disappearing ridges fade in/out.
 const used=new Set<number>(),out:Peak[]=[];
 for(const p of a){let best=-1,dist=9;for(let j=0;j<b.length;j++){const d=Math.abs(b[j].f-p.f);if(d<dist&&!used.has(j)){dist=d;best=j}}if(best>=0){used.add(best);out.push({f:p.f+(b[best].f-p.f)*mix,a:p.a+(b[best].a-p.a)*mix})}else out.push({f:p.f,a:p.a*(1-mix)})}
 for(let j=0;j<b.length;j++)if(!used.has(j))out.push({f:b[j].f,a:b[j].a*mix});return out;
}
// Capillary-gravity modal susceptibility with persistent complex envelopes.
// The carrier-averaged envelope is integrated exactly over each time step.
// Rendering slots retire to zero before reuse; sorting never replaces a live mode.
export class Physics {
 constructor(public modes:Mode[]){}
 resonances:{f:number;w:number;beta:number;c:number}[]=[];config='';
 re=new Float64Array(1360);im=new Float64Array(1360);targetRe=new Float64Array(1360);targetIm=new Float64Array(1360);
 slots=Array.from({length:MAX_MODES},()=>({index:-1,weight:0,retire:false}));lastTime:number|null=null;gain=1;level=0;energy=0;
 reset(){this.re.fill(0);this.im.fill(0);this.slots.forEach(s=>{s.index=-1;s.weight=0;s.retire=false});this.lastTime=null;this.gain=1;this.level=0;this.energy=0}
 solve(peaks:Peak[],s:Settings,t:number,automaticGain=true):ActiveMode[]{
 const key=`${s.radius},${s.depth},${s.damping}`;
 if(this.config!==key){this.config=key;this.resonances=this.modes.map(mode=>{const k=mode.alpha/(s.radius/1000),f=frequency(mode.alpha,s);return{f,w:f*Math.PI*2,beta:(2*1.004e-6*k*k+1)*s.damping,c:(mode.m%6===0?mode.coupling:0)*Math.exp(-.5*(k*.00035)**2)*k*Math.tanh(k*s.depth/1000)/998.2}})}
 if(this.lastTime!==null&&t<this.lastTime-1e-6)this.reset();const dt=this.lastTime===null?1/60:Math.max(0,Math.min(.1,t-this.lastTime));this.lastTime=t;
 const rms=Math.sqrt(peaks.reduce((v,p)=>v+p.a*p.a,0));
 const desiredGain=automaticGain?(rms>1e-7?Math.min(40,.3/Math.max(.0001,rms)):this.gain):1;
 this.gain+=(desiredGain-this.gain)*(1-Math.exp(-dt/(desiredGain<this.gain?.06:.45)));
 const drive=rms<1e-7?0:1-Math.exp(-rms*this.gain*s.sensitivity*2.4);
 this.level+=(drive-this.level)*(1-Math.exp(-dt/(drive>this.level?.035:.24)));
 let norm=0;this.targetRe.fill(0);this.targetIm.fill(0);
 for(let i=0;i<this.modes.length;i++){const q=this.resonances[i];if(!q.c)continue;let re=0,im=0;
 for(const p of peaks){if(p.a<1e-8)continue;const w=2*Math.PI*p.f,d=q.w*q.w-w*w,b=2*q.beta*w,den=d*d+b*b;const amp=p.a*q.c/den;re+=amp*d;im-=amp*b}
 this.targetRe[i]=re;this.targetIm[i]=im;norm+=re*re+im*im;
 }
 // Display amplification is explicit and distinct from the physical susceptibility.
 const scale=this.level/Math.max(1e-12,Math.sqrt(norm));const ranked:{i:number;e:number}[]=[];
 for(let i=0;i<this.modes.length;i++){const q=this.resonances[i];if(!q.c)continue;
 // A physical damping envelope plus 80 ms observation averaging. This retains
 // energy between successive audio windows instead of treating every frame as rest.
 const tau=Math.max(.08,Math.min(.6,1/q.beta));const blend=1-Math.exp(-dt/tau);
 this.re[i]+=(this.targetRe[i]*scale-this.re[i])*blend;this.im[i]+=(this.targetIm[i]*scale-this.im[i])*blend;
 ranked.push({i,e:this.re[i]*this.re[i]+this.im[i]*this.im[i]});}
 ranked.sort((a,b)=>b.e-a.e);const keep=new Set(ranked.slice(0,MAX_MODES).map(v=>v.i));const assigned=new Set(this.slots.filter(s=>s.index>=0).map(s=>s.index));
 for(const slot of this.slots){if(slot.index>=0){const e=this.re[slot.index]**2+this.im[slot.index]**2;slot.retire=!keep.has(slot.index)&&e<(ranked[MAX_MODES-1]?.e||0)*.65;slot.weight+=(Number(!slot.retire)-slot.weight)*(1-Math.exp(-dt/.16));if(slot.retire&&slot.weight<.002){assigned.delete(slot.index);slot.index=-1;slot.weight=0}}
 if(slot.index<0){const next=ranked.find(v=>!assigned.has(v.i)&&v.e>1e-12);if(next){slot.index=next.i;slot.retire=false;assigned.add(next.i)}}}
 const out=this.slots.filter(slot=>slot.index>=0).map(slot=>{const i=slot.index;return{index:i,m:this.modes[i].m,re:this.re[i]*slot.weight,im:this.im[i]*slot.weight,f:this.resonances[i].f}});
 this.energy=out.reduce((v,m)=>v+m.re*m.re+m.im*m.im,0);return out;
 }
}
export function timeLabel(t:number){const s=Math.max(0,t);return `${Math.floor(s/60).toString().padStart(2,'0')}:${Math.floor(s%60).toString().padStart(2,'0')}`}
