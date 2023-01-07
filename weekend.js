class Weekend 
{
    constructor()
    {
        this.animator = new Animator(ASSET_MANAGER.getAsset("./theWeekend.png"), 0, 0, 498, 280, 68, 0.07, false);
        this.alpha = 0;
    }

    update()
    {
        if (this.alpha < 1) { this.alpha += 0.01; }
    }

    draw(ctx)
    {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        this.animator.drawFrame(gameEngine.clockTick, ctx, 0, 0, 1024, 780);
        ctx.restore();
    }
}