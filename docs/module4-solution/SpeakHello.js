(function (window) {
    var helloSpeaker = {};
    var  SpeakWord = 'Hello';
    helloSpeaker.speak = function (name) {
        console.log(SpeakWord + " " + name);
    }

    window.helloSpeaker = helloSpeaker;

})(window);