var Newsfeed = Newsfeed || {};
(function() {
    Newsfeed.Boot = (function() {
        function Boot() {
            this.gameObj = null;
            this.preloadComplete = false;
            this.postLoaderReady = false
        }
        Boot.prototype.init = function() {

            Newsfeed.Global.responsiveObj = new Newsfeed.ResponsiveGame();
            this.dimensions = Newsfeed.Global.responsiveObj.init();
            var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

            Newsfeed.Global.isIOS = iOS;

            this.g = new Phaser.Game(this.dimensions.width, this.dimensions.height, Phaser.CANVAS, "game-sec", {
                create: this.create,
                preload: this.preload,
                rotateMe: this.rotateMe,
                handleFpsProblem: this.handleFpsProblem
            }, false, true);

            Newsfeed.Global.initWidth = 1920;
            Newsfeed.Global.initHeight = 1080;
            Newsfeed.Global.g = this.g;

            this.g.state.add('Title', Newsfeed.Title);

            this.g.state.add('Title2', Newsfeed.Title2);

            this.g.state.add('Game', Newsfeed.Game);

            this.g.state.add('Loader', Newsfeed.ImageLoader);


        };

        Boot.prototype.preload = function() {

        };

        Boot.prototype.create = function() {

            Newsfeed.Global.responsiveObj.notify("subscribe", {
                scene: this,
                props: {
                    orientation: "landscape"
                }
            });

            /* Newsfeed.Global.serverObj.send(ENBD.Global.URL_CREATE, Boot.prototype.setUID.bind(this), null, {

                device: "mobile",

                fresh: true,

                platform: window.platform,

                _code_: "ENBD_c125_x3e"

            }, 'POST', null, false); */

            this.game.state.start("Loader");
        };



        return Boot;
    })();

    var initObj = new Newsfeed.Boot();
    initObj.init();
})(Newsfeed.Boot || {});