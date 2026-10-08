/** @jsxRuntime automatic */
import type { Mesh } from "three";
import { useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { animated } from "@react-spring/three";

function Model() {
  const helicopter = useRef<Mesh>(null);
  const obj = useLoader(OBJLoader, "../../../3d/helicopter.obj");

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    if (helicopter.current) helicopter.current.rotation.y = a;
  });

  return (
    <animated.mesh scale={0.5} ref={helicopter}>
      <meshPhongMaterial color="royalblue" />
      <primitive object={obj} />
    </animated.mesh>
  );
}

export default function HeliHeliCopterCopter() {
  return (
    <Canvas>
      <Model />
      <ambientLight intensity={0.1} />
      <directionalLight />
    </Canvas>
  );
}
