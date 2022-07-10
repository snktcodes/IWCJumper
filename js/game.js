var Newsfeed = Newsfeed || {};
var myCircle;
var emitter;
var emitter0;
var emitterConfetti;
var emitterConfetti1;
Newsfeed.Game = (function() {
    function Game() {

    };

    Game.prototype.create = function() {
        this.gameStarted = false;
        this.effectCtr = 0;
        this.game.stage.backgroundColor = "#316BB6";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.charpine = false;
        this.playingJump = false;
        this.loopBlinkBool = false;
        this.isLevel1 = false;
        this.isLevel2 = false;
        this.isLevel3 = false;
        this.isLevel4 = false;
        this.isLevel5 = false;
        this.isLevel6 = false;
        this.isLevel7 = false;
        this.isLevel8 = false;
        this.isLevel9 = false;
        this.isLevel10 = false;
        this.onFlyBoolComplete = false;
        this.degree = 1;
        this.spaceTileNum = .3;
        this.isVelocityY = 1.05;
        this.gravityY = 1.4;
        this.scoreNum = 0;
        this.firstBool = false;
        this.secondBool = false;
        this.thirdBool = false;
        this.dropJump = false;
        this.isJumping = false;
        this.dropJump2 = false;
        this.ismoveTile = false;
        this.isFlip = false;
        this.isFirst = false;
        this.isMovingLeft = false;
        this.collideOnceDone = false;
        this.isMovingRight = false;
        this.gameOver = false;
        this.startGamma = false;
        this.temp = 0;
        this.firstKill = false;
        this.currentLast = 0;
        this.spaceMtrs = 0;
        this.gammaVal = 0;
        this.bg1Offset = 0;
        this.bg2Offset = 0;
        this.bg3Offset = 0;
        this.bg4Offset = 0;
        this.tilectr = 0;
        this.isnotgetBounds = false;
        this.animationCompleted = false;
        this.animationCompleted2 = false;
        this.tileYMap = [2, 3.5, 5, 6.5, 8];
        this.tileYMap2 = [4, 5, 6];
        this.bckBg1 = this.game.add.sprite(0, 0, "bck1");
        this.bckBg1.anchor.setTo(.5, 1);
        this.bckBg1.scale.setTo(5);
        this.bckBg1.name = "bckBg1";
        this.bckBg1.resizeFactor = 7;
        this.bckBg1.x = this.game.canvas.width / 2;
        this.bckBg1.y = this.game.canvas.height;
        this.bckBg1.fixedToCamera = true;

        this.pineappleStartedGame = false;

        this.fnStartG.call(this);
    };


    Game.prototype.fnStartG = function() {


        this.fps = 5;
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        this.smallTiles = this.game.add.group();
        this.smallTiles.enableBody = true;
        this.currentValueDeg = 0;


        this.pineapple = this.game.add.sprite(0, 0, 'jumpUp');
        this.pineapple.anchor.setTo(.5, 1);
        this.pineapple.scale.setTo(3);
        this.pineapple.name = "pineapplek";
        this.pineapple.resizeFactor = 30;
        this.pineapple.x = this.game.canvas.width * .5;
        this.pineapple.y = Newsfeed.Global.pineY;
        this.pineapple.alpha = 1;
        this.pineapple.animations.add('jumpUp');
        this.pineapple.animations.add('jumpDown');

        this.diamond1 = this.game.add.sprite(this.game.canvas.width * 2.5, this.game.canvas.height * .5, 'diamond1');
        this.diamond1.anchor.setTo(.5, 1);
        this.diamond1.name = "diamonddiamond";
        this.diamond1.resizeFactor = 30;
        this.diamond1.alpha = 1;
        this.diamond1.animations.add('diamond1anim');

        this.diamond2 = this.game.add.sprite(this.game.canvas.width * 2.5, this.game.canvas.height * .6, 'diamond2');
        this.diamond2.anchor.setTo(.5, 1);
        this.diamond2.name = "diamonddiamond2";
        this.diamond2.resizeFactor = 30;
        this.diamond2.alpha = 1;
        this.diamond2.animations.add('diamond2anim');

        this.diamond3 = this.game.add.sprite(this.game.canvas.width * 2.5, this.game.canvas.height * .7, 'diamond3');
        this.diamond3.anchor.setTo(.5, 1);
        this.diamond3.name = "diamonddiamond3";
        this.diamond3.resizeFactor = 30;
        this.diamond3.alpha = 1;
        this.diamond3.animations.add("diamond3anim");

        this.spacing = this.game.canvas.height * this.spaceTileNum;
        this.flyPower = false;


        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-all", {
            scene: this
        });

        this.model = 4;

        this.initPlatforms();

        window.addEventListener("deviceorientation", handleOrientation.bind(this), true);
    }

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    Game.prototype.fnResetSSIZEE = function() {
        /* console.log("fnResetSSIZEE") */
        if (this.timerObj) {
            clearTimeout(this.timerObj);
            timerObj = null;
        }
        this["tile2"].body.setSize(this["tile2"].width * 0.2 / this["tile2"].scale.x, 20, this.game.canvas.width * .02 / this["tile2"].scale.x, 0);
    };

    Game.prototype.fnResetSSIZEE2 = function() {
        /* console.log("fnResetSSIZEE2") */
        if (this.timerObj) {
            clearTimeout(this.timerObj);
            timerObj = null;
        }

        this["tile2"].body.setSize(this["tile2"].width * 0.2 / this["tile2"].scale.x, 20, this.game.canvas.width * .02 / this["tile2"].scale.x, 0);
        /* this["tile1"].body.reset(this["tile1"].x,this["tile1"].y); */
        /*  this.pineapple.body.setSize(this.pineapple.width * 0.8, this.pineapple.height * .1, this.pineapple.width * 0.2, this.pineapple.height * .85);
         */
    };

    Game.prototype.resize = function(width, height) {
        Newsfeed.Global.responsiveObj.notify("item-resize", {
            scene: this
        });
    };

    Game.prototype.fnaudioNavigation1 = function() {
        switch (this.audioNavigation1.frameName) {
            case "mute":
                this.bgSoundObj = this.game.add.audio("BGMUsic");
                this.bgSoundObj.loopFull();
                this.audioNavigation1.frameName = "sound";
                Newsfeed.Global.soundOnOff = false;
                break;
            case "sound":
                if (this.bgSoundObj) {
                    this.bgSoundObj.stop();
                    this.bgSoundObj.destroy();
                    this.bgSoundObj = null;
                }
                this.audioNavigation1.frameName = "mute";
                Newsfeed.Global.soundOnOff = true;
                break;
        }
    };

    Game.prototype.initPlatforms = function() {
        bottom = this.game.canvas.height * .9;
        top1 = this.tileHeight - 20;
        this.addGap = 0;
        this.ctr1 = 0;
        for (var y = 0; y < 10; y++) {
            if (this.ctr1 == 0) {
                this.addGap = Newsfeed.Global.tileY;
            } else {
                this.addGap -= this.spacing;
            }
            this.addPlatform(this.addGap);
            this.ctr1++;
        }
        this.itemCam = this.platforms.getFirstAlive();
        this.currentLast = this.platforms.getFirstAlive().y;

        this.footer1 = this.game.add.sprite(0, 0, "footer");
        this.footer1.anchor.setTo(.5, 1);
        this.footer1.name = "footerTitle1";
        this.footer1.resizeFactor = 2.72;
        this.footer1.x = this.game.canvas.width / 2;
        this.footer1.y = Newsfeed.Global.footY;
        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this.footer1
            }
        });


        this.game.world.swap(this.footer1, this.pineapple);
        this.pineapple.enableBody = true;
        this.game.physics.arcade.enable(this.pineapple);
        this.pineapple.body.gravity.y = this.game.canvas.height * this.gravityY;
        this.pineapple.immovable = true;
        this.pineapple.body.collideWorldBounds = true;
        this.pineapple.body.setSize(this.pineapple.width * 0.25 / this.pineapple.scale.x, this.pineapple.height * .1 / this.pineapple.scale.y, this.pineapple.width * 0.4 / this.pineapple.scale.x, this.pineapple.height * .75 / this.pineapple.scale.y);

        this.pineapple.body.bounce.y = 0.1;

        this.pineapple.body.checkCollision.up = false;
        this.pineapple.body.checkCollision.left = true;
        this.pineapple.body.checkCollision.right = true;
        this.pineapple.body.checkCollision.down = false;

        this.pineapple.body.velocity.y = -this.game.canvas.height * 1.8;


        Newsfeed.Global.responsiveObj.notify("item-tween-to-Y", {
            scene: this,
            props: {
                item: this.platforms,
                y: "10%",
                time: 350,
                delay: 0,
                Ease: Phaser.Easing.Cubic.InOut
            }
        });

        //this.game.add.tween(this.pineapple1.scale).to({ x: this.game.canvas.width * .0015, y: this.game.canvas.width * .0015 }, 3000, Phaser.Easing.Exponential.Out, true);



    };

    Game.prototype.addPlatform = function(y) {
        if (typeof(y) == "undefined") {
            y -= this.tileHeight;
            this.addGap -= this.spacing;
            /* this.addTile2(this.game.canvas.width * .5, this.addGap); */
            this.addTile2(this.game.canvas.width * ((this.tileYMap[Math.floor(randomNumber(0, this.tileYMap.length))]) / 10), this.addGap);
        } else {
            /* this.addTile(this.game.canvas.width * .5, y); */
            if (this.ctr1 == 0) {
                this.addTile(this.game.canvas.width * .5, y);
            } else if (this.ctr1 == 1) {
                this.addTile(this.game.canvas.width * ((this.tileYMap[Math.floor(randomNumber(0, 1))]) / 10), y);
            } else if (this.ctr1 == 2) {
                this.addTile(this.game.canvas.width * ((this.tileYMap[Math.floor(randomNumber(this.tileYMap.length - 2, this.tileYMap.length - 1))]) / 10), y);
            } else {
                this.addTile(this.game.canvas.width * ((this.tileYMap[Math.floor(randomNumber(0, this.tileYMap.length))]) / 10), y);
            }
        }
    };

    Game.prototype.addTile2 = function(x, y) {
        this.tilectr++;
        this["tile" + this.tilectr] = this.platforms.getFirstDead();
        this["tile" + this.tilectr].revive();
        this["tile" + this.tilectr].alpha = 1;
        /* this["tile" + this.tilectr].scale.setTo(3); */
        this["tile" + this.tilectr].y = y;
        this["tile" + this.tilectr].Boolean = false;
        switch (Math.floor(randomNumber(1, 3))) {
            case 1:
                this["tile" + this.tilectr].x = x;
                var tarr = ["tile", "tile6", "tile8"];
                this["tile" + this.tilectr].loadTexture(shuffle(tarr)[0]);
                var _xx = 0;
                var _yy = 0;
                var _ww = this["tile" + this.tilectr].width / this["tile" + this.tilectr].scale.x;
                var _hh = 20;

                this["tile" + this.tilectr].body.setSize(_ww, _hh, _xx, _yy);


                break;
            case 2:
                this["tile" + this.tilectr].x = x;
                /* console.log(randomNumber(3, 5), " rnnn") */
                this["tile" + this.tilectr].loadTexture("tile" + Math.floor(randomNumber(3, 6)));

                var _xx = this["tile" + this.tilectr].width * .36 / this["tile" + this.tilectr].scale.x;
                var _yy = (this["tile" + this.tilectr].height * .4) / this["tile" + this.tilectr].scale.y;
                var _ww = this["tile" + this.tilectr].width * .3 / this["tile" + this.tilectr].scale.x;
                var _hh = 20;

                /* this["tile" + this.tilectr].scale.setTo(1); */
                this["tile" + this.tilectr].body.setSize(_ww, _hh, _xx, _yy);
                //this["tile" + this.tilectr].body.setSize(this["tile" + this.tilectr].width * 0.2 / this["tile" + this.tilectr].scale.x, 20, this.game.canvas.width * .15 / this["tile" + this.tilectr].scale.x, 0);
                break;
        }
    };

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }

    Game.prototype.addTile = function(x, y) {
        this.tilectr++;

        var tarr = ["tile", "tile6", "tile8"];

        this["tile" + this.tilectr] = this.platforms.create(x, y, shuffle(tarr)[0]);

        this["tile" + this.tilectr].body.velocity.y = 0;

        this["tile" + this.tilectr].anchor.setTo(.5, 1);
        this["tile" + this.tilectr].name = y + "tile" + x + randomNumber(1, 99999) + "F%" + this.tilectr;
        this["tile" + this.tilectr].resizeFactor = 7;
        this["tile" + this.tilectr].body.setSize(this["tile" + this.tilectr].width / this["tile" + this.tilectr].scale.x, 20, 0, 0);
        this["tile" + this.tilectr].body.immovable = true;
        this["tile" + this.tilectr].body.checkCollision.up = true;
        this["tile" + this.tilectr].body.checkCollision.left = false;
        this["tile" + this.tilectr].body.checkCollision.right = false;
        this["tile" + this.tilectr].body.checkCollision.down = false;
        this["tile" + this.tilectr].checkWorldBounds = true;
        this["tile" + this.tilectr].Boolean = false;
        Newsfeed.Global.responsiveObj.notify("item-fill-and-resize-one", {
            scene: this,
            props: {
                item: this["tile" + this.tilectr]
            }
        });
    }

    function handleOrientation(event) {

        var absolute = event.absolute;
        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;
        if (this.startGamma) {
            this.gammaVal = Math.floor(gamma);
        } else {
            this.gammaVal = 0;
        }

    };

    function between(x, min, max) {
        return x >= min && x <= max;
    }
    Game.prototype.animationStopped2 = function() {

        this.animationCompleted = false;
        this.UPRBool = false;
        this.dropJump = false;
        this.playingJump = false;
        this.isJumping = false;
        this.charpine = false;
    };
    Game.prototype.animationStopped = function() {
        this.animationCompleted = true;
    }
    Game.prototype.animationStopped1 = function() {
        this.charpine = true;
        this.isJumping = true;
        this.animationCompleted2 = true;
    }

    function isBetween(n, a, b) {
        return (n - a) * (n - b) <= 0
    }
    Game.prototype.loopBlink = function() {
        this.twB = null;
        /* if (this.loopBlinkBool) { */
        this.twB = this.game.add.tween(this.boostThunder).to({ alpha: 0 }, 200, Phaser.Easing.Back.InOut, true);
        this.twB.onComplete.add(this.loopBlink.bind(this), this);
        /* } */

    }
    Game.prototype.update = function() {
        console.log((this.game.canvas.width * .2) / 10)
        if (this.isJumping) {

            if (this.game.input.activePointer.isDown) {
                if (this.game.input.activePointer.x < this.game.canvas.width * .5) {
                    if (Newsfeed.Global.isMobile) { this.curVel = (this.game.canvas.width * .2) / 10; } else { this.curVel = 4 }
                    this.pineapple.body.x -= this.curVel;
                    this.bckBg1.cameraOffset.x -= (this.curVel / 4) / 6;
                } else {
                    if (Newsfeed.Global.isMobile) { this.curVel = (this.game.canvas.width * .2) / 10; } else { this.curVel = 4 }
                    this.pineapple.body.x += this.curVel;
                    this.bckBg1.cameraOffset.x += (this.curVel / 4) / 6;
                }
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (Newsfeed.Global.isMobile) { this.curVel = (this.game.canvas.width * .2) / 10; } else { this.curVel = 4 }
                this.pineapple.body.x -= this.curVel;
                this.bckBg1.cameraOffset.x -= (this.curVel / 4) / 6;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (Newsfeed.Global.isMobile) { this.curVel = (this.game.canvas.width * .2) / 10; } else { this.curVel = 4 }
                this.pineapple.body.x += this.curVel;
                this.bckBg1.cameraOffset.x += (this.curVel / 4) / 6;
            }
        }

        if (!this.pineappleStartedGame) {
            if (this.pineapple.body.velocity.y > 0) {
                this.pineappleStartedGame = true;

            }
        }
        if (this.pineapple.body.y <= this.game.canvas.height / 2 && !this.gameStarted && !this.collideOnceDone) {
            this.gameStarted = true;
        }
        if (this.gameStarted) {

            if (!this.isnotgetBounds) {
                this.game.world.bounds.y -= 10;
                this.game.world.setBounds(0, -this.game.canvas.height * .57 + this.pineapple.y, this.game.canvas.width, this.game.canvas.height);
            }

            this.platforms.forEach(item => {
                this.game.physics.arcade.collide(this.pineapple, item, this.collisionHandler, function() {
                    if (this.animationCompleted2) {



                        if (!this.collideOnceDone) {
                            this.startGamma = true;
                            this.pineapple.alpha = 1;

                        }
                        if (!this.firstKill) {
                            this.itemCam = this["tile" + parseInt(item.name.split("F%")[1])];
                            this.currentLast = this["tile" + parseInt(item.name.split("F%")[1])].y;
                        }

                        this.curVel = 0;
                        this.animationStopped2();
                        if (item.key == "tile" || item.key == "tile6" || item.key == "tile8") {


                            if (item.key == "tile") item.loadTexture("tile2");
                            if (item.key == "tile6") item.loadTexture("tile7");
                            if (item.key == "tile8") item.loadTexture("tile9");
                            setTimeout(() => {

                                if (item.key == "tile2") item.loadTexture("tile");
                                if (item.key == "tile7") item.loadTexture("tile6");
                                if (item.key == "tile9") item.loadTexture("tile8");
                            }, 100);
                        } else if (item.key == "tile3" || item.key == "tile4" || item.key == "tile5") {

                            item.alpha = 0;

                            //item.loadTexture("tile4");

                            this["diamond" + (item.key.split("tile")[1] - 2)].x = item.x;
                            this["diamond" + (item.key.split("tile")[1] - 2)].y = item.y + (item.width * .2 / item.scale.y);
                            /* this.diamondJump =  */

                            this["diamond" + (item.key.split("tile")[1] - 2)].animations.play("diamond" + (item.key.split("tile")[1] - 2) + "anim", 30, false);
                            item.x = this.game.canvas.width * 2.5;

                        }
                    }
                }, this);
                if (item.y > this.game.camera.y + this.game.canvas.height) {
                    this.firstKill = true;
                    this.currentLast = this["tile" + fnNumbr(parseInt(item.name.split("F%")[1]))].y;
                    item.kill();
                    this.addPlatform.call(this);
                }
            });
            if (this.charpine) {
                if (this.pineapple.body.velocity.y < 0) {
                    if (!this.playingJump) {
                        this.playingJump = true;
                    }
                    this.bckBg1.cameraOffset.y += .7;
                } else {
                    if (this.playingJump && this.animationCompleted) {
                        this.bckBg1.cameraOffset.y -= .7;
                        if (!this.dropJump) {

                            if (this.temp > this.game.camera.y) {
                                this.temp = this.game.camera.y;
                            } else if (this.temp < this.game.camera.y) {
                                this.temp = this.game.camera.y;
                            }
                            /* console.log("JUMPDOWN", this.pineapple.body.velocity.y) */

                            this.dropJump = true;

                            this.pineapple.loadTexture("jumpDown");
                            setTimeout(() => {
                                this.charpine = true;
                                this.isJumping = true;
                                this.animationCompleted2 = true;
                            }, 200);
                        }
                    }
                }
            }

            if (!this.isJumping) {
                /* console.log("JUMPUP") */
                this.pineapple.loadTexture("jumpUp");
                this.animJump = this.pineapple.animations.play("jumpUp", this.fps, false);
                this.pineapple.body.velocity.y = -(this.game.canvas.height * this.isVelocityY);
                this.charpine = true;
                this.isJumping = true;
                this.animationCompleted2 = false;
                this.animJump.onComplete.add(this.animationStopped.bind(this), this);
            }
            if (!this.isFirst) {
                if (between(this.gammaVal, 4, 100) && !this.isMovingRight) {
                    this.pineapple.scale.x *= -1;
                    this.isMovingLeft = false;
                    this.isMovingRight = true;
                    this.isFirst = true;
                }
            } else {
                if (between(this.gammaVal, 4, 100) && !this.isMovingRight) {
                    this.pineapple.scale.x *= -1;
                    this.isMovingLeft = false;
                    this.isMovingRight = true;
                } else if (between(this.gammaVal, -100, -4) && !this.isMovingLeft) {
                    this.pineapple.scale.x *= -1;
                    this.isMovingRight = false;
                    this.isMovingLeft = true;
                }
            }



            if (this.startGamma) {
                if (this.pineapple.body.y - this.currentLast > 100 && this.pineapple.body.y > this.currentLast) {
                    this.isnotgetBounds = true;
                    /* this.gravityY = 1.4; */
                    this.pineapple.body.collideWorldBounds = false;
                    this.gameStarted = false;
                    this.pineapple.checkWorldBounds = true;
                    this.pineapple.events.onOutOfBounds.add(this.spriteOut, this);
                }
            }

            if (emitterConfetti) {
                emitterConfetti.y = this.pineapple.y + this.game.canvas.height * .4;
            }
            if (emitterConfetti1) {
                emitterConfetti1.y = this.pineapple.y + this.game.canvas.height * .4;
            }
            if (this.textscore22) {
                this.textscore22.y = this.pineapple.y - this.game.canvas.height * .3;
            }
        }

    };

    function fndiamondJump() {
        this.diamond1.alpha = 0;
    }

    function fnNumbr(num) {
        if (num == 10) {
            return 1;
        } else {
            return num + 1;
        }
    }


    Game.prototype.spriteOut = function() {
        if (!this.gameOver) {
            this.gameOver = true;
            this.platforms.destroy();
            this.smallTiles.destroy();
            /* this.audioGr1.destroy(); */
            /* Newsfeed.Global.finalScore = this.textscore1.text; */
            this.game.world.setBounds(0, 0, this.game.canvas.width, this.game.canvas.height);
            Newsfeed.Global.responsiveObj.notify("clear", null);
            this.game.state.start("Title2");
        }
    }
    Game.prototype.render = function() {
        /* this.game.debug.body(this.pineapple);
        this.platforms.forEach(item => {
            this.game.debug.body(item);
        }); */

    };
    return Game;
})(Newsfeed.Game || {});