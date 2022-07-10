var Newsfeed = Newsfeed || {};
Newsfeed.ImageLoader = (function() {
    function ImageLoader() {}
    var version_code = "1.0.3.3";

    ImageLoader.prototype.init = function() {

    };

    ImageLoader.prototype.preload = function() {
        var version_code = "1.0.0.2";
        this.path = "./assets/";


        this.game.load.spritesheet('jumpUp', this.path + "pineapple.png", 49, 75, [1, 2]);
        this.game.load.spritesheet('jumpDown', this.path + "pineapple2.png", 49, 75, [3, 4]);
        this.game.load.spritesheet('diamond1', this.path + "diamond1.png", 200, 200, 6);
        this.game.load.spritesheet('diamond2', this.path + "diamond2.png", 200, 200, 6);
        this.game.load.spritesheet('diamond3', this.path + "diamond3.png", 200, 200, 6);


        this.game.load.image('tile', './assets/tile1.png');
        this.game.load.image('tile2', './assets/tile2.png');
        this.game.load.image('tile3', './assets/tile3.png');
        this.game.load.image('tile4', './assets/tile4.png');
        this.game.load.image('tile5', './assets/tile5.png');
        this.game.load.image('tile6', './assets/tile6.png');
        this.game.load.image('tile7', './assets/tile7.png');
        this.game.load.image('tile8', './assets/tile8.png');
        this.game.load.image('tile9', './assets/tile9.png');
        this.game.load.image('bck1', './assets/bck1.png');

        this.game.load.image('bck2', './assets/bck2.png');
        this.game.load.image('bottom', './assets/bottom.png');
        this.game.load.image('dial', './assets/dial.png');
        this.game.load.image('moon', './assets/moon.png');
        this.game.load.image('player', './assets/player.png');
        this.game.load.image('pressstart', './assets/pressstart.png');
        this.game.load.image('selectoption', './assets/selectoption.png');
        this.game.load.image('shoe1', './assets/shoe1.png');
        this.game.load.image('shoe2', './assets/shoe2.png');
        this.game.load.image('stars', './assets/stars.png');
        this.game.load.image('title', './assets/title.png');
        this.game.load.image('watch', './assets/watch.png');
        this.game.load.image('wheel', './assets/wheel.png');

        this.game.load.image('cross', './assets/cross.png');

        this.game.load.image('final', './assets/final.png');
        this.game.load.image('finalbg', './assets/finalbg.png');

        this.game.load.image('logobottom', './assets/logobottom.png');
        this.game.load.image('applebtn', './assets/applebtn.png');
        this.game.load.image('googlebtn', './assets/googlebtn.png');
        this.game.load.image('appgallerybtn', './assets/appgallerybtn.png');

    };

    ImageLoader.prototype.create = function() {
        this.game.state.start("Title");
    };

    return ImageLoader;
})(Newsfeed.ImageLoader || {})