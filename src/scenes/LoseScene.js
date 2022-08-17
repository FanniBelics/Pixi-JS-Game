const loseScene = new PIXI.Container();
const loseStyle = new PIXI.TextStyle({fill: "#000000", fontSize: 30});
const lostfield = new PIXI.Text("You lost!",loseStyle);
lostfield.scale.x = 2;
lostfield.position.x = 100;
lostfield.position.y = 100;
loseScene.addChild(lostfield);

export function createLoseScene(gameScene, app)
{
    app.stage.removeChild(gameScene);
    app.stage.addChild(loseScene);
}