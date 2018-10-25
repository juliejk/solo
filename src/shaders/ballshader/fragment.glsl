uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

const int MAX_STEPS = 32;
const float EPS = 0.001;
const float END = 100.0;
const float START = 0.0;


float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 opU(vec2 d1, vec2 d2) {
    float m = d1.y;
    if (d1.x > d2.x) m = d2.y;
    return vec2(min(d1.x, d2.x), m);
}

vec2 opS(vec2 d1, vec2 d2) {
    float m = d1.y;
    if (-d1.x < d2.x) m = d2.y;
    return vec2(max(-d1.x, d2.x), m);
}

vec2 opI(vec2 d1, vec2 d2) {
    float m = d1.y;
    if (d1.x < d2.x) m = d2.y;
    return vec2(max(d1.x, d2.x), d1.y);
}

float sphere(vec3 p, float s) {
    return length(p)-s;
}

float box(vec3 p, vec3 b) {
  return length(max(abs(p)-b,0.0));
}

float displace(vec3 p, float d1) {
    float d2 = 0.05*(1.-sin(20.*p.x))*(1.-cos(20.*p.y))*cos(20.*p.z-frame/60.);
    return d1+d2;
}

float diss(vec3 p, float s) {
    float d1 = sphere(p, s); 
    float d2 = 0.05*(sin(15.*p.x)*sin(15.*p.y)*sin(15.*p.z));
    return d1+d2;
}

vec2 sdf(in vec3 p) {
    float size = sin(frame/60.)*cos(frame/60.) + 1.;
    vec2 s1 = vec2(diss((p-vec3(0.5, 0.5, -50.)), size), 1.);
    vec2 s2 = vec2(diss((p-vec3(0.5, -0.5, -50.)), size), 2.);
    vec2 s3 = vec2(diss((p-vec3(-0.5, 0.5, -50.)), size), 3.);
    vec2 s4 = vec2(diss((p-vec3(-0.5, -0.5, -50.)), size), 4.);
    vec2 s5 = vec2(diss((p-vec3(0., 0., -49.5)), size), 5.);
    vec2 s6 = vec2(diss((p-vec3(0., 0., -50.5)), size), 6.);
    vec2 r = opU(s1, s2);
    r = opU(r, s3);
    r = opU(r, s4);
    r = opU(r, s5);
    r = opU(r, s6);
    //vec2 b = vec2(box((p-vec3(0., 0., -50)), vec3(1.5)), 0.);
    //r = opI(r, b);
    return r;
}

vec2 march(vec3 eye, vec3 dir, float s, float e) {
    float d = s;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec2 res = sdf(eye + d * dir);
        if (res.x < EPS) return vec2(d, res.y);
        d += res.x;
        if (d >= e) return vec2(e, 0.);
    }
    return vec2(e, 0.);
}

vec3 rayDir(float fov, vec2 uv) {
    vec2 xy = uv * 2. - 1.;
    xy.y = xy.y / (16. / 9.);
    float z = 2. / tan(radians(fov / 2.));
    return normalize(vec3(xy, -z));
}

vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sdf(vec3(p.x + EPS, p.yz)).x - sdf(vec3(p.x - EPS, p.yz)).x,
        sdf(vec3(p.x, p.y + EPS, p.z)).x - sdf(vec3(p.x, p.y - EPS, p.z)).x,
        sdf(vec3(p.xy, p.z + EPS)).x - sdf(vec3(p.xy, p.z - EPS)).x
    ));
}

vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye, vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    if (dotLN < 0.) return vec3(0., 0., 0.);
    if (dotRV < 0.) return lightIntensity * (k_d * dotLN);
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 amb = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = amb * k_a;
    vec3 pos1 = vec3(0.0, 1.0*frame/100.0, 30.0*frame/2000.0);
    vec3 ints1 = vec3(0.4, 0.4, 0.4);
    vec3 phong = phongContribForLight(k_d, k_s, alpha, p, eye, pos1, ints1);
    color += phong;
    return color;
}

void main() {
    vec3 eye = vec3(sin(frame/50.)*cos(frame/90.)*9., sin(frame/80.)*cos(frame/60.)*9., sin(frame/50.)*cos(frame/50.)*50.);
    vec3 dir = rayDir(60.0, vUv);
    vec2 res = march(eye, dir, START, END);
    vec3 color = vec3(.0);
    if (res.x >= END-EPS) {
        gl_FragColor = vec4(vec3(0.), 1.0);
        return;
    }
    vec3 p = eye + dir * res.x;
    if (res.y == 1.) color = vec3(1., 0., 0.);
    if (res.y == 2.) color = vec3(0., 1., 0.);
    if (res.y == 3.) color = vec3(0., 0., 1.);
    if (res.y == 4.) color = vec3(1., 1., 0.);
    if (res.y == 5.) color = vec3(1., 0., 1.);
    if (res.y == 6.) color = vec3(0., 1., 1.);
    color = phongIllumination(color, color, normalize(vec3(1.0, 1.0, 1.0)), 10.0, p, eye);
    gl_FragColor = vec4(color, 1.0);
}
