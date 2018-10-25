uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  float intensity = 0.;
  intensity = (1. + sin(uv.x * 100. + frame/5.) + cos(uv.y * 50.))/4.;
  vec3 color = vec3(rand(vec2(0.,1.))*sin(uv.y + frame/10.)*cos(uv.y + frame/10.));
  //vec3 color = vec3(vUv.y*rand(vec2(sin(frame/20.)*cos(frame/20.))), vUv.x*rand(vec2(vUv)), vUv.y*rand(vec2(vUv)));

  float x = (uv.x - 0.5)*13.;
  float y = (uv.y - 0.5)*13.;
  float c = rand(vec2(uv));

  float c1 = tan(frame/40.);
  float c2 = 1. + tan(frame/40.);
  float c3 = 2. + tan(frame/40.);
  float c4 = 3. + tan(frame/40.);
  float dist = sqrt(pow(x, 2.) + pow(y, 2.));

  //if (dist < atan(frame/40.)*5.) color = vec3(0.4);
 
  
  if(dist < c4 && dist > c3) color = vec3(rand(vec2(c4)));
  if(dist < c3 && dist > c2) color = vec3(rand(vec2(c3)));
  if(dist < c2 && dist > c1) color = vec3(rand(vec2(c2)));
  if(dist < c1) color = vec3(1.);
  

  gl_FragColor = vec4(color, 1.);
}
