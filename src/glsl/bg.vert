uniform float u_time;
varying vec2 v_uv;
uniform float u_rand1;

#include snoise.glsl

void main() {

  if (u_rand1 > 0.75) {
    v_uv = uv * 20.0;
  } else if (u_rand1 > 0.5) {
    v_uv = uv * 10.0;
  } else if (u_rand1 > 0.25) {
    v_uv = uv * 5.0;
  } else {
    v_uv = uv * 2.0;
  }

  float noise = snoise(vec3(position.yyy));

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z -= modelPosition.x * noise * .1 * cos(u_time);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}