export function createGameScene(gameScene)
{
    const background = new PIXI.Container();
				gameScene.addChild(background);

				const players = new PIXI.Container();
				gameScene.addChild(players);

				const bullets = new PIXI.Container();
				gameScene.addChild(bullets);

				const enemies = new PIXI.Container();
				gameScene.addChild(enemies);
 
				const sprite = PIXI.Sprite.from("resources/player.png");
				sprite.position.x = 100;
				sprite.position.y = 150;
				players.addChild(sprite);

				let isMouseFlag = false;
				let lastBulletSpawnTime = 0;
				const spawnSpeed = 250;
				const keysMaps = {};
				const speed = 10;
				const bulletSpeed = 15;
				let player_lives = 3;

				const enemyCount = 10;

				for (let index = 0; index < enemyCount; index++) {
					const enemy = PIXI.Sprite.from("resources/enemy.png");
					enemy.position.x = index * 50;
					enemy.position.y = 50;
					enemies.addChild(enemy);
				}

				document.onkeydown = (event) => {
					keysMaps[event.code] = true;
				};

				document.onkeyup = (event) => {
					keysMaps[event.code] = false;
				};

				document.onmousedown = (event) => {
					isMouseFlag = true;
				};

				document.onmouseup = (event) => {
					isMouseFlag = false;
				};

				return (delay) => {
					if (keysMaps['ArrowLeft'] || keysMaps['KeyA']) {
						sprite.position.x -= delay * speed;
					}
					if (keysMaps['ArrowRight'] || keysMaps['KeyD']) {
						sprite.position.x += delay * speed;
					}
					if (keysMaps['ArrowUp'] || keysMaps['KeyW']) {
						sprite.position.y -= delay * speed;
					}
					if (keysMaps['ArrowDown'] || keysMaps['KeyS']) {
						sprite.position.y += delay * speed;
					}

					if (isMouseFlag) {
						const currentTime = Date.now();

						if ((currentTime - lastBulletSpawnTime) > spawnSpeed) {

							const bullet = PIXI.Sprite.from("resources/bullet.png");
							bullet.position.x = sprite.position.x;
							bullet.position.y = sprite.position.y;
							bullet.scale.x = 0.25;
							bullet.scale.y = 0.25;
							bullets.addChild(bullet);

							lastBulletSpawnTime = currentTime;
						}
					}

					for (let index = 0; index < bullets.children.length; index++) {
						const bullet = bullets.children[index];
						
						bullet.position.y -= bulletSpeed * delay;

						if (bullet.position.y < 0) {
							bullets.removeChild(bullet);
							continue;
						}

						for (const enemy of enemies.children) {
							if (enemy.getBounds().intersects(bullet.getBounds())) {
								enemies.removeChild(enemy);
							}
						}
					}

					for (const enemy of enemies.children) {
						enemy.position.y += 2 * delay;
						if (enemy.position.y >= 500)
						{
							enemy.position.y = 0;
						}

						// itt tudjátok lecsekkolni hogy értintette-e a player sprite valamelyikenemyt és lekezelni az eseményt
						if (sprite.getBounds().intersects(enemy.getBounds()))
						{
							player_lives -=1;
							sprite.position.x = sprite.position.x;
							sprite.position.y = sprite.position.y-60;
						}
					}
				};
}

const loseScene = new PIXI.Container();
			const loseStyle = new PIXI.TextStyle({fill: "#000000", fontSize: 30});
			const lostfield = new PIXI.Text("You lost!",loseStyle);
			lostfield.scale.x = 2;
			lostfield.position.x = 100;
			lostfield.position.y = 100;
			loseScene.addChild(lostfield);

			const winSchene = new PIXI.Container();
			const winStyle = new PIXI.TextStyle({fill: "#ffffff",fontSize: 30});
			const winField = new PIXI.Text("You won! Hurray!",winStyle);
			winField.scale.x = 2;
			winField.position.x = 50;
			winField.position.y = 100;
			winSchene.addChild(winField);
