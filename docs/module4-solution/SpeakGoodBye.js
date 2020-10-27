(function (window) {
    var byeSpeaker = {};
    var  SpeakWord = 'Good Bye';
    byeSpeaker.speak = function (name) {
        console.log(SpeakWord + " " + name);
    }

    window.byeSpeaker = byeSpeaker;

})(window);