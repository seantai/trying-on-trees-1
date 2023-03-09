varying vec2 v_uv;
uniform sampler2D u_texture;

uniform float u_rand1;
uniform bool u_img2;

#include snoise.glsl

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}

void main() {

  if (u_rand1 > 0.75) {
    gl_FragColor = blur9(u_texture, v_uv, v_uv.yx, vec2(10., 20.));
  } else if (u_rand1 > 0.5) {
    gl_FragColor = blur9(u_texture, v_uv, v_uv.yx, v_uv);
  } else if (u_rand1 > 0.25) {
    gl_FragColor = blur9(u_texture, v_uv.yy, v_uv.yy, vec2(10., 20.));
  } else {
    gl_FragColor = blur9(u_texture, v_uv.yy, v_uv.yy, vec2(20., 4.));
  }

  if (u_rand1 < .5) {
    gl_FragColor = blur9(u_texture, v_uv, v_uv.yx, vec2(10., 20.));
  } else {
    gl_FragColor = blur9(u_texture, v_uv, v_uv, vec2(100., 20.));
  }
}