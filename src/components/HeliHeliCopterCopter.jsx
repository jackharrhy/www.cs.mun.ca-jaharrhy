import { useEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { animated } from "@react-spring/three";

export function loopingFunction(ctx) {
  let { containerElm, canvasElm, c, frame, analyser, frequencyData } = ctx;

  canvasElm.width = containerElm.offsetWidth;
  canvasElm.height = containerElm.offsetHeight;
  frame++;
  analyser.getByteFrequencyData(frequencyData);

  c.translate(canvasElm.width / 2, canvasElm.height / 2);

  for (var i = 0; i < frequencyData.length / 6; i++) {
    c.fillStyle =
      "rgba(" +
      String(
        Math.floor(
          frequencyData[i] + Math.random() * 100 + Math.cos(frame / 9 + i) * 60
        )
      ) +
      "," +
      String(
        Math.floor(
          frequencyData[i] + Math.random() * 100 + Math.sin(frame / 10 + i) * 60
        )
      ) +
      "," +
      String(
        Math.floor(
          frequencyData[i] + Math.random() * 100 + Math.cos(frame / 11 + i) * 60
        )
      ) +
      ",1)";

    c.rotate(i + frame / 5000 + frequencyData[i] / 5000);

    c.fillRect(
      Math.cos((frame + i) / 20) * 50 + frequencyData[i] / 4,
      Math.sin((frame + i) / 20) * 50 + frequencyData[i] / 4,
      20 - i / 300,
      frequencyData[i] * (canvasElm.height / 600) - i / 500
    );
  }

  requestAnimationFrame(loopingFunction.bind(this, ctx));
}

function setupAudioVisualizer() {
  const containerElm = document.body;

  const canvasElm = document.getElementById("canvas");
  const c = canvasElm.getContext("2d");

  const frame = -1;

  const audioElm = document.createElement("audio");
  document.body.appendChild(audioElm);
  const audioContext = new window.AudioContext();
  const audioSrc = audioContext.createMediaElementSource(audioElm);

  const analyser = audioContext.createAnalyser();
  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  audioSrc.connect(analyser);
  analyser.connect(audioContext.destination);

  let ctx = { containerElm, canvasElm, c, frame, analyser, frequencyData };

  const playElm = document.getElementById("play");

  const onPlay = () => {
    playElm.remove();
    loopingFunction(ctx);
    audioElm.play();
  };

  playElm.addEventListener("click", onPlay);
}

function Model() {
  const helicopter = useRef();
  const obj = useLoader(OBJLoader, "../../../3d/helicopter.obj");

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    helicopter.current.rotation.y = a;
  });

  return (
    <animated.mesh scale={0.5} ref={helicopter}>
      <meshPhongMaterial color="royalblue" />
      <primitive object={obj} />
    </animated.mesh>
  );
}

export default function HeliHeliCopterCopter() {
  useEffect(() => {}, []);

  return (
    <Canvas>
      <Model />
      <ambientLight intensity={0.1} />
      <directionalLight />
    </Canvas>
  );
}
