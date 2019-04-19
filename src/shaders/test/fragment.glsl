uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

const int steps = 32;
const float eps = .001;
const float end = 100.;
const float start = .0;

float uni(float d1, float d2, float k) { 
  float h = clamp(0.5+0.5*(d2-d1)/k, 0.0, 1.0);
  return mix(d2, d1, h)-k*h*(1.0-h);
}
float subs(float d1, float d2, float k) {
  float h = clamp(0.5-0.5*(d2+d1)/k, 0.0, 1.0);
  return mix(d2, -d1, h)+k*h*(1.0-h);
}
float intsect(float d1, float d2, float k) { 
  float h = clamp(0.5-0.5*(d2-d1)/k, 0.0, 1.0);
  return mix(d2, d1, h)+k*h*(1.0-h);
}

float sphere(vec3 p, float s) { 
  return length(p)-s;
}

float box(vec3 p, vec3 b) { 
  vec3 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

void main() {
    gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(frame / 60.0), 1.0);
}
