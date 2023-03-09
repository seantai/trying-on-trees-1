import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Vector3 } from "three";
import { Main } from "./Main";
// import { Perf } from "r3f-perf";
const Scene = () => {
  const dummyVec = new Vector3(0, 0, 0);
  useFrame(({ camera }) => {
    camera.lookAt(dummyVec);
  });
  return (
    <>
      <Main />
      <OrthographicCamera
        makeDefault
        zoom={20}
        near={0.01}
        far={1000}
        position={[0, 200, 0]}
      />
    </>
  );
};
export default function App() {
  return (
    <>
      <Canvas>
        <Scene />
        {/* <Perf /> */}
      </Canvas>
    </>
  );
}
