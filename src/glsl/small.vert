uniform float u_time;
varying vec2 v_uv;
uniform float u_rand1;

#include snoise.glsl

void main() {

  if (u_rand1 > 0.75) {
    v_uv = uv * 4.;
  } else if (u_rand1 > 0.5) {
    v_uv = uv * 3.;
  } else if (u_rand1 > 0.25) {
    v_uv = uv * 2.;
  } else {
    v_uv = uv * 1.;
  };

  float noise = snoise(vec3(position.yyy));

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  if (u_rand1 > .75) {
    modelPosition.z -= modelPosition.x * noise * .2 * cos(u_time);
    modelPosition.x += sin(modelPosition.x * .4);
  } else if (u_rand1 > .5) {
    modelPosition.z -= modelPosition.x * noise * .2 * cos(u_time);
  } else {
    modelPosition.z -= modelPosition.x * noise * .2 * cos(u_time);
    modelPosition.x += sin(modelPosition.x * .8);
  };

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}