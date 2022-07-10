var Newsfeed = Newsfeed || {};
Newsfeed.Title = (function() {
    function Title() {

    };

    Title.prototype.create = function() {
        that = this;

        this.game.stage.backgroundColor = "#316BB6";
        this.meters = 0;
        this.gameStarted = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.charpine = false;
        this.playingJump = false;
        this.dropJump = false;
        this.isJumping = false;
        this.dropJump2 = false;
        this.UPBool = false;
        this.UPLBool = false;
        this.UPRBool = false;
        this.faceLeft = false;
        this.faceRight = false;
        this.yHeightVal = 0;
        this.animJump = null;
        this.animationCompleted = false;
        this.animationCompleted2 = false;
        this.gammaVal = 0;

        this.bckBgTitle1 = this.game.add.sprite(0, 0, "bck1");
        this.bckBgTitle1.anchor.setTo(.5, 1);
        this.bckBgTitle1.name = "bckBgTitle1";
        this.bckBgTitle1.resizeFactor = 8;
        this.bckBgTitle1.x = this.game.canvas.width / 2;
        this.bckBgTitle1.y = this.game.canvas.height;

        this.bckBgTitle2 = this.game.add.sprite(0, 0, "bck2");
        this.bckBgTitle2.anchor.setTo(.5, 1);
        this.bckBgTitle2.name = "bckBgTitle2";
        this.bckBgTitle2.resizeFactor = 8;
        this.bckBgTitle2.x = this.game.canvas.width / 2;
        this.bckBgTitle2.y = this.game.canvas.height;
        this.bckBgTitle2.fixedToCamera = true;

        this.bckBgTitle3 = this.game.add.sprite(0, 0, "bck3");
        this.bckBgTitle3.anchor.setTo(.5, 1);
        this.bckBgTitle3.name = "bckBgTitle3";
        this.bckBgTitle3.resizeFactor = 8;
        this.bckBgTitle3.x = this.game.canvas.width / 2;
        this.bckBgTitle3.y = this.game.canvas.height;

        this.bckBgTitle4 = this.game.add.sprite(0, 0, "bck4");
        this.bckBgTitle4.anchor.setTo(.5, 1.2);
        this.bckBgTitle4.name = "bckBgTitle4";
        this.bckBgTitle4.resizeFactor = 8;
        this.bckBgTitle4.x = this.game.canvas.width / 2;
        this.bckBgTitle4.y = this.game.canvas.height;

        this.board = this.game.add.button(0, this.game.canvas.height * .9, 'board', this.fngameState.bind(this), this, 0, 0, 1);
        this.board.anchor.setTo(.5, 1);
        this.board.x = this.game.canvas.width * .2;
        this.board.name = "board";
        this.board.resizeFactor = 5.5;

        this.footer = this.game.add.sprite(0, 0, "footer");
        this.footer.anchor.setTo(.5, 1);
        this.footer.name = "footer";
        this.footer.resizeFactor = 2.72;
        this.footer.x = this.game.canvas.width / 2;
        this.footer.y = this.game.canvas.height * 1.05;

        this.board.follows = {
            item: this.footer,
            axis: "y",
            Ydirection: -1,
            Yfactor: .6
        };

        this.pineappleIdeal = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'pineapple');
        this.pineappleIdeal.anchor.setTo(.5, 1);
        this.pineappleIdeal.name = "pineappleIdeal";
        this.pineappleIdeal.resizeFactor = 48;
        this.pineappleIdeal.x = this.game.canvas.width / 2;
        this.pineappleIdeal.y = this.game.canvas.height;

        this.pineappleIdeal.animations.add("ideal", Phaser.Animation.generateFrameNames("p", 1, 4, '0000', 2), 5, true);
        this.pineappleIdeal.animations.play("ideal");

        this.pineappleIdeal.follows = {
            item: this.footer,
            axis: "y",
            Ydirection: -1,
            Yfactor: .85
        };

        this.howToPlay = this.game.add.button(0, this.game.canvas.height * .9, 'howToPlay', this.actionOnClick.bind(this), this, 0, 0, 1);
        this.howToPlay.anchor.setTo(.5, 1);
        this.howToPlay.x = this.game.canvas.width / 2;
        this.howToPlay.name = "howToPlay";
        this.howToPlay.resizeFactor = 3;

        this.howToPlay.follows = {
            item: this.footer,
            axis: "y",
            Ydirection: -1,
            Yfactor: .2
        };

        this.audioGr = this.game.add.group();
        this.audioNavigation = this.audioGr.create(0, 0, 'audioNavigation');
        this.audioNavigation.anchor.setTo(.5, 0);
        this.audioNavigation.x = this.game.canvas.width - this.audioNavigation1.width / 2;
        this.audioNavigation.y = this.game.canvas.height * .005;
        this.audioNavigation.Boolean = false;
        if (Newsfeed.Global.soundOnOff) {
            this.audioNavigation.frameName = "mute";
        } else {
            this.audioNavigation.frameName = "sound";
        }

        this.audioNavigation.name = "soundNavigation";
        this.audioNavigation.resizeFactor = 12;
        this.audioNavigation.inputEnabled = true;

        this.audioNavigation.events.onInputDown.add(this.fnaudioNavigation.bind(this), this);

        this.tile1 = this.game.add.sprite(0, 0, "tile");
        this.tile1.anchor.setTo(.5, 1);
        this.tile1.name = "tile";
        this.tile1.resizeFactor = 7;
        this.tile1.x = this.game.canvas.width / 2;

        this.tile1.follows = {
            item: this.audioNavigation,
            axis: "y",
            Ydirection: 1,
            Yfactor: 1.6
        };

        this.tile2 = this.game.add.sprite(0, 0, "tile");
        this.tile2.anchor.setTo(.5, 1);
        this.tile2.name = "tile222";
        this.tile2.resizeFactor = 7;


        this.tile2.follows = {
            item: this.tile1,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 1.6,
            Ydirection: 1,
            Yfactor: 3
        };


        this.instru01 = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'instru');
        this.instru01.anchor.setTo(.5, 1);
        this.instru01.name = "instru01";
        this.instru01.resizeFactor = 9;
        this.instru01.x = this.game.canvas.width / 2;
        /* this.instru01.y = this.game.canvas.height; */


        /* this.instru01 = this.game.add.sprite(0, 0, "instru01");
        this.instru01.anchor.setTo(.5, .7);
        this.instru01.name = "instru01";
        this.instru01.resizeFactor = 9; */

        this.instru01.follows = {
            item: this.tile1,
            axis: "xy",
            Xdirection: 1,
            Xfactor: 1.8,
            Ydirection: 1,
            Yfactor: 3
        };
        this.instru01.animations.add("ideal1", Phaser.Animation.generateFrameNames("p", 1, 4, '0000', 2), 5, true);
        this.instru01.animations.play("ideal1");

        this.crossBtn = this.game.add.button(0, this.game.canvas.height * .9, 'crossBtn', this.actionOnClick2.bind(this), this, 0, 0, 1);
        this.crossBtn.anchor.setTo(.5, 1);
        this.crossBtn.x = this.game.canvas.width * 1.5;
        this.crossBtn.name = "crossBtn";
        this.crossBtn.resizeFactor = 8;

        this.crossBtn.follows = {
            item: this.footer,
            axis: "y",
            Ydirection: -1,
            Yfactor: .2
        };




        this.logo = this.game.add.sprite(0, this.game.canvas.height * .45, "logo");
        this.logo.anchor.setTo(.5, 1);
        this.logo.name = "logo";
        this.logo.resizeFactor = 3;
        this.logo.x = this.game.canvas.width / 2;

        /* this.logo.follows = {
            item: this.tile1,
            axis: "y",
            Ydirection: 1,
            Yfactor: 2.2
        }; */

        var styleintro = { font: "50px font1", fill: "#fff", align: "center" };
        this.textintro = this.game.add.text(0, 0, "SCORE AS HIGH AS YOU CAN", styleintro);
        this.textintro.anchor.setTo(.5);
        this.textintro.name = "textscore11";
        this.textintro.resizeFactor = 3;
        this.textintro.x = this.game.canvas.width * .5;

        this.textintro.follows = {
            item: this.logo,
            axis: "y",
            Ydirection: 1,
            Yfactor: .2
        };
        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });



    };

    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        this.gammaVal = gamma;
    };
    Title.prototype.actionOnClick2 = function() {
        this.game.add.tween(this.tile1).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.tile2).to({ x: this.game.canvas.width * 1.5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.instru01).to({ x: this.game.canvas.width * 1.5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.crossBtn).to({ x: this.game.canvas.width * 1.5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.board).to({ x: this.game.canvas.width * .2 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.logo).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.textintro).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.howToPlay).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle1).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle2).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle3).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle4).to({ x: this.game.canvas.width * .5 }, 200, Phaser.Easing.Cubic.Out, true);

    }

    Title.prototype.actionOnClick = function() {
        this.game.add.tween(this.tile1).to({ x: this.game.canvas.width * .2 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.tile2).to({ x: this.game.canvas.width * .9 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.instru01).to({ x: this.game.canvas.width / 2 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.crossBtn).to({ x: this.game.canvas.width / 2 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.board).to({ x: -this.game.canvas.width }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.logo).to({ x: -this.game.canvas.width }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.textintro).to({ x: -this.game.canvas.width }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.howToPlay).to({ x: -this.game.canvas.width }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle4).to({ x: this.game.canvas.width * .4 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle3).to({ x: this.game.canvas.width * .42 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle2).to({ x: this.game.canvas.width * .44 }, 200, Phaser.Easing.Cubic.Out, true);
        this.game.add.tween(this.bckBgTitle1).to({ x: this.game.canvas.width * .46 }, 200, Phaser.Easing.Cubic.Out, true);
    };

    Title.prototype.fnaudioNavigation = function() {
        switch (this.audioNavigation.frameName) {
            case "mute":
                /* this.bgSoundObj = this.game.add.audio("DecktheHalls02");
                this.bgSoundObj.loopFull(); */
                this.audioNavigation.frameName = "sound";
                Newsfeed.Global.soundOnOff = false;
                break;
            case "sound":
                /* if (this.bgSoundObj) {
                    this.bgSoundObj.stop();
                    this.bgSoundObj.destroy();
                    this.bgSoundObj = null;
                } */
                this.audioNavigation.frameName = "mute";
                Newsfeed.Global.soundOnOff = true;
                break;
        }
    };

    Title.prototype.fngameState = function() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', () => {});
                    }
                })
                .catch(console.error);
        } else {
            // handle regular non iOS 13+ devices
        }
        Newsfeed.Global.responsiveObj.notify("clear", null);
        this.game.state.start("Game");
    }



    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }



    Title.prototype.render = function() {
        /* if (this.gameStarted) {
            this.game.debug.body(this.pineapple);
            this.platforms.forEach(item => {
                this.game.debug.body(item);
            });
        } */
    };

    Title.prototype.resize = function(width, height) {
        Newsfeed.Global.responsiveObj.notify("item-resize", {
            scene: this
        });
    };


    function between(x, min, max) {
        return x >= min && x <= max;
    }


    Title.prototype.update = function() {


    };

    return Title;
})(Newsfeed.Title || {});