// @ts-check
const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Woldorm_sprite_sheet.png");
ASSET_MANAGER.queueDownload("./bossDeath.png");
ASSET_MANAGER.queueDownload("./theWeekend.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Woldorm(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});
