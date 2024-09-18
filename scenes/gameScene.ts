import * as B from "@babylonjs/core";

import groundTexDiffuse from "../textures/groundTexDiffuse.jpg";
import groundTexNormal from "../textures/groundTexNormal.jpg";

function createGround(scene: B.Scene, Babylon: typeof B) {
  const { Color3, Texture, MeshBuilder, StandardMaterial } = Babylon;

  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    scene
  );
  const groundMat = new StandardMaterial("groundMat", scene);
  const diffuseTex = new Texture(groundTexDiffuse, scene);
  const normalTex = new Texture(groundTexNormal, scene);

  groundMat.diffuseTexture = diffuseTex;
  groundMat.bumpTexture = normalTex;

  diffuseTex.uScale = 10;
  diffuseTex.vScale = 10;
  normalTex.uScale = 10;
  normalTex.vScale = 10;

  groundMat.specularColor = new Color3(0, 0, 0);
  ground.material = groundMat;
}

export default async function gameScene(
  Babylon: typeof B,
  engine: B.Engine,
  currentScene: B.Scene
) {
  const {
    Vector3,
    Scene,
    MeshBuilder,
    FreeCamera,
    HemisphericLight,
    SceneLoader,
  } = Babylon;

  const scene = new Scene(engine);
  const camera = new FreeCamera("camera", new Vector3(0, 0, -5), scene);
  new HemisphericLight("light", new Vector3(0, 10, 0), scene);
  MeshBuilder.CreateBox("box", { size: 1.5 }, scene);
  const cameraContainer = MeshBuilder.CreateGround(
    "cameraContainer",
    { width: 0.5, height: 0.5 },
    scene
  );
  /**
   * Create model for character
   */
  try {
    const result = await SceneLoader.ImportMeshAsync(
      "", // Load all meshes
      "./models/", // Path to the models directory
      "character.glb", // Filename of the .glb file
      scene
    );
    console.log("Model loaded successfully", result);
  } catch (error: any) {
    console.error("Failed to load model:", error);
    console.dir(error);
  }
  // const animations = model.animationGroups;
  // const meshes = model.meshes;

  createGround(scene, Babylon);

  cameraContainer.position = new Vector3(0, 15, 0);
  camera.parent = cameraContainer;
  camera.setTarget(new Vector3(0, -10, 0));

  let camVertical = 0;
  let camHorizontal = 0;
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") camVertical = 1;
    if (e.key === "ArrowDown") camVertical = -1;
    if (e.key === "ArrowLeft") camHorizontal = -1;
    if (e.key === "ArrowRight") camHorizontal = 1;

    cameraContainer.locallyTranslate(
      new Vector3(camHorizontal, 0, camVertical)
    );
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") camVertical = 0;
    if (e.key === "ArrowDown") camVertical = 0;
    if (e.key === "ArrowLeft") camHorizontal = 0;
    if (e.key === "ArrowRight") camHorizontal = 0;
  });

  await scene.whenReadyAsync();
  currentScene.dispose();

  return scene;
}
