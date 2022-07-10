var Newsfeed = Newsfeed || {};
Newsfeed.Title2 = (function() {
    function Title2() {

    };

    Title2.prototype.create = function() {

        this.finalbg = this.game.add.sprite(0, 0, "finalbg");
        this.finalbg.anchor.setTo(.5, 0);
        this.finalbg.name = "finalbgfinalbg";
        this.finalbg.resizeFactor = 1.4;
        this.finalbg.x = this.game.canvas.width / 2;
        this.finalbg.y = 0;

        this.final = this.game.add.sprite(0, 0, "final");
        this.final.anchor.setTo(.5, 1);
        this.final.name = "final";
        this.final.resizeFactor = 2;
        this.final.x = this.game.canvas.width * .5;
        this.final.y = this.game.canvas.height * .6;

        this.btn1 = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height, "applebtn");
        this.btn1.anchor.setTo(1, 1);
        this.btn1.name = "applebtn";
        this.btn1.resizeFactor = 8;
        this.btn1.x = this.game.canvas.width * .3;
        this.btn1.y = this.final.y + this.final.height * .1;
        this.btn1.inputEnabled = true;
        this.btn1.events.onInputDown.add(this.gotobtn1.bind(this), this);

        this.btn2 = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height, "googlebtn");
        this.btn2.anchor.setTo(.5, 1);
        this.btn2.name = "googlebtn";
        this.btn2.resizeFactor = 8;
        this.btn2.x = this.final.x;
        this.btn2.y = this.final.y + this.final.height * .1;
        this.btn2.inputEnabled = true;
        this.btn2.events.onInputDown.add(this.gotobtn2.bind(this), this);

        this.btn3 = this.game.add.sprite(this.game.canvas.width * .5, this.game.canvas.height, "appgallerybtn");
        this.btn3.anchor.setTo(0, 1);
        this.btn3.name = "appgallerybtn";
        this.btn3.resizeFactor = 8;
        this.btn3.x = this.game.canvas.width * .7;
        this.btn3.y = this.final.y + this.final.height * .1;
        this.btn3.inputEnabled = true;
        this.btn3.events.onInputDown.add(this.gotobtn3.bind(this), this);

        this.bottomlogofinal = this.game.add.sprite(0, 0, "logobottom");
        this.bottomlogofinal.anchor.setTo(.5);
        this.bottomlogofinal.name = "logobottom";
        this.bottomlogofinal.resizeFactor = 2;
        this.bottomlogofinal.x = this.game.canvas.width / 2;
        this.bottomlogofinal.y = this.game.canvas.height * .85;

        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

    };

    Title2.prototype.gotobtn1 = function() {
        document.getElementById('btnCTA1').click();
    };
    Title2.prototype.gotobtn2 = function() {

        document.getElementById('btnCTA2').click();

    };
    Title2.prototype.gotobtn3 = function() {

        document.getElementById('btnCTA3').click();

    };


    Title2.prototype.render = function() {

    };

    Title2.prototype.resize = function(width, height) {
        Newsfeed.Global.responsiveObj.notify("item-resize", {
            scene: this
        });
    };

    Title2.prototype.update = function() {};

    return Title2;
})(Newsfeed.Title2 || {});