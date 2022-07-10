var Newsfeed = Newsfeed || {};

Newsfeed.Global = {
    initWidth: 0,
    initHeight: 0,
    responsiveObj: null,
    orientation: "portrait",
    gameBgY: 0,
    playedOnce: false,
    enableBody: function (spr) {
        this.game.physics.box2d.enable(spr);
    },
    gOverNum: "",
    playAgainBool: false,
    finalScore: 100,
    URL_DATA: "./data.php",
    URL_CREATE: "./create.php",
    URL_VUPDATE: "./valueUpdater.php",
    game_key: "",
    level: "",
    winStreak: 0,
    serverObj: null,
    isIPhone: false,
    soundOff: false,
    tileY: 0,
    footY: 0,
    pineY:0,
    isIOS : false,
    U_ID: 0
}