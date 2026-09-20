// Windowed spectral analysis. The gate subtracts a local median noise floor;
// it is deliberately optional, because broadband sound can be intentional.
function fft(re,im){const n=re.length;for(let i=1,j=0;i<n;i++){let b=n>>1;for(;j&b;b>>=1)j^=b;j^=b;if(i<j){[re[i],re[j]]=[re[j],re[i]];[im[i],im[j]]=[im[j],im[i]]}}
for(let len=2;len<=n;len<<=1){const a=-2*Math.PI/len,wr=Math.cos(a),wi=Math.sin(a);for(let i=0;i<n;i+=len){let ur=1,ui=0;for(let j=0;j<len/2;j++){const k=i+j,l=k+len/2,vr=re[l]*ur-im[l]*ui,vi=re[l]*ui+im[l]*ur;re[l]=re[k]-vr;im[l]=im[k]-vi;re[k]+=vr;im[k]+=vi;const r=ur*wr-ui*wi;ui=ur*wi+ui*wr;ur=r}}}}
function pick(mag,raw,sr,n){const peaks=[];for(let k=Math.ceil(20*n/sr);k<Math.min(mag.length-1,1800*n/sr);k++){if(mag[k]>0.000001&&mag[k]>=mag[k-1]&&mag[k]>mag[k+1]){const a=Math.log(raw[k-1]+1e-12),b=Math.log(raw[k]+1e-12),c=Math.log(raw[k+1]+1e-12),off=Math.max(-.5,Math.min(.5,.5*(a-c)/(a-2*b+c||1)));peaks.push({f:(k+off)*sr/n,a:mag[k]*Math.min(1.25,Math.exp(-.25*(a-c)*off))})}}
peaks.sort((a,b)=>b.a-a.a);return peaks.slice(0,32)}
self.onmessage=({data})=>{try{const {samples,sampleRate,name}=data,n=8192,hop=512,frames=[],rawFrames=[],wave=[];
const re=new Float64Array(n),im=new Float64Array(n),win=Float64Array.from({length:n},(_,i)=>.5-.5*Math.cos(2*Math.PI*i/(n-1)));
const maxBin=Math.ceil(1800*n/sampleRate)+2,mag=new Float64Array(maxBin),clean=new Float64Array(maxBin),count=Math.ceil(samples.length/hop);
for(let frame=0;frame<count;frame++){re.fill(0);im.fill(0);const start=frame*hop-n/2;for(let j=0;j<n;j++){const x=start+j;if(x>=0&&x<samples.length)re[j]=samples[x]*win[j]}fft(re,im);for(let k=0;k<maxBin;k++)mag[k]=Math.hypot(re[k],im[k])*4/n;
for(let k=0;k<maxBin;k++){const bins=[];for(let d=-10;d<=10;d++){if(Math.abs(d)>2&&k+d>=0&&k+d<maxBin)bins.push(mag[k+d])}bins.sort((a,b)=>a-b);const floor=(bins[Math.floor(bins.length/2)]||0)*.7;clean[k]=mag[k]<.000001?0:Math.max(mag[k]*.22,mag[k]-floor)}
rawFrames.push(pick(mag,mag,sampleRate,n));frames.push(pick(clean,mag,sampleRate,n));if(frame%70===0)self.postMessage({progress:frame/count})}
for(let i=0;i<180;i++){const start=Math.floor(i*samples.length/180),end=Math.floor((i+1)*samples.length/180);let sq=0;for(let j=start;j<end;j++)sq+=samples[j]*samples[j];wave.push(Math.sqrt(sq/Math.max(1,end-start)))}
self.postMessage({result:{duration:samples.length/sampleRate,sampleRate,hop,frames,rawFrames,wave,name}});
}catch(e){self.postMessage({error:e.message||'Audio analysis failed.'})}};
