import {createGameScene} from "./scenes/GameScene.js";
import "./main.css";

const canvas = document.querySelector("canvas");

const app = new PIXI.Application({
    view: canvas,
    width: 600,
    height: 500,
    backgroundColor: 0xFF000
});


const gameScene = new PIXI.Container();
const updateScene = createGameScene(gameScene, app);

let state = "mainMenu";

const mainScene = new PIXI.Container();

const style = new PIXI.TextStyle({fill: "#00000", fontSize: 20});
const field = new PIXI.Text("Start Game", style);
field.interactive = true;
field.buttonMode = true;
field.scale.x = 2;
field.position.x = 300;
field.position.y = 300;
mainScene.addChild(field);
field.on('click', () => {
    state = "game";
    app.stage.removeChild(mainScene);
    app.stage.addChild(gameScene);
});

app.stage.addChild(mainScene);

app.ticker.add(
    (delay) => {
        if (state === "game") {
            updateScene(delay);
        }
    }
);

console.log("Index hívva")