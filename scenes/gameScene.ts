import * as B from "@babylonjs/core";

export default async function gameScene(
  Babylon: typeof B,
  engine: B.Engine,
  currentScene: B.Scene
) {
  const {
    Vector3,
    Scene,
    MeshBuilder,
    StandardMaterial,
    FreeCamera,
    HemisphericLight,
  } = Babylon;

  const scene = new Scene(engine);
  const camera = new FreeCamera("camera", new Vector3(0, 0, -5), scene);
  const light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  const box = MeshBuilder.CreateBox("box", { size: 1.5 }, scene);

  camera.attachControl();

  await scene.whenReadyAsync();
  currentScene.dispose();

  return scene;
}
