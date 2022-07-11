var Newsfeed = Newsfeed || {};
Newsfeed.SignalHub = function() {
    function SignalHub() {
        SignalHub.prototype.constructor.call(this);
    }
    SignalHub.prototype = Object.create(Phaser.Signal.prototype);
    SignalHub.prototype.constructor = Phaser.Signal.prototype.constructor;
    SignalHub.prototype.initSignal = function() {
        this.add(this.onSignal.bind(this));
    };
    SignalHub.prototype.onSignal = function(_data) {
        switch (_data.type) {
            case "subscribe":
                this.subscribe(_data.data);
                break;
            case "unsubscribe":
                this.unsubscribe(_data.data);
                break;
            case "clear":
                this.clearData();
                break;
            case "item-fill":
                this.fillDimensionArr(_data.data, false);
                break;
            case "item-fill-and-resize-all":
                this.fillDimensionArr(_data.data, true);
                break;
            case "item-fill-and-resize-one":
                this.fillDimensionArr(_data.data, true, _data.data.props.item);
                break;
            case "item-resize":
                //console.log(Object.keys(this.dimensionArr).length, " items in total");
                this.resizeElements(_data.data.scene, null, true);
                break;
            case "set-bg":
                this.setBG(_data.data.BG);
                break;
            case "item-move-by":
                this.moveItem(_data.data);
                break;
            case "item-move-to":
                this.moveItemTo(_data.data);
                break;
            case "item-tween-by":
                this.tweenItem(_data.data, true);
                break;
            case "item-tween-to":
                this.tweenItem(_data.data, false);
                break;
            case "item-tween-to-X":
                this.tweenXItem(_data.data, false)
                break;
            case "item-tween-to-Y":
                this.tweenYItem(_data.data, false)
                break;
            case "item-scale-by":
                this.scaleItem(_data.data, true, true);
                break;
            case "item-scale-to":
                this.scaleItem(_data.data, false, true);
                break;
            case "item-scale-to-keep-def":
                this.scaleItem(_data.data, false, false);
                break;
            case "item-follow-unlock":
                this.unlockItem(_data.data);
                break;
            case "item-follow-lock":
                this.lockItem(_data.data);
                break;
            case "item-change-follow":
                _data.data.props.item.followFixed = false;
                this.initFollowersFix(_data.data.props.item);
                break;
            case "item-update":
                this.updateItemPoint(_data.data.scene.game, _data.data.props.item);
                break;
            case "item-apply-velocity":
                this.applyVelocity(_data.data.scene, _data.data.props);
                break;
        }
    };
    return SignalHub;
}();
Newsfeed.Info = (function() {
    function Info(_type, _usage, _arguments) {
        this.usage = _usage;
        this.signalType = _type;
        this.arguments = _arguments;
    }
    return Info;
})(Newsfeed.Info || {});
Newsfeed.ResponsiveGame = function() {
    function ResponsiveGame() {
        this.responsiveTypes = [0, 1, 3, 4, 6];
        this.dimensionArr = {};
        this.orientation = "";
        this.followitemIndex = 0;
        this.mainBG = null;
        this.move_twn = null;
        this.infos = [];
        this.resizeCnt = 0;
        this.enablePhysicsTimeout = null;
        ResponsiveGame.prototype.constructor.call(this);
    }
    ResponsiveGame.prototype = Object.create(Newsfeed.SignalHub.prototype);
    ResponsiveGame.prototype.constructor = Newsfeed.SignalHub.prototype.constructor;
    ResponsiveGame.prototype.init = function() {
        this.initSignal();
        Newsfeed.Global.deviceDetector = function() {
            var b = navigator.userAgent.toLowerCase(),
                a = function(a) {
                    void 0 !== a && (b = a.toLowerCase());
                    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(b) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(b) ? "phone" : "desktop"
                };
            return {
                device: a(),
                detect: a,
                isMobile: "desktop" != a() ? !0 : !1,
                userAgent: b
            }
        }();
        Newsfeed.Global.isMobile = !(Newsfeed.Global.deviceDetector.device == "desktop");
        var c_width = ((Newsfeed.Global.isMobile) ? (Newsfeed.Global.orientation == "portrait" ? Math.min(window.innerWidth, window.innerHeight) : Math.max(window.innerWidth, window.innerHeight)) : window.innerWidth) * window.devicePixelRatio;
        var c_height = ((Newsfeed.Global.isMobile) ? (Newsfeed.Global.orientation == "portrait" ? Math.max(window.innerWidth, window.innerHeight) : Math.min(window.innerWidth, window.innerHeight)) : window.innerHeight) * window.devicePixelRatio;
        return {
            width: c_width,
            height: c_height
        };
    };
    ResponsiveGame.prototype.showOrHideBlackCover = function(e, _width, _height) {
        setTimeout(function(_width, _height) {
            _width = _width || window.innerWidth;
            _height = _height || window.innerHeight;
            if (!Newsfeed.Global.isMobile && (_width * .75 <= _height)) {
                document.getElementById("rotate").classList.add("active");
            } else if (!Newsfeed.Global.isMobile) {
                document.getElementById("rotate").classList.remove("active");
            }
            if (Newsfeed.Global.isMobile && ((_width >= _height && Newsfeed.Global.orientation == "portrait") || (_width <= _height && Newsfeed.Global.orientation == "landscape"))) {
                document.getElementById("rotate").classList.add("active");
            } else if (Newsfeed.Global.isMobile) {
                document.getElementById("rotate").classList.remove("active");
            }
        }.bind(this, _width, _height), 0)
    }
    ResponsiveGame.prototype.getHelp = function() {
        if (this.infos.length == 0) {
            this.infos.push(new Newsfeed.Info("clear", "Use this signal before switching between states.", "no arguments"));
            this.infos.push(new Newsfeed.Info("set-bg", "If there is background image for state, use this signal", "{BG:' Backgound image used in current state'}"));
            this.infos.push(new Newsfeed.Info("item-fill-and-resize", "Use this signal each time any element created and added in game. By calling this, the responsive library will store reference to all elements in scene, it will be used to resize elements accoring to screen size changes.", "{scene:this}"));
            this.infos.push(new Newsfeed.Info("item-resize", "Use this signal in 'resize' function of state", "{scene:this}"));
            this.infos.push(new Newsfeed.Info("item-move-by", "Use this signal , so the final position of item will be [x=>(item x value + game.width * xFact% value send in argument),y=>(item y value + game.height * yFact% value send in argument)]", "{scene:this,props:{item:'element',x:'in%',y:'in%'}}"));
            this.infos.push(new Newsfeed.Info("item-move-to", "Use this signal , so the final position of item will be [x=>(game.width * xFact% value send in argument),y=>(game.height * yFact% value send in argument)]", "{scene:this,props:{item:'element',x:'in%',y:'in%'}}"));
            this.infos.push(new Newsfeed.Info("item-scale-by", "Use this signal , so the final scale of item will be [x=>('resizeFactor' * scaleVal% value send in argument),y=>('resizeFactor' * scaleVal% value send in argument)]", "{scene:this,props:{item:'element',scaleVal:'in%',time:number,Ease:Phaser.Ease,delay:number,doOnComplete:Function}}"));
            this.infos.push(new Newsfeed.Info("item-follow-unlock", "Use this signal , If any item which has 'follows' object and needs to move. use this before moving the item", "{scene:this,props:{item:'element'}}"));
            this.infos.push(new Newsfeed.Info("item-follow-lock", "Use this signal , If any item which has 'follows' object and movement is completed. use this after moving the item", "{scene:this,props:{item:'element'}}"));
        }
        console.table(this.infos)
    }
    ResponsiveGame.prototype.subscribe = function(__data) {
        if (Newsfeed.Global.isMobile) {
            __data.scene.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            __data.scene.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        } else {
            __data.scene.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            __data.scene.game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
        }
        __data.scene.game.scale.pageAlignVertically = true;
        __data.scene.game.time.advancedTiming = true;
        __data.scene.game.scale.fullScreenTarget = document.body;
        this.c_width = window.innerWidth * window.devicePixelRatio;
        this.c_height = window.innerHeight * window.devicePixelRatio;
        this.gameResizeFactor = {
            w: (Newsfeed.Global.isMobile) ? (__data.props.orientation == "portrait") ? 1242 : 2208 : 2208,
            h: (Newsfeed.Global.isMobile) ? (__data.props.orientation == "portrait") ? 2208 : 1242 : 1242,
        };
    }
    ResponsiveGame.prototype.notify = function(_type, _data) {
        this.dispatch({
            type: _type,
            data: _data
        });
    };
    ResponsiveGame.prototype.clearData = function() {
        this.dimensionArr = {};
        this.followitemIndex = 0;
        this.mainBG = null;
    };
    ResponsiveGame.prototype.setBG = function(_BG) {
        this.mainBG = _BG;
        _BG.isBG = true;
    };
    ResponsiveGame.prototype.isEligibleForResponsiveness = function(_type) {
        return ((this.responsiveTypes.indexOf(_type) == -1) ? false : true);
    };
    ResponsiveGame.prototype.fillDimensionArr = function(_scene, _shouldResize, _item) {
        _item = _item || null;
        _scene = _scene.scene;
        Object.keys(_scene).forEach(function(key) {
            if (_scene[key]) {
                if (this.isEligibleForResponsiveness(_scene[key].type) && !(_scene[key].name in this.dimensionArr)) {
                    _scene[key].dimension = {
                        w: _scene[key].width,
                        h: _scene[key].height
                    }
                    this.dimensionArr[_scene[key].name] = {
                        _item: _scene[key],
                        _wDef: _scene[key].width / this.gameResizeFactor.w * _scene[key].resizeFactor,
                        _hDef: _scene[key].height / this.gameResizeFactor.h * _scene[key].resizeFactor,
                        _w: _scene[key].width / this.gameResizeFactor.w * _scene[key].resizeFactor,
                        _h: _scene[key].height / this.gameResizeFactor.h * _scene[key].resizeFactor,
                        _x: _scene[key].x / _scene.game.width,
                        _y: _scene[key].y / _scene.game.height,
                        _isBG: _scene[key].isBG || false
                    };
                    if (_scene[key].follows) {
                        _scene[key].followFixed = false;
                        _scene[key].followLocked = true;
                        _scene[key].needToFollow = true;
                    }
                    _scene[key].antialiasing = true;
                } else if (this.isEligibleForResponsiveness(_scene[key].type) && (_scene[key].name in this.dimensionArr)) {}
            }
        }.bind(this));
        if (_item != null)
            _item.followFixed = false;
        if (_shouldResize) {
            this.resizeElements(_scene, _item, false);
        }
    };
    ResponsiveGame.prototype.resizeElements = function(__scene, __item, isActualResize) {
        clearTimeout(this.enablePhysicsTimeout);
        var _width = __scene.game.width;
        var _height = __scene.game.height;
        if (isActualResize) {
            this.resizeCnt++;
        }
        Object.keys(this.dimensionArr).forEach(function(_item, key) {
            if (_item == null || (_item.name == key && _item.alive)) {
                var ele = this.dimensionArr[key];
                if (_item == null)
                    ele._item.followFixed = false;
                ele._item.followers = [];
                if (ele._item.bodyType) {
                    ele._item.isStaticBody = ((ele._item.body && ele._item.body.data.m_mass == 0) || ele._item.isStatic) ? true : false;
                    if (ele._item.body) {
                        ele._item.body.destroy();
                        ele._item.body = null;
                    }
                }
            }
        }.bind(this, __item));
        Object.keys(this.dimensionArr).forEach(function(_item, key) {
            if (_item == null || (_item.name == key && _item.alive)) {
                var ele = this.dimensionArr[key];
                if (ele._isBG) {
                    this.scaleSprite(ele._item, _width, _height, 0, 1, true);
                    if (ele._item.body) {
                        ele._item.body.x = (_width - ele._item.width) / 2;
                        ele._item.body.y = (_height - ele._item.height) / 2;
                    } else {
                        ele._item.x = (_width - ele._item.width) / 2;
                        ele._item.y = (_height - ele._item.height) / 2;
                    }
                } else {
                    ele._item.scale.setTo(ele._w * _width / 1000);
                    if (!ele._item._tween) {
                        if (ele._item.body) {
                            (ele._item.body.velocity.x == 0) && (ele._item.body.x = ele._x * _width);
                            (ele._item.body.velocity.y == 0) && (ele._item.body.y = ele._x * _height);
                        } else {
                            ele._item.x = ele._x * _width;
                            ele._item.y = ele._y * _height
                        }
                    }
                    if (ele._item._tween) {
                        ele._item._tween.stop();
                        __scene.game.tweens.remove(ele._item._tween);
                        ele._item._tween.timeline[0].percent = 1;
                        if (ele._item.tweenType == "move") {
                            if (ele._item.body) {
                                ele._item.body.x = ele._x * _width + (ele._item._tween.timeline[0].vEnd.x - ele._item._tween.timeline[0].vStart.x) / ele._item.sizeRef.w * __scene.game.width;
                                ele._item.body.y = ele._y * _height + (ele._item._tween.timeline[0].vEnd.y - ele._item._tween.timeline[0].vStart.y) / ele._item.sizeRef.h * __scene.game.height;
                            } else {
                                ele._item.x = ele._x * _width + (ele._item._tween.timeline[0].vEnd.x - ele._item._tween.timeline[0].vStart.x) / ele._item.sizeRef.w * __scene.game.width;
                                ele._item.y = ele._y * _height + (ele._item._tween.timeline[0].vEnd.y - ele._item._tween.timeline[0].vStart.y) / ele._item.sizeRef.h * __scene.game.height;
                            }
                        } else if (ele._item.tweenType == "scale") {
                            if (ele._item.body) {
                                ele._item.body.x = ele._x * _width;
                                ele._item.body.y = ele._y * _height;
                            } else {
                                ele._item.x = ele._x * _width;
                                ele._item.y = ele._y * _height;
                            }
                        }
                        ele._item._tween.onComplete.dispatch();
                        ele._item._tween = null;
                    }
                    if (ele._item.bodyType) {
                        ele._item.body = null;
                    }
                }
            }
        }.bind(this, __item));
        //this.followitemIndex = 1;
        if (__item == null || ((__item != undefined && __item != null) && __item.follows && __item.alive))
            this.initFollowersFix(__item);
        this.enablePhysicsTimeout = setTimeout(function(__scene) {
            Object.keys(this.dimensionArr).forEach(function(key) {
                var ele = this.dimensionArr[key];
                if (!ele._item.isBG && ele._item.bodyType && ele._item.alive) {
                    (ele._item.body) && ele._item.body.destroy();
                    ele._item.body = null;
                    Newsfeed.Global.enableBody.call(__scene, ele._item);
                    ele._item.body.static = ele._item.isStaticBody;
                }
            }.bind(this));
        }.bind(this, __scene), 10);
    };
    ResponsiveGame.prototype.initFollowersFix = function(__item) {
        if (__item != null) {
            this.repositionOnFollow(__item, this.resizeCnt);
        } else {
            Object.keys(this.dimensionArr).forEach(function(key, index) {
                if (this.dimensionArr[key]._item.alive) {
                    this.repositionOnFollow(this.dimensionArr[key]._item, this.resizeCnt);
                }
            }.bind(this));
        }
    };
    ResponsiveGame.prototype.repositionOnFollow = function(_ele, resizeCnt) {
        if (resizeCnt == this.resizeCnt) {
            if (_ele.follows && !_ele.followFixed && _ele.alive) {
                return this.repositionOnFollow(_ele.follows.item, resizeCnt);
            } else if (_ele.alive) {
                _ele.followers = [];
                Object.keys(this.dimensionArr).forEach(function(key, index) {
                    if (this.dimensionArr[key]._item.follows && this.dimensionArr[key]._item.followLocked) {
                        if (this.dimensionArr[key]._item.follows.item.name == _ele.name) {
                            _ele.followers.push(this.dimensionArr[key]._item);
                        }
                    }
                }.bind(this));
                this.fixPositionForFollowers(_ele);
                _ele.followers.forEach(function(key, index) {
                    this.fixPositionForFollowers(_ele.followers[index]);
                }.bind(this));
            }
        }
    }
    ResponsiveGame.prototype.scaleSprite = function(sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier, isFullScale) {
        var scale = this.getSpriteScale((sprite._frame) ? sprite._frame.width : sprite.width, (sprite._frame) ? sprite._frame.height : sprite.height, availableSpaceWidth, availableSpaceHeight, padding, isFullScale);
        sprite.scale.x = scale * scaleMultiplier;
        sprite.scale.y = scale * scaleMultiplier;
    };
    ResponsiveGame.prototype.getSpriteScale = function(spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding, isFullScale) {
        var ratio = 1;
        var currentDevicePixelRatio = window.devicePixelRatio;
        var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
        var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
        if (!isFullScale) {
            ratio = 1 / Math.max(widthRatio, heightRatio);
        } else {
            if (isFullScale)
                ratio = 1 / Math.min(widthRatio, heightRatio);
        }
        return ratio * currentDevicePixelRatio;
    };
    ResponsiveGame.prototype.fixPositionForFollowers = function(_ele) {
        _ele.followers.forEach(function(follower) {
            if (follower.alive && !follower.followFixed) {
                var curr_item = follower;
                var itemFollows = _ele;
                if (curr_item.follows.axis == "y") {
                    if (curr_item.body) {
                        curr_item.body.y = itemFollows.y + itemFollows.height * curr_item.follows.Ydirection * curr_item.follows.Yfactor - (curr_item.follows.Ydirection * curr_item.height / 2);
                    } else {
                        curr_item.y = itemFollows.y + itemFollows.height * curr_item.follows.Ydirection * curr_item.follows.Yfactor;
                    }
                } else if (curr_item.follows.axis == "x") {
                    if (curr_item.body) {
                        curr_item.body.x = itemFollows.x + itemFollows.width * curr_item.follows.Xdirection * curr_item.follows.Xfactor - (curr_item.follows.Xdirection * curr_item.width / 2);
                    } else {
                        curr_item.x = itemFollows.x + itemFollows.width * curr_item.follows.Xdirection * curr_item.follows.Xfactor;
                    }
                } else if (curr_item.follows.axis == "xy") {
                    if (curr_item.body) {
                        curr_item.body.x = itemFollows.x + itemFollows.width * curr_item.follows.Xdirection * curr_item.follows.Xfactor - (curr_item.follows.Xdirection * curr_item.width / 2);
                        curr_item.body.y = itemFollows.y + itemFollows.height * curr_item.follows.Ydirection * curr_item.follows.Yfactor - (curr_item.follows.Ydirection * curr_item.height / 2);
                    } else {
                        curr_item.x = itemFollows.x + itemFollows.width * curr_item.follows.Xdirection * curr_item.follows.Xfactor;
                        curr_item.y = itemFollows.y + itemFollows.height * curr_item.follows.Ydirection * curr_item.follows.Yfactor;
                    }
                }
                curr_item.followFixed = true;
            }
        }.bind(this));
    };
    ResponsiveGame.prototype.updateItemPoint = function(_gameObj, _item) {
        Object.keys(this.dimensionArr).forEach(function(key) {
            if (_item.name == key) {
                this.dimensionArr[_item.name]._x = this.dimensionArr[_item.name]._item.x / _gameObj.width;
                this.dimensionArr[_item.name]._y = this.dimensionArr[_item.name]._item.y / _gameObj.height;
            }
        }.bind(this));
    };
    ResponsiveGame.prototype.updateItemScale = function(_scene, _key, _newResizeFactor, saveOnComplete) {
        Object.keys(this.dimensionArr).forEach(function(key) {
            if (_key == key) {
                this.dimensionArr[_key]._w = this.dimensionArr[_key]._wDef * _newResizeFactor;
                this.dimensionArr[_key]._item.scale.setTo(this.dimensionArr[_key]._w * _scene.game.width / 1000);
                if (saveOnComplete) {
                    this.dimensionArr[_key]._wDef *= _newResizeFactor;
                    this.dimensionArr[_key]._hDef *= _newResizeFactor;
                }
            }
        }.bind(this));
    };
    ResponsiveGame.prototype.moveItem = function(__data) {
        var _item = __data.props.item;
        var _xFact = __data.props.x;
        var _yFact = __data.props.y;
        if (_item.follows && _item.followLocked && _item.follows.axis == "y" && parseFloat(_yFact.split("%")[0]) / 100 != 0)
            throw new Error("can't change y-position for item which already follows other item . Make 'followLocked' of current item to false before change y-position");
        if (_item.follows && _item.followLocked && _item.follows.axis == "x" && parseFloat(_xFact.split("%")[0]) / 100 != 0)
            throw new Error("can't change x-position for item which already follows other item . Make 'followLocked' of current item to false before change x-position");
        if (_item.body) {
            _item.body.x += __data.scene.game.width * parseFloat(_xFact.split("%")[0]) / 100;
            _item.body.y += __data.scene.game.height * parseFloat(_yFact.split("%")[0]) / 100;
        } else {
            _item.x += __data.scene.game.width * parseFloat(_xFact.split("%")[0]) / 100;
            _item.y += __data.scene.game.height * parseFloat(_yFact.split("%")[0]) / 100;
        }
        if (_item.follows && !_item.followLocked && _item.follows.axis == "y") {
            if (_item.body) {
                _item.follows.Yfactor = (_item.y + (_item.follows.Ydirection * _item.height / 2) - _item.follows.item.y) / (_item.follows.item.height * _item.follows.Ydirection);
            } else {
                _item.follows.Yfactor = (_item.y - _item.follows.item.y) / (_item.follows.item.height * _item.follows.Ydirection);
            }
        } else if (_item.follows && !_item.followLocked && _item.follows.axis == "x") {
            if (_item.body) {
                _item.follows.Xfactor = (_item.x + (_item.follows.Xdirection * _item.width / 2) - _item.follows.item.x) / (_item.follows.item.width * _item.follows.Xdirection);
            } else {
                _item.follows.Xfactor = (_item.x - _item.follows.item.x) / (_item.follows.item.width * _item.follows.Xdirection);
            }
        } else if (_item.follows && !_item.followLocked && _item.follows.axis == "xy") {
            if (_item.body) {
                _item.follows.Xfactor = (_item.x + (_item.follows.Xdirection * _item.width / 2) - _item.follows.item.x) / (_item.follows.item.width * _item.follows.Xdirection);
                _item.follows.Yfactor = (_item.y + (_item.follows.Ydirection * _item.height / 2) - _item.follows.item.y) / (_item.follows.item.height * _item.follows.Ydirection);
            } else {
                _item.follows.Xfactor = (_item.x - _item.follows.item.x) / (_item.follows.item.width * _item.follows.Xdirection);
                _item.follows.Yfactor = (_item.y - _item.follows.item.y) / (_item.follows.item.height * _item.follows.Ydirection);
            }
        }
        this.updateItemPoint(__data.scene.game, _item)
    };
    ResponsiveGame.prototype.moveItemTo = function(__data) {
        var _item = __data.props.item;
        var _desiredX = String(_item.x / __data.scene.game.width) + "%";
        var _desiredY = String(_item.y / __data.scene.game.height) + "%";
        var _x = __data.props.x || _desiredX;
        var _y = __data.props.y || _desiredY;
        this.checkBeforeMove(__data);
        if (_item.follows && _item.followLocked && _item.follows.axis == "y" && _y != _desiredY)
            throw new Error("can't change y-position for item which already follows other item . Make 'followLocked' of current item to false before change y-position");
        if (_item_item.follows && _item.followLocked && _item.follows.axis == "x" && _x != _desiredX)
            throw new Error("can't change x-position for item which already follows other item . Make 'followLocked' of current item to false before change x-position");
        if (_item.body) {
            _item.body.x = __data.scene.game.width * parseFloat(_x.split("%")[0]) / 100;
            _item.body.y = __data.scene.game.height * parseFloat(_y.split("%")[0]) / 100;
        } else {
            _item.x = __data.scene.game.width * parseFloat(_x.split("%")[0]) / 100;
            _item.y = __data.scene.game.height * parseFloat(_y.split("%")[0]) / 100;
        }
        this.updateItemPoint(__data.scene.game, _item)
    };
    ResponsiveGame.prototype.tweenYItem = function(__data, _shouldAdd) {
        var _scene = __data.scene;
        var _item = __data.props.item;
        var _props = __data.props || {}
        var _angle = _item.angle + (_props.angle || 0);
        var _x = (_props.x) ? ((_shouldAdd) ? (_item.x + (parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width)) : ((parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width))) : (_item.x);
        var _y = (_props.y) ? ((_shouldAdd) ? (_item.y + (parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height)) : ((parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height))) : (_item.y);
        if (_item.follows && _item.followLocked && _item.follows.axis == "y" && _y != _item.y)
            throw new Error("can't change the y-position for item which already follows other item . Make 'followLocked' of current item to false before change y-position");
        if (_item.follows && _item.followLocked && _item.follows.axis == "x" && _x != _item.x)
            throw new Error("can't change the x-position for item which already follows other item . Make 'followLocked' of current item to false before change x-position");
        this.move_twn = new Phaser.Tween(_item, _scene.game, _scene.game.tweens);
        _item._tween = this.move_twn;
        _props.alpha = (_props.alpha == undefined) ? 1 : _props.alpha;
        _item.sizeRef = {
            w: _scene.game.width,
            h: _scene.game.height
        };
        this.move_twn.to({
            angle: _angle,
            y: _y,
            alpha: _props.alpha
        }, (_props.time || 1000), (_props.Ease || Phaser.Easing.Linear.None), true, (_props.delay || 0)).interpolation(function(v, k) {
            return Phaser.Math.bezierInterpolation(v, k)
        }).onComplete.add((function(_callbackContext, _props, _item, _scene) {
            _item._tweenData = null;
            _item._tween = null;
            _item.tweenType = null;
            if (_props.doOnComplete) {
                _props.doOnComplete.call(_callbackContext);
            }
            this.updateItemPoint(_scene.game, _item)
        }).bind(this, (_props.onCompleteContext || _scene), _props, _item, _scene));
        this.move_twn.onUpdateCallback(function(_scene, _item, _tween, _tweenElapsed, _tweenData) {
            (!_item._tweenData) && (_item._tweenData = _tweenData);
            (!_item._tween) && (_item._tween = _tween);
            (!_item.tweenType) && (_item.tweenType = "move");
        }.bind(this, _scene, _item))
    }
    ResponsiveGame.prototype.tweenXItem = function(__data, _shouldAdd) {
        var _scene = __data.scene;
        var _item = __data.props.item;
        var _props = __data.props || {}
        var _angle = _item.angle + (_props.angle || 0);
        var _x = (_props.x) ? ((_shouldAdd) ? (_item.x + (parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width)) : ((parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width))) : (_item.x);
        var _y = (_props.y) ? ((_shouldAdd) ? (_item.y + (parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height)) : ((parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height))) : (_item.y);
        if (_item.follows && _item.followLocked && _item.follows.axis == "y" && _y != _item.y)
            throw new Error("can't change the y-position for item which already follows other item . Make 'followLocked' of current item to false before change y-position");
        if (_item.follows && _item.followLocked && _item.follows.axis == "x" && _x != _item.x)
            throw new Error("can't change the x-position for item which already follows other item . Make 'followLocked' of current item to false before change x-position");
        this.move_twn = new Phaser.Tween(_item, _scene.game, _scene.game.tweens);
        _item._tween = this.move_twn;
        _props.alpha = (_props.alpha == undefined) ? 1 : _props.alpha;
        _item.sizeRef = {
            w: _scene.game.width,
            h: _scene.game.height
        };
        this.move_twn.to({
            angle: _angle,
            x: _x,
            alpha: _props.alpha
        }, (_props.time || 1000), (_props.Ease || Phaser.Easing.Linear.None), true, (_props.delay || 0)).interpolation(function(v, k) {
            return Phaser.Math.bezierInterpolation(v, k)
        }).onComplete.add((function(_callbackContext, _props, _item, _scene) {
            _item._tweenData = null;
            _item._tween = null;
            _item.tweenType = null;
            if (_props.doOnComplete) {
                _props.doOnComplete.call(_callbackContext);
            }
            this.updateItemPoint(_scene.game, _item)
        }).bind(this, (_props.onCompleteContext || _scene), _props, _item, _scene));
        this.move_twn.onUpdateCallback(function(_scene, _item, _tween, _tweenElapsed, _tweenData) {
            (!_item._tweenData) && (_item._tweenData = _tweenData);
            (!_item._tween) && (_item._tween = _tween);
            (!_item.tweenType) && (_item.tweenType = "move");
        }.bind(this, _scene, _item))
    }
    ResponsiveGame.prototype.tweenItem = function(__data, _shouldAdd) {
        var _scene = __data.scene;
        var _item = __data.props.item;
        var _props = __data.props || {}
        var _angle = _item.angle + (_props.angle || 0);
        var _x = (_props.x) ? ((_shouldAdd) ? (_item.x + (parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width)) : ((parseFloat(_props.x.split("%")[0]) / 100 * __data.scene.game.width))) : (_item.x);
        var _y = (_props.y) ? ((_shouldAdd) ? (_item.y + (parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height)) : ((parseFloat(_props.y.split("%")[0]) / 100 * __data.scene.game.height))) : (_item.y);
        if (_item.follows && _item.followLocked && _item.follows.axis == "y" && _y != _item.y)
            throw new Error("can't change the y-position for item which already follows other item . Make 'followLocked' of current item to false before change y-position");
        if (_item.follows && _item.followLocked && _item.follows.axis == "x" && _x != _item.x)
            throw new Error("can't change the x-position for item which already follows other item . Make 'followLocked' of current item to false before change x-position");
        this.move_twn = new Phaser.Tween(_item, _scene.game, _scene.game.tweens);
        _props.alpha = (_props.alpha == undefined) ? 1 : _props.alpha;
        _item.sizeRef = {
            w: _scene.game.width,
            h: _scene.game.height
        };
        this.move_twn.to({
            angle: _angle,
            x: _x,
            y: _y,
            alpha: _props.alpha
        }, (_props.time || 1000), (_props.Ease || Phaser.Easing.Linear.None), true, (_props.delay || 0)).interpolation(function(v, k) {
            return Phaser.Math.bezierInterpolation(v, k)
        }).onComplete.add((function(_callbackContext, _props, _item, _scene) {
            _item._tweenData = null;
            _item._tween = null;
            _item.tweenType = null;
            if (_props.doOnComplete) {
                _props.doOnComplete.call(_callbackContext);
            }
            this.updateItemPoint(_scene.game, _item)
        }).bind(this, (_props.onCompleteContext || _scene), _props, _item, _scene));
        this.move_twn.onUpdateCallback(function(_scene, _item, _tween, _tweenElapsed, _tweenData) {
            (!_item._tweenData) && (_item._tweenData = _tweenData);
            (!_item._tween) && (_item._tween = _tween);
            (!_item.tweenType) && (console.log(""), _item.tweenType = "move");
        }.bind(this, _scene, _item))
    };
    ResponsiveGame.prototype.applyVelocity = function(__data, __props) {
        Newsfeed.Global.responsiveObj.notify("item-follow-unlock", {
            scene: __data,
            props: {
                item: __props.item
            }
        });
        this.XVelFact = (parseFloat(__props.velX.split("%")[0])) / 100;
        this.YVelFact = (parseFloat(__props.velY.split("%")[0])) / 100;
        this.YVelFact = Math.sign(this.YVelFact) * Math.sqrt(2 * __data.game.physics.box2d.gravity.y * Math.sign(this.YVelFact) * this.YVelFact * __data.game.height);
        __props.item.body.velocity.y = this.YVelFact;
    };
    ResponsiveGame.prototype.updatePosAccordingToVelocity = function(__data, __item) {
        if (__item.body) {
            if (__item.body.velocity.x == 0 && __item.body.velocity.y == 0) {
                clearInterval(this.velocityInterval);
            } else {
                this.updateItemPoint(__data.game, __item)
            }
        }
    };
    ResponsiveGame.prototype.scaleItem = function(__data, _shouldAdd, saveOnComplete) {
        var _scene = __data.scene;
        var _item = __data.props.item;
        var _props = __data.props || {}
        var _angle = _item.angle + (_props.angle || 0);
        this._scaleFact = 1;
        this.scale_twn = (_scene.add.tween) ? (_scene.add.tween(this)) : (new Phaser.Tween(this, _scene.game, _scene.game.tweens));
        _item._scaleTwn = this.scale_twn;
        _item.sizeRef = {
            w: _scene.game.width,
            h: _scene.game.height
        };
        this.scale_twn.to({
            _scaleFact: (parseFloat(_props.scaleVal.split("%")[0])) / 100
        }, (_props.time || 1000), (_props.Ease || Phaser.Easing.Linear.None), true, (_props.delay || 0));
        this.scale_twn.onUpdateCallback(function(_scene, _item, _tween, _tweenElapsed, _tweenData) {
            (!_item._tweenData) && (_item._tweenData = _tweenData);
            (!_item._tween) && (_item._tween = _tween);
            (!_item.scale_twn) && (_item.scale_twn = _tween);
            (!_item.tweenType) && (_item.tweenType = "scale");
            this.updateItemScale(_scene, _item.name, this._scaleFact, false)
        }.bind(this, _scene, _item), this);
        this.scale_twn.onComplete.addOnce(function(_callbackContext, _props, _item, _scene, saveOnComplete) {
            _item._tweenData = null;
            _item._tween = null;
            _item._scaleTwn = null;
            _item.tweenType = null;
            if (_props.doOnComplete) {
                _props.doOnComplete.call(_callbackContext);
            }
            this._scaleFact = parseFloat(_props.scaleVal.split("%")[0]) / 100;
            this.updateItemScale(_scene, _item.name, this._scaleFact, saveOnComplete);
        }.bind(this, (_props.onCompleteContext || _scene), _props, _item, _scene, saveOnComplete), this);
        this.scale_twn.start();
    }
    ResponsiveGame.prototype.lockItem = function(_data) {
        _data.props.item.followLocked = true;
    };
    ResponsiveGame.prototype.unlockItem = function(_data) {
        _data.props.item.followLocked = false;
    };
    return ResponsiveGame;
}();