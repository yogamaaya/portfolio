import type {ActiveMode} from './physics';
import {previewSize} from './quality';
import {createWideMask} from './composition';
// The fallback integrates persistent particles too. Its actual lower count is
// displayed in the UI; it is never represented as a million-particle GPU run.
export class CanvasSurface {
 mask?:HTMLCanvasElement;ctx:CanvasRenderingContext2D;surface:HTMLCanvasElement;sc:CanvasRenderingContext2D;n=160;imageSize=384;count=16384;
 r:Float32Array;theta:Float32Array;re:Float32Array;im:Float32Array;energy:Float32Array;fx:Float32Array;fy:Float32Array;
 state:Float32Array;illumination:Float32Array;palette=new Uint8ClampedArray(4096*3);lastExposure=-1;density:Float32Array;cache=new Map<number,Float32Array>();image:ImageData;lastTime:number|null=null;accumulator=0;tick=0;
 constructor(public canvas:HTMLCanvasElement,public radial:Float32Array,public offline=false){
 if(offline){this.n=256;this.imageSize=768;this.count=65536}this.state=new Float32Array(this.count*4);this.illumination=new Float32Array(this.n*this.n);
 this.ctx=canvas.getContext('2d',{alpha:false})!;if(!this.ctx)throw Error('A canvas renderer is unavailable on this device.');this.surface=document.createElement('canvas');this.surface.width=this.imageSize;this.surface.height=this.imageSize;this.sc=this.surface.getContext('2d')!;this.image=this.sc.createImageData(this.imageSize,this.imageSize);this.density=new Float32Array(this.imageSize*this.imageSize);
 const size=this.n*this.n;this.r=new Float32Array(size);this.theta=new Float32Array(size);this.re=new Float32Array(size);this.im=new Float32Array(size);this.energy=new Float32Array(size);this.fx=new Float32Array(size);this.fy=new Float32Array(size);
 for(let i=0;i<size;i++){const x=((i%this.n)+.5)/this.n*2-1,y=(Math.floor(i/this.n)+.5)/this.n*2-1;this.r[i]=Math.hypot(x,y);this.theta[i]=Math.atan2(y,x)}this.reset();}
 reset(){this.lastTime=null;this.tick=0;this.accumulator=0;let seed=451;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};for(let i=0;i<this.count;i++){const r=Math.sqrt(rand())*.98,a=rand()*Math.PI*2;this.state.set([r*Math.cos(a),r*Math.sin(a),0,0],i*4)}}
 basis(mode:ActiveMode){let values=this.cache.get(mode.index);if(values)return values;values=new Float32Array(this.n*this.n);for(let i=0;i<values.length;i++){if(this.r[i]>1)continue;const p=this.r[i]*1023,j=Math.floor(p),offset=mode.index*1024;values[i]=(this.radial[offset+j]*(1-(p-j))+this.radial[offset+Math.min(1023,j+1)]*(p-j))*Math.cos(mode.m*this.theta[i])}if(this.cache.size>48)this.cache.delete(this.cache.keys().next().value!);this.cache.set(mode.index,values);return values}
 step(dt:number){const n=this.n,state=this.state,drag=Math.exp(-3.4*dt);let seed=(this.tick++*1664525+451)>>>0;const noise=.0005*Math.sqrt(dt);
 for(let i=0;i<this.count*4;i+=4){let x=state[i],y=state[i+1],vx=state[i+2],vy=state[i+3];const gx=Math.max(0,Math.min(n-1.001,(x*.5+.5)*n-.5)),gy=Math.max(0,Math.min(n-1.001,(y*.5+.5)*n-.5)),j=Math.floor(gy)*n+Math.floor(gx),tx=gx%1,ty=gy%1;
 const ax=(this.fx[j]*(1-tx)+this.fx[j+1]*tx)*(1-ty)+(this.fx[j+n]*(1-tx)+this.fx[j+n+1]*tx)*ty;const ay=(this.fy[j]*(1-tx)+this.fy[j+1]*tx)*(1-ty)+(this.fy[j+n]*(1-tx)+this.fy[j+n+1]*tx)*ty;
 vx=(vx+ax*dt)*drag;vy=(vy+ay*dt)*drag;seed=(Math.imul(seed,1664525)+1013904223)>>>0;x+=vx*dt+(seed/4294967296-.5)*noise;seed=(Math.imul(seed,1664525)+1013904223)>>>0;y+=vy*dt+(seed/4294967296-.5)*noise;
 const r2=x*x+y*y;if(r2>.985*.985){const r=Math.sqrt(r2);const nx=x/r,ny=y/r,out=Math.max(0,vx*nx+vy*ny);x=nx*.985;y=ny*.985;vx-=1.45*out*nx;vy-=1.45*out*ny}state[i]=x;state[i+1]=y;state[i+2]=vx;state[i+3]=vy;
 }}
 draw(modes:ActiveMode[],time:number,exposure:number,width?:number,height?:number){
 const [w,h]=width&&height?[width,height]:previewSize(this.canvas.clientWidth,this.canvas.clientHeight,1,1280);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h}
 this.re.fill(0);this.im.fill(0);for(const mode of modes){if(Math.abs(mode.re)+Math.abs(mode.im)<.00001)continue;const values=this.basis(mode);for(let i=0;i<values.length;i++){this.re[i]+=values[i]*mode.re;this.im[i]+=values[i]*mode.im}}
 const n=this.n;for(let i=0;i<this.energy.length;i++)this.energy[i]=1-Math.exp(-(this.re[i]**2+this.im[i]**2)*8);
 for(let y=1;y<n-1;y++)for(let x=1;x<n-1;x++){const j=y*n+x;let fx=-.024*(this.energy[j+1]-this.energy[j-1])*n*.25,fy=-.024*(this.energy[j+n]-this.energy[j-n])*n*.25;const f=Math.hypot(fx,fy),scale=Math.min(1,1.4/Math.max(1e-8,f));this.fx[j]=fx*scale;this.fy[j]=fy*scale}
 if(this.lastTime!==null&&time<this.lastTime-1e-6)this.reset();const dt=this.lastTime===null?0:Math.max(0,Math.min(this.offline?.1:.05,time-this.lastTime));this.lastTime=time;this.accumulator+=dt;while(this.accumulator>=1/60-1e-8){this.step(1/60);this.accumulator-=1/60}
 const size=this.imageSize;this.density.fill(0);for(let i=0;i<this.count*4;i+=4){const x=(this.state[i]*.5+.5)*(size-2),y=(this.state[i+1]*.5+.5)*(size-2),ix=Math.floor(x),iy=Math.floor(y),tx=x-ix,ty=y-iy,j=iy*size+ix;this.density[j]+=(1-tx)*(1-ty);this.density[j+1]+=tx*(1-ty);this.density[j+size]+=(1-tx)*ty;this.density[j+size+1]+=tx*ty}
 // Light the same wave-energy contours as the GPU. Evaluate optics on the
 // small field, and use a palette for the display raster (no per-pixel exp).
 const illumination=this.illumination,e=this.energy;
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const j=y*n+x;if(this.r[j]>.98){illumination[j]=0;continue}const near=Math.max(e[y*n+Math.max(0,x-2)],e[y*n+Math.min(n-1,x+2)],e[Math.max(0,y-2)*n+x],e[Math.min(n-1,y+2)*n+x]);const gate=Math.max(0,Math.min(1,(near-.004)/.076));illumination[j]=Math.exp(-e[j]/Math.max(.003,near*.24))*gate*gate*(3-2*gate)*.52+e[j]*.035;}
 if(this.lastExposure!==exposure){this.lastExposure=exposure;for(let i=0;i<4096;i++){const light=1-Math.exp(-i/512*exposure);this.palette[i*3]=5+light*250;this.palette[i*3+1]=8+light*205;this.palette[i*3+2]=6+light*116;}}
 const pixels=this.image.data,normalization=size*size/this.count*.30;
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=y*size+x,o=i*4,gx=x/size*(n-1),gy=y/size*(n-1),j=Math.floor(gy)*n+Math.floor(gx),tx=gx%1,ty=gy%1;const contour=(illumination[j]*(1-tx)+illumination[j+1]*tx)*(1-ty)+(illumination[j+n]*(1-tx)+illumination[j+n+1]*tx)*ty;const light=this.density[i]*normalization+contour,index=Math.min(4095,Math.floor(light*512))*3;pixels[o]=this.palette[index];pixels[o+1]=this.palette[index+1];pixels[o+2]=this.palette[index+2];pixels[o+3]=255;}
 this.sc.putImageData(this.image,0,0);const ctx=this.ctx,wide=this.offline&&w>h;ctx.fillStyle=wide?'#000000':'#050806';ctx.fillRect(0,0,w,h);const d=wide?w/1.08:Math.min(w,h)/1.16;ctx.imageSmoothingEnabled=true;ctx.drawImage(this.surface,(w-d)/2,(h-d)/2,d,d);if(wide){if(!this.mask||this.mask.width!==w||this.mask.height!==h)this.mask=createWideMask(w,h);ctx.drawImage(this.mask,0,0);return}ctx.strokeStyle='#71816044';ctx.lineWidth=.8;ctx.beginPath();ctx.arc(w/2,h/2,d*.495,0,Math.PI*2);ctx.stroke();
 }
 reduceQuality(){this.count=Math.max(4096,Math.floor(this.count/2))}
 destroy(){this.cache.clear()}
}
