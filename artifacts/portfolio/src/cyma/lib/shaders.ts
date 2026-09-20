export const quadVertex=`#version 300 es
precision highp float;
out vec2 uv;
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));uv=p;gl_Position=vec4(p*2.-1.,0.,1.);}`;
export const fieldFragment=`#version 300 es
precision highp float;
in vec2 uv;out vec4 color;
uniform sampler2D radial;
uniform vec4 modes[32];uniform int count;
void main(){vec2 p=uv*2.-1.;float r=length(p);if(r>1.){color=vec4(.5,.5,0.,1.);return;}float theta=atan(p.y,p.x),x=r*1023.;int j=int(floor(x));vec2 h=vec2(0.);float c6=cos(6.*theta),c12=2.*c6*c6-1.;
for(int i=0;i<32;i++){if(i>=count)break;vec4 m=modes[i];float a=texelFetch(radial,ivec2(j,int(m.x)),0).r,b=texelFetch(radial,ivec2(min(j+1,1023),int(m.x)),0).r;h+=mix(a,b,fract(x))*(m.y<.5?1.:m.y<6.5?c6:c12)*m.zw;}
color=vec4(clamp(.5+.24*h,0.,1.),1.-exp(-dot(h,h)*8.),1.);}`;
export const forceFragment=`#version 300 es
precision highp float;
in vec2 uv;out vec4 color;uniform sampler2D field;uniform float size;
void main(){vec2 d=vec2(1./size,0.);vec4 h=texture(field,uv);vec2 grad=vec2(texture(field,uv+d.xy).b-texture(field,uv-d.xy).b,texture(field,uv+d.yx).b-texture(field,uv-d.yx).b)*size*.25;
vec2 force=-.024*grad;float a=length(force);force*=min(1.,1.4/max(a,1e-8));color=vec4(vec2(128./255.)+force*(127./255./1.4),h.r,h.b);}`;
export const particleUpdateVertex=`#version 300 es
precision highp float;precision highp int;
layout(location=0) in vec4 state;out vec4 nextState;
uniform sampler2D forceField;uniform float dt;uniform uint tick;uniform int initialize;
uint hash(uint n){n^=n>>16;n*=0x7feb352du;n^=n>>15;n*=0x846ca68bu;n^=n>>16;return n;}
float random(uint n){return float(hash(n))/4294967295.;}
void main(){uint id=uint(gl_VertexID);vec2 p=state.xy,v=state.zw;
if(initialize==1){float r=sqrt(random(id*2u+1u))*.98,theta=random(id*2u+2u)*6.283185307;nextState=vec4(r*cos(theta),r*sin(theta),0.,0.);}
else{vec2 force=(texture(forceField,p*.5+.5).xy*255.-128.)*(1.4/127.);v=(v+force*dt)*exp(-3.4*dt);vec2 noise=vec2(random(id*3u+tick*1664525u),random(id*3u+tick*1013904223u+1u))-.5;
p+=v*dt+noise*(.0005*sqrt(dt));float r=length(p);if(r>.985){vec2 normal=p/r;p=normal*.985;v-=1.45*max(0.,dot(v,normal))*normal;}nextState=vec4(p,v);}
gl_Position=vec4(0.,0.,0.,1.);}`;
export const emptyFragment=`#version 300 es
precision highp float;out vec4 color;void main(){color=vec4(0.);}`;
export const particleDrawVertex=`#version 300 es
precision highp float;
layout(location=0) in vec4 state;uniform vec2 resolution;uniform sampler2D field;uniform float pixelScale;uniform float wide;
out float light;out float tone;
void main(){vec2 p=state.xy;vec4 h=texture(field,p*.5+.5);float z=(h.r-.5)*2.;vec2 screen=p;screen.y+=z*.016;float scale=wide>.5?resolution.x/1.08:min(resolution.x,resolution.y)/1.16;screen*=scale/resolution;gl_Position=vec4(screen,0.,1.);gl_PointSize=pixelScale*(1.1+min(1.,length(state.zw)*14.));light=.22+.78*(1.-h.b);tone=fract(float(gl_VertexID)*.61803398875);}`;
export const particleDrawFragment=`#version 300 es
precision highp float;in float light;in float tone;out vec4 color;uniform float dose;uniform float exposure;uniform float wide;uniform vec2 resolution;
void main(){vec2 p=gl_PointCoord*2.-1.;float a=exp(-dot(p,p)*3.5);if(dot(p,p)>1.)discard;vec3 gold=mix(vec3(.67,.65,.43),vec3(1.,.80,.46),tone);float fade=1.;if(wide>.5){vec2 q=gl_FragCoord.xy/resolution*2.-1.;vec2 fp=q*resolution/(resolution.x/1.08);fade=(1.-smoothstep(.54,1.,length(q)))*(1.-smoothstep(.80,.98,length(fp)));}color=vec4(gold*light,a*dose*exposure*fade);}`;
export const surfaceFragment=`#version 300 es
precision highp float;in vec2 uv;out vec4 color;uniform vec2 resolution;uniform sampler2D field;uniform float exposure;uniform float wide;
void main(){float scale=wide>.5?resolution.x/1.08:min(resolution.x,resolution.y)/1.16;vec2 p=(uv*2.-1.)*resolution/scale;float r=length(p);vec3 bg=vec3(.012,.018,.015);float rim=exp(-abs(r-.991)*600.)*.18+exp(-abs(r-1.02)*500.)*.045;
vec3 c=wide>.5?vec3(0.):bg+rim*vec3(.48,.58,.34);if(r<.98){vec2 q=p*.5+.5;vec4 h=texture(field,q);vec2 d=vec2(2.5/float(textureSize(field,0).x),0.);
float nearby=max(max(texture(field,q+d.xy).b,texture(field,q-d.xy).b),max(texture(field,q+d.yx).b,texture(field,q-d.yx).b));
// Illuminate low-energy contours in the simulated field. This is an optical
// display only: it adds no particles or forces, and silence remains dark.
float node=exp(-h.b/max(.003,nearby*.24))*smoothstep(.004,.08,nearby);
float z=(h.r-.5)*2.;vec3 n=normalize(vec3(-dFdx(z)*100.,-dFdy(z)*100.,1.));float spec=pow(max(0.,dot(n,normalize(vec3(-.3,.4,1.)))),24.);
c+=vec3(1.,.71,.32)*node*.52*exposure+vec3(.40,.52,.37)*h.b*.09*exposure+vec3(.7,.5,.26)*spec*h.b*.12*exposure;}
float fade=wide>.5?(1.-smoothstep(.54,1.,length(uv*2.-1.)))*(1.-smoothstep(.80,.98,r)):1.;color=vec4(c/(1.+c*.45)*fade,1.);}`;
