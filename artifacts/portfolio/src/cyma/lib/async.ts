export function abortError(){return new DOMException('Export cancelled','AbortError')}
// Bound browser/worker waits and release their listeners on every exit path.
export function withDeadline<T>(task:Promise<T>,signal:AbortSignal,ms:number,message:string):Promise<T>{
 return new Promise<T>((resolve,reject)=>{
 let settled=false;const finish=(error:unknown,value?:T)=>{if(settled)return;settled=true;clearTimeout(timer);signal.removeEventListener('abort',abort);if(error)reject(error);else resolve(value as T)};
 const abort=()=>finish(abortError());const timer=setTimeout(()=>finish(Error(message)),ms);
 signal.addEventListener('abort',abort,{once:true});task.then(value=>finish(null,value),error=>finish(error));if(signal.aborted)abort();
 });
}
