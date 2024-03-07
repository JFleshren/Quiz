document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var answers = {
        question1: getSelectedValue('question1'),
        question2: getSelectedValue('question2'),
        question3: getSelectedValue('question3'),
        question4: getSelectedValue('question4'),
        question5: getSelectedValue('question5')
    };

    function getSelectedValue(name) {
        var element = document.querySelector('input[name="' + name + '"]:checked');
        return element ? element.value : null;
    }

    var score = 0;
    if (answers.question1 === 'both') {
        score++;
    }
    if (answers.question2 === 'script-src') {
        score++;
    }
    if (answers.question3 === 'false') {
        score++;
    }
    if (answers.question4 === 'function-myFunction') {
        score++;
    }
    if (answers.question5 === 'if-three-equals') {
        score++;
    }

    // score
    alert('Your score is: ' + score);
});
