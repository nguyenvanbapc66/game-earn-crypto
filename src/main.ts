import * as Babylon from "@babylonjs/core";

import "./style.css";
import main from "../scenes/main";

(async function App() {
  const canvas = document.querySelector("canvas");

  const engine = new Babylon.Engine(canvas, true);
  const currentScene = new Babylon.Scene(engine);
  new Babylon.FreeCamera("camera1", new Babylon.Vector3(0, 0, 0), currentScene);

  await main(Babylon, engine, currentScene);

  engine.runRenderLoop(() => {
    currentScene.render();
  });
})();
