export const EXPORT_WIDTH=1920;
export const EXPORT_HEIGHT=1080;
export const EXPORT_FPS=30;
export const EXPORT_BITRATE=10000000;
// A wide camera crop keeps the circular modes isotropic. Only the optical
// composition changes: an elliptical screen fade and a soft vessel edge.
const smooth=(a:number,b:number,x:number)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
export function wideOpacity(x:number,y:number,width:number,height:number){
 const sx=(x+.5)/width*2-1,sy=(y+.5)/height*2-1;
 const fieldRadius=Math.hypot(sx*1.08,sy*height/width*1.08);
 return (1-smooth(.54,1,Math.hypot(sx,sy)))*(1-smooth(.80,.98,fieldRadius));
}
export function createWideMask(width:number,height:number){
 const mask=document.createElement('canvas');mask.width=width;mask.height=height;const ctx=mask.getContext('2d')!,image=ctx.createImageData(width,height);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++)image.data[(y*width+x)*4+3]=Math.round(255*(1-wideOpacity(x,y,width,height)));
 ctx.putImageData(image,0,0);return mask;
}
