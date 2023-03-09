import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import centerVert from "./glsl/center.vert";
import centerFrag from "./glsl/center.frag";
import bgVert from "./glsl/bg.vert";
import bgFrag from "./glsl/bg.frag";
import smallVert from "./glsl/small.vert";
import { RepeatWrapping, sRGBEncoding, TextureLoader } from "three";
import { colors } from "./colors";

export const Main = () => {
  const { viewport } = useThree();

  const centerRef = useRef();
  const outerRef = useRef();

  const randBackgroundRotation = useMemo(() => {
    return fxrand();
  }, []);
  const randSmallInstances = useMemo(() => {
    const rand = fxrand();
    return rand > 0.75 ? 70 : rand > 0.5 ? 30 : rand > 0.25 ? 19 : 10;
  }, []);
  const randSmallSegments = useMemo(() => {
    const rand = fxrand();
    return rand > 0.75 ? 30 : rand > 0.5 ? 10 : 4;
  }, []);

  const min = Math.min(viewport.width, viewport.height);
  const smallRadius = min * 0.4;
  const smallScale = min * 0.07;

  useFrame((state, dt) => {
    if (outerRef.current) {
      outerRef.current.rotation.y -= 0.4 * dt;
    }
    if (centerRef.current) {
      centerRef.current.material.uniforms.u_time.value =
        state.clock.elapsedTime;
    }
  });

  const [texture] = useState(() => {
    const index = Math.floor(fxrand() * colors.length);
    const imageUrl = colors[index];
    const image = new TextureLoader().load(`./img/1x512/${imageUrl}`);
    image.wrapS = image.wrapT = RepeatWrapping;
    image.flipY = true;
    image.encoding = sRGBEncoding;
    return image;
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_texture: {
        value: texture,
      },
      u_rand1: {
        value: fxrand(),
      },
    }),
    []
  );

  return (
    <>
      <mesh
        ref={centerRef}
        scale={[viewport.width / 6.4, 6, viewport.width / 6.4]}
      >
        <icosahedronGeometry args={[1, 30]} />
        <shaderMaterial
          vertexShader={centerVert}
          fragmentShader={centerFrag}
          uniforms={uniforms}
        />
      </mesh>

      <mesh
        position-y={-1}
        scale={[viewport.width, viewport.height, 1]}
        rotation={[-Math.PI / 2, 0, randBackgroundRotation * 4 * Math.PI]}
      >
        <planeGeometry args={[5, 5, 20, 20]} />
        <shaderMaterial
          vertexShader={bgVert}
          fragmentShader={bgFrag}
          uniforms={uniforms}
        />
      </mesh>

      <group ref={outerRef}>
        {[...Array(randSmallInstances)].map((_, i) => (
          <group
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / randSmallInstances) * smallRadius,
              0,
              Math.sin((i * Math.PI * 2) / randSmallInstances) * smallRadius,
            ]}
            rotation={[0, (i * Math.PI * 2) / randSmallInstances, 0]}
          >
            <mesh scale={[smallScale, smallScale, smallScale]}>
              <sphereGeometry
                args={[
                  1,
                  randSmallSegments,
                  randSmallSegments,
                  0,
                  Math.PI * 2,
                  0,
                  Math.PI / 2,
                  0,
                ]}
              />
              <shaderMaterial
                vertexShader={smallVert}
                fragmentShader={centerFrag}
                uniforms={uniforms}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
};
