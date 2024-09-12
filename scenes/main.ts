import * as B from "@babylonjs/core";

import gameScene from "./gameScene";
// import homeScene from "./homeScene";

let scene: B.Scene | undefined = undefined;

export default async function main(
  Babylon: typeof B,
  engine: B.Engine,
  currentScene: B.Scene
) {
  //   switch (currentState) {
  //     case "homeScene": {
  //       await homeScene(Babylon, engine, currentScene);
  //       break;
  //     }

  //     case "gameScene": {
  //       await gameScene(Babylon, engine, currentScene);
  //       break;
  //     }
  //   }
  scene = await gameScene(Babylon, engine, currentScene);

  engine.runRenderLoop(() => {
    scene?.render();
  });
}
