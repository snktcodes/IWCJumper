var Newsfeed = Newsfeed || {};
Newsfeed.Title = (function() {
    function Title() {

    };

    Title.prototype.create = function() {
        that = this;

        this.bckBg2 = this.game.add.sprite(0, 0, "bck2");
        this.bckBg2.anchor.setTo(.5);
        this.bckBg2.name = "bckBgTitle12";
        this.bckBg2.resizeFactor = 30;
        this.bckBg2.x = this.game.canvas.width / 2;
        this.bckBg2.y = this.game.canvas.height / 2;

        this.moon = this.game.add.sprite(0, 0, "moon");
        this.moon.anchor.setTo(.5);
        this.moon.name = "moon";
        this.moon.resizeFactor = 17;
        this.moon.x = this.game.canvas.width / 2;
        this.moon.y = this.game.canvas.height / 2;

        this.stars = this.game.add.sprite(0, 0, "stars");
        this.stars.anchor.setTo(.5);
        this.stars.name = "stars";
        this.stars.resizeFactor = 17;
        this.stars.x = this.game.canvas.width / 2;
        this.stars.y = this.game.canvas.height / 2;

        this.watch = this.game.add.sprite(0, 0, "watch");
        this.watch.anchor.setTo(.5);
        this.watch.name = "watch";
        this.watch.resizeFactor = 17;
        this.watch.x = this.game.canvas.width / 2;
        this.watch.y = this.game.canvas.height / 2;

        this.wheel = this.game.add.sprite(0, 0, "wheel");
        this.wheel.anchor.setTo(.5);
        this.wheel.name = "wheel";
        this.wheel.resizeFactor = 28;
        this.wheel.x = 0;
        this.wheel.y = this.game.canvas.height * .7;
        this.wheel.angle = 90;

        this.dial = this.game.add.sprite(0, 0, "dial");
        this.dial.anchor.setTo(.85, .5);
        this.dial.name = "dial";
        this.dial.resizeFactor = 35;
        this.dial.x = this.game.canvas.width;
        this.dial.y = this.game.canvas.height * .7;

        this.cross = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height * .2, "cross");
        this.cross.anchor.setTo(.5);
        this.cross.alpha = 0;
        this.cross.name = "cross";
        this.cross.resizeFactor = 8;
        this.cross.x = this.game.canvas.width / 2;
        this.cross.y = this.game.canvas.height * .5;


        this.shoe1 = this.game.add.sprite(0, 0, "shoe1");
        this.shoe1.anchor.setTo(.5);
        this.shoe1.name = "shoe1";
        this.shoe1.resizeFactor = 17;
        this.shoe1.x = this.game.canvas.width / 2;
        this.shoe1.y = this.game.canvas.height / 2;

        this.shoe2 = this.game.add.sprite(0, 0, "shoe2");
        this.shoe2.anchor.setTo(.5);
        this.shoe2.name = "shoe2";
        this.shoe2.resizeFactor = 17;
        this.shoe2.x = this.game.canvas.width / 2;
        this.shoe2.y = this.game.canvas.height / 2;

        var tween2 = this.add.tween(this.shoe1);
        tween2.to({ y: this.shoe1.y + this.shoe1.height * .1 }, 1000, "Linear");
        tween2.repeat(10, 0);
        tween2.yoyo(true);
        var tween3 = this.add.tween(this.shoe2);
        tween3.to({ y: this.shoe2.y + this.shoe2.height * .1 }, 1000, "Linear");
        tween3.repeat(10, 0);
        tween3.yoyo(true);
        tween2.start();
        setTimeout(() => {
            tween3.start();
        }, 600);


        this.player = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height * .2, "player");
        this.player.anchor.setTo(.5);
        this.player.name = "player";
        this.player.resizeFactor = 17;
        this.player.x = this.game.canvas.width / 2;
        this.player.y = this.game.canvas.height * .5;

        var playerX = [(this.cross.x + (this.cross.width * 0.2 / this.cross.scale.x)), (this.cross.x + (this.cross.width * 0.2 / this.cross.scale.x)), this.cross.x, (this.cross.x - (this.cross.width * 0.2 / this.cross.scale.x)), (this.cross.x - (this.cross.width * 0.2 / this.cross.scale.x)), this.game.canvas.width / 2];
        var playerY = [(this.cross.y + (this.cross.height * 0.2 / this.cross.scale.y)), (this.cross.y - (this.cross.height * 0.1 / this.cross.scale.y)), (this.cross.y + (this.cross.height * 0.1 / this.cross.scale.y)), (this.cross.y + (this.cross.height * 0.2 / this.cross.scale.y)), (this.cross.y - (this.cross.height * 0.1 / this.cross.scale.y)), this.game.canvas.height * .5];

        var tween = this.add.tween(this.player);
        tween.to({ x: playerX, y: playerY }, 2500, "Linear");
        tween.repeat(10, 0);
        tween.start();

        this.bottom = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height, "bottom");
        this.bottom.anchor.setTo(.5, 1);
        this.bottom.name = "bottom";
        this.bottom.resizeFactor = 17;
        this.bottom.x = this.game.canvas.width / 2;
        this.bottom.y = this.game.canvas.height;

        this.pressstart = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height, "pressstart");
        this.pressstart.anchor.setTo(.5, 1);
        this.pressstart.name = "pressstart";
        this.pressstart.resizeFactor = 17;
        this.pressstart.x = this.game.canvas.width / 2;
        this.pressstart.y = this.game.canvas.height;
        this.pressstart.inputEnabled = true;
        this.pressstart.events.onInputDown.add(this.gotoGame.bind(this), this);
        //

        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });


    };

    Title.prototype.gotoGame = function() {
        this.game.state.start("Game");
    };

    Title.prototype.resize = function(width, height) {
        Newsfeed.Global.responsiveObj.notify("item-resize", {
            scene: this
        });
    };

    Title.prototype.update = function() {
        this.wheel.angle -= 1;
        this.dial.angle += 1;
    };

    return Title;
})(Newsfeed.Title || {});