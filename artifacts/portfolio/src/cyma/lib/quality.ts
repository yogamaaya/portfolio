// Preview quality is a budget, not a promise to saturate the GPU.
export const AUTO_PARTICLES = 262144;
export const MIN_PARTICLES = 32768;
export const PARTICLE_OPTIONS = [0, 65536, 262144, 2097152, 4194304, 8388608];
export function initialCount(requested:number){return requested===0?AUTO_PARTICLES:PARTICLE_OPTIONS.includes(requested)?requested:AUTO_PARTICLES}
export function nextLowerCount(count:number){return Math.max(MIN_PARTICLES, Math.floor(count/2))}
export function previewSize(width:number,height:number,dpr:number,max:number){
 const ratio=Math.min(1.5,dpr||1),w=Math.max(1,width*ratio),h=Math.max(1,height*ratio);
 const scale=Math.min(1,max/Math.max(w,h),1280/Math.max(w,h),Math.sqrt(1280*960/(w*h)));
 return [Math.max(1,Math.round(w*scale)),Math.max(1,Math.round(h*scale))];
}
