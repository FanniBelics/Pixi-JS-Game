const winScene = new PIXI.Container();
const winStyle = new PIXI.TextStyle({fill: "#ffffff",fontSize: 30});
const winField = new PIXI.Text("You won! Hurray!",winStyle);
winField.scale.x = 2;
winField.position.x = 50;
winField.position.y = 100;
winScene.addChild(winField);

export function createWinScene(gameScene, app)
{
    app.stage.removeChild(gameScene);
    app.stage.addChild(winScene);
}