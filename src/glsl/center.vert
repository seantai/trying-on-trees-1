uniform float u_time;
varying vec2 v_uv;
uniform float u_rand1;

#include snoise.glsl

void main() {
  if (u_rand1 > 0.5) {
    v_uv = uv * 1.5;
  } else if (u_rand1 < 0.5) {
    v_uv = uv * 4.;
  };

  float noise2 = snoise(vec3(position.xxy));

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  modelPosition.z += modelPosition.x * noise2 * .15 * sin(u_time);
  modelPosition.y -= modelPosition.x * noise2 * .1 * cos(u_time);
  modelPosition.x -= modelPosition.x * noise2 * .13 * cos(u_time);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}