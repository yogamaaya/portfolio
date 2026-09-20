importScripts('/cyma-assets/vendor/h264-mp4-encoder.web.js');
let encoder;
self.onmessage=async({data})=>{try{if(data.type==='init'){encoder=await HME.createH264MP4Encoder();encoder.width=data.width;encoder.height=data.height;encoder.frameRate=data.fps;encoder.kbps=data.kbps;encoder.speed=8;encoder.groupOfPictures=60;encoder.initialize();self.postMessage({ok:true})}
else if(data.type==='frame'){encoder.addFrameRgba(new Uint8Array(data.rgba));self.postMessage({ok:true})}
else if(data.type==='finish'){encoder.finalize();const mp4=encoder.FS.readFile(encoder.outputFilename);encoder.delete();encoder=null;const bytes=mp4.slice();self.postMessage({mp4:bytes.buffer},[bytes.buffer])}}
catch(e){self.postMessage({error:e.message||'Software encoding failed.'})}};
