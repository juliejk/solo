#extension GL_OES_standard_derivatives : enable
uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

float sdline(in vec2 p, in vec2 a, in vec2 b) {
  vec2 pa = p-a, ba = b-a;
  float h = clamp(dot(pa, ba)/dot(ba, ba), .0, 1.);
  return length(pa-ba*h);
}

vec3 line(in vec3 buf, in vec2 a, in vec2 b, in vec2 p, in vec2 w, in vec4 c) {
  float f = sdline(p, a, b);
  float g = fwidth(f)*w.y;
  return mix(buf, c.xyz, c.w*(1.-smoothstep(w.x-g,w.x+g, f)));
}

vec3 hash(float n) {
  return fract(sin(vec3(n, n+1.,n+2.))*43758.5453123);
}

void main() {
  vec2 uv = vUv;
  uv -= vec2(.5,.5);
  uv /= vec2(9./16., 1.)*.5;
  float r = length(uv);
  float a = atan(uv.y, uv.x)+3.1415926;
  vec3 col = vec3(.2,.2,.2)+.1*uv.y;
  col = mix(col, vec3(.9-.4*pow(r,4.)), 1.-smoothstep(.94,.95,r));
  
  vec2 dir = vec2(sin(6.2831*frame), cos(6.2831*frame));
  col = line(col, vec2(.0), dir*.9, uv+.05, vec2(0.005,4.), vec4(.0,.0,.0,.2));
  col = line(col, vec2(.0), dir*0., uv+.05, vec2(0.055,4.), vec4(.0,.0,.0,.2));
  col = line(col, vec2(.0), dir*.9, uv, vec2(0.005,1.), vec4(.5,.0,.0,1.));

  dir = vec2(sin(6.2831*frame/60.), cos(6.2831*frame/60.));
  col = line(col, vec2(.0), dir*.7, uv+.05, vec2(0.015,4.), vec4(.0,.0,.0,.2));
  col = line(col, vec2(.0), dir*.7, uv, vec2(0.015,1.), vec4(.0,.0,.0,1.));

  dir = vec2(sin(6.2831*frame/60./12.), cos(6.2831*frame/60./12.));
  col = line(col, vec2(.0), dir*.4, uv+.05, vec2(0.015,4.), vec4(.0,.0,.0,.2));
  col = line(col, vec2(.0), dir*.4, uv, vec2(0.015,1.), vec4(.0,.0,.0,1.));

  col = mix(col, vec3(.5),1.-smoothstep(.05,.055,r));
  col = mix(col, vec3(.0), 1.-smoothstep(.005,.01,abs(r-.055)));

  col = mix(col, vec3(.0), 1.-smoothstep(.01,.02,abs(r-.95)));
  col += (1./255.)*hash(uv.x+13.*uv.y)/0.5;

  gl_FragColor = vec4(col, 1.);
}
