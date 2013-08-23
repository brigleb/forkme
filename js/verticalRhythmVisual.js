// script for showing vertical rhythm grid as provided by compass mixin debug-vertical-alignment
var verticalDebugMode = false;


$("footer").children('.vertical-rhythm-button').on("click", function() {
    verticalDebugMode = !verticalDebugMode;
    if (verticalDebugMode)
        verticalDebugWithCompassOn();
    else
        verticalDebugWithCompassOff();
});

function showVerticalRhythm(a) {
    a.css('background-image', '-webkit-gradient(linear, 50% 100%, 50% 0%, color-stop(5%, rgba(0, 0, 0, 0.5)), color-stop(5%, rgba(0, 0, 0, 0)))');
    a.css('background-image', '-webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%)');
    a.css('background-image', '-moz-linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%)');
    a.css('background-image', '-o-linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%)');
    a.css('background-image', 'linear-gradient(bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0) 5%)');
    a.css('-webkit-background-size', '100% 1.5em;');
    a.css('-moz-background-size', '100% 1.5em');
    a.css('-o-background-size', '100% 1.5em');
    a.css('background-size', '100% 1.5em');
    a.css('background-position', 'left top');
}

function verticalDebugWithCompassOn() {
    $(".test").css('background-image', 'none');
    $(".test").css('background-color', '#bbbbbb');
    showVerticalRhythm($(".content"));
    showVerticalRhythm($(".test"));
}

function verticalDebugWithCompassOff() {
    $(".test").css('background-color', 'none');
    $(".test").css('background-image', 'url(\'./images/escheresque.png\')');
    $(".content").css('background-image', 'none');
    hideVerticalRhythm($(".test"));
    hideVerticalRhythm($(".content"));
}

function hideVerticalRhythm(a) {
    a.css('-webkit-background-size', '');
    a.css('-moz-background-size', '');
    a.css('-o-background-size', '');
    a.css('background-size', '');
    a.css('background-position', '');
}