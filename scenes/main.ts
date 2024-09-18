import * as B from "@babylonjs/core";

import gameScene from "./gameScene";

let scene: B.Scene | undefined = undefined;

export default async function main(
  Babylon: typeof B,
  engine: B.Engine,
  currentScene: B.Scene
) {
  scene = await gameScene(Babylon, engine, currentScene);

  engine.runRenderLoop(() => {
    scene?.render();
  });
}
