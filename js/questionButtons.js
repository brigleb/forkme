var previousText;
var buttonHeight = $('.question').css('height');
//array of question-answer pairs for reference
var questions = [{
    question: "What is your favorite WordPress function? Why?",
    answer: "In all honesty I’m new to WordPress, so I had to do some research for this question. After reading through the WordPress function reference and consulting some recent blog posts, a definite favorite would be wp_remote_get from the HTTP API. A majority of my projects in the past few months have relied heavily on hitting an endpoint and retrieving and parsing JSON for their content. The ability to leverage relevant data and APIs stored across the web-- from tweets to current events to data scraped from Walt Whitman’s personal letters-- has become a necessity in keeping my work dynamic and interesting. ",
    expandedSize: "350px"
}, {
    question: "Name three good reasons to start a branch in a version control system.",
    answer: "Three reasons come to mind immediately as real-life motivation I’ve had for branching a repo. The first is when I want to add a feature or fix a nontrivial issue. If I want to stop working on the issue and commit other changes to master, I can do so without worrying about merge conflicts with unfinished files, since they’re modularized on my feature branch. Additionally, if my methods for creating the feature are new and ambitious, my main workflow will not be affected if I throw the project into a state of disrepair on a branch. I have also created branches for investigating multiple solutions for an issue or feature. An iOS application I built recently relied heavily on a map view, and I did not know if Apple’s or Google’s map API would better suit my needs. So I created two separate branches, worked on each one a bit, and merged the one with the best implementation (Google, as it turned out) into master. In this case I was alone in determining the best approach; similarly, two or more people each could create branches and attempt to provide the best resolution to an issue, with the team selecting only the optimal branch to merge with master. The third reason I have encountered is for keeping the versions of a project you release and ship organized. Having a branch for each release enables the development team to continue working on master forever, pushing bug fixes and updates to existing releases and creating new version branches when everyone is satisfied with a new set of features.",
    expandedSize: "700px"
}, {
    question: "Why is it better to use CSS (rather than JavaScript, if possible) for a basic web page animation?",
    answer: "While I resorted to jQuery on this page for animating height changes of <div> elements, I have been trying to use the animation power of CSS3 whenever I see that I can. This page is small, so the extra JavaScript probably has little effect on its performance, but this is not always the case for larger projects or when many programs are running at once. Since the browser executes CSS animations, they have the potential to be performance-accelerated by your machine’s hardware. The browser also is better equipped to optimize performance by altering the frame rate when it can be afforded, like when you switch tabs. Personally, I think it gets messy when you’re manipulating element styles in both scripts and stylesheets. You might try to tweak a style in CSS a few months down the line only to find its value confusingly tied to a JavaScript function. I would like to try using jQuery simply for triggering the CSS animations that I couldn’t accomplish with pure CSS3 in this project or look into using a plugin like jQuery Transit. ",
    expandedSize: "500px"
}, {
    question: "What is your favorite project that you've done? (include link and/or image)",
    answer: "I am partial to my visualizations of methods for building the Sierpinski triangle (http://www.sierpinski.latfj.com) for a few reasons. It was my introduction to HTML5 canvas-- which I now love and even incorporated into this page. I also exponentially increased my knowledge about my favorite classic fractal and even got to do some cool math writing the JavaScipt to power the animations. Recently I’ve had the opportunity to help build the front-end and node server for Uncorked Studios’ (not yet released) new site. The project has introduced me to Compass, Grunt, responsive grid systems, and just how much actually goes into building a full-scale site. That said, this question didn’t mention that the project had to be industry-related. In that case I have to mention how much unadulterated fun I had recording an album this spring with my friends in our folk rock band. It’s due out in a couple weeks! ",
    expandedSize: "450px"
}, {
    question: "Look at our portfolio and find something we've built that could be improved. Suggest how!",
    answer: " I was poking around the Metropologie site on Chrome. The background images have a neat unfurling effect as they load from top to bottom, but each individual page seems to take a little longer than average to load. As a user I don’t have a problem with this except in the Guides section. A new page has to load for each guide I want to read about, and I navigate back to the list of guides using my browser’s back button. And imagining my parents and grandparents trying to read the white text against some of the background images is amusing but not too pretty. I can see improving the user experience by creating a drop-down box for each guide profile so that I can read as many as I want without loading several new pages, and I think it wouldn’t be a bad idea to consider either tweaking the font color or giving the text fields a background (with a low-ish alpha value, maybe?). Also, it’s a silly bug, but the link to the Salt, Fire & Time site from http://needmoredesigns.com/work/salt-fire-time/ is not directed to the right url. ",
    expandedSize: "550px"
}];

//wait to set the buttonheights
document.onload = function() {

    //set expanded to false for each question button
    $('.question').each(function(i) {
        $(this).data('expanded', false);
        $(this).css('height', buttonHeight);
        buttonHeight = $('.question').css('height');
    });

}


$(".question").hover(function() {
        //if the box isn't expanded, fade in the corresponding question text on mouseover
        if (!$(this).data('expanded')) {
            $(this).children('h2').fadeOut(0, function() {
                var currentQuestion = questions[$(this).text() - 1];
                $(this).data('question', currentQuestion);
                $(this).text(currentQuestion.question).fadeIn(750);
                $(this).css('font-size', '1em');
            });
        }
    },
    //if the box isn't expanded, fade in the corresponding question number on mouseout

    function() {
        if (!$(this).data('expanded')) {
            $(this).children('h2').fadeOut(0, function() {
                var questionNum = questions.indexOf($(this).data('question')) + 1;
                $(this).text(questionNum).fadeIn(400);
                $(this).css('font-size', '1.5em');
            });
        }
    });

$(".question").on("click", function() {
    //set expanded variable and expand if it is true
    $(this).data('expanded', !$(this).data('expanded'));
    if ($(this).data('expanded')) {
        var expandedSize = $(this).children('h2').data('question').expandedSize;
        $(this).animate({
            height: expandedSize
        }, 1000, function() {

            var answerText = $(this).children('h2').data('question').answer;
            //make sure the user didn't click again to contract before displaying content
            if ($(this).data('expanded')) {
                $(this).children('p').text(answerText).hide().fadeIn(1000);
            }

        });
    }
    //contract back to original height and text if false
    else {
        $(this).children('p').text('').fadeIn(1000);
        $(this).animate({
            height: buttonHeight
        });
    }

});