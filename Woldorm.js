// @ts-check
class Woldorm {
    constructor(game) {
        this.game = game;
        this.headAnimator = new Animator(ASSET_MANAGER.getAsset("./Woldorm_sprite_sheet.png"), 0, 0, 127, 127, 2, 0.15);
        this.body1Animator = new Animator(ASSET_MANAGER.getAsset("./Woldorm_sprite_sheet.png"), 0, 128, 64, 64, 2, 0.15);
        this.body2Animator = new Animator(ASSET_MANAGER.getAsset("./Woldorm_sprite_sheet.png"), 0, 128, 64, 64, 2, 0.15);
        this.body3Animator = new Animator(ASSET_MANAGER.getAsset("./Woldorm_sprite_sheet.png"), 0, 192, 48, 48, 2, 0.15);
        this.tailAnimator = new Animator(ASSET_MANAGER.getAsset("./Woldorm_sprite_sheet.png"), 0, 256, 32, 32, 2, 0.15);
        this.angle = 0;
        this.headPos = {x:448, y:321};
        this.velocity = {x:0, y:0};
        this.currentFrame = 0;
        this.maxSpeed = 3;
       
        this.body1Pos = {x:464, y:336}
        this.body1PrevPos = {x:464, y:336}
        this.body2Pos = {x:464, y:336}
        this.body2PrevPos = {x:464, y:336}
        this.body3Pos = {x:464, y:336}
        this.body3PrevPos = {x:464, y:336}
        this.tailPos = {x:464, y:336}
        this.tailPrevPos = {x:464, y:336}

        this.turnSpeed = Math.random() / 20;
        this.turnDirection = Math.random() < 0.5;
        this.nextChange = 20;
        this.path = [];
    }

    update() {
        this.currentFrame++;
        if (this.currentFrame <= 600)
        {
            this.movement();
        }
        else{
            this.death();
        }
    }

    movement() {
        if (this.currentFrame >= this.nextChange)
        {
            this.turnSpeed = Math.random() / 30;
            this.turnDirection = Math.random() < 0.5;
            this.nextChange = this.currentFrame + Math.random() * 10 + 30;
        }

        if(this.turnDirection)
        {
            this.angle += this.turnSpeed;
        }
        else
        {
            this.angle -= this.turnSpeed;
        }

        this.velocity.x = this.maxSpeed * Math.cos(this.angle);
        this.velocity.y = this.maxSpeed * Math.sin(this.angle);

        this.path.push({x: this.headPos.x, y:this.headPos.y});
        this.headPos.x += this.velocity.x;
        this.headPos.y += this.velocity.y;

        if (this.headPos.x >= 974 || this.headPos.x <= 0
            || this.headPos.y >= 641 || this.headPos.y <= 0)   
        { 
            this.maxSpeed *= -1; 
        }

        if (this.path.length > 21)
        {
            this.body1PrevPos = {x:this.body1Pos.x, y:this.body1Pos.y};
            this.body1Pos.x = this.path[this.path.length - 21].x;
            this.body1Pos.y = this.path[this.path.length - 21].y;
        }
        if (this.path.length > 35)
        {
            this.body2PrevPos = {x:this.body2Pos.x, y:this.body2Pos.y};
            this.body2Pos.x = this.path[this.path.length - 35].x;
            this.body2Pos.y = this.path[this.path.length - 35].y;
        }
        if (this.path.length > 48)
        {
            this.body3PrevPos = {x:this.body3Pos.x, y:this.body3Pos.y};
            this.body3Pos.x = this.path[this.path.length - 48].x;
            this.body3Pos.y = this.path[this.path.length - 48].y;
        }
        if (this.path.length > 59)
        {
            this.tailPrevPos = {x:this.tailPos.x, y:this.tailPos.y};
            this.tailPos.x = this.path[this.path.length - 59].x;
            this.tailPos.y = this.path[this.path.length - 59].y;
        }

        if (this.path.length > 60)
        {
            this.path.splice(0, 1);
        }
    }

    death() {
        if(this.currentFrame == 601)
        {
            this.game.addEntity(new Weekend());
            this.tailAnimator = new Animator(ASSET_MANAGER.getAsset("./bossDeath.png"), 0, 0, 96, 96, 6, 0.15, false);
        }
        else if (this.currentFrame == 655 )
        {
            this.body3Animator = new Animator(ASSET_MANAGER.getAsset("./bossDeath.png"), 0, 0, 96, 96, 6, 0.15, false);
        }
        else if (this.currentFrame == 709 )
        {
            this.body2Animator = new Animator(ASSET_MANAGER.getAsset("./bossDeath.png"), 0, 0, 96, 96, 6, 0.15, false);
        }
        else if (this.currentFrame == 763 )
        {
            this.body1Animator = new Animator(ASSET_MANAGER.getAsset("./bossDeath.png"), 0, 0, 96, 96, 6, 0.15, false);
        }
        else if (this.currentFrame == 817 )
        {
            this.headAnimator = new Animator(ASSET_MANAGER.getAsset("./bossDeath.png"), 0, 0, 96, 96, 6, 0.15, false);
        }
    }

    draw(ctx) {

        let vector = {x:this.tailPos.x - this.tailPrevPos.x, y:this.tailPos.y - this.tailPrevPos.y};
        let angle = Math.atan2(vector.y, vector.x) + 180;
        this.tailAnimator.drawRotatedFrame(this.game.clockTick, ctx, this.tailPos.x, this.tailPos.y, angle);

        vector = {x:this.body3Pos.x - this.body3PrevPos.x, y:this.body3Pos.y - this.body3PrevPos.y};
        angle = Math.atan2(vector.y, vector.x) + 180;
        this.body3Animator.drawRotatedFrame(this.game.clockTick, ctx, this.body3Pos.x, this.body3Pos.y, angle);

        vector = {x:this.body2Pos.x - this.body2PrevPos.x, y:this.body2Pos.y - this.body2PrevPos.y};
        angle = Math.atan2(vector.y, vector.x) + 180;
        this.body2Animator.drawRotatedFrame(this.game.clockTick, ctx, this.body2Pos.x, this.body2Pos.y, angle);

        vector = {x:this.body1Pos.x - this.body1PrevPos.x, y:this.body1Pos.y - this.body1PrevPos.y};
        angle = Math.atan2(vector.y, vector.x) + 180;
        this.body1Animator.drawRotatedFrame(this.game.clockTick, ctx, this.body1Pos.x, this.body1Pos.y, angle);

        angle = Math.atan2(this.velocity.y, this.velocity.x) + 180;
        this.headAnimator.drawRotatedFrame(this.game.clockTick, ctx, this.headPos.x, this.headPos.y, angle);
    }
}