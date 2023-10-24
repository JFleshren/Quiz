var answer1 = document.querySelector('input[name="question1"]:checked').value;

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var score = 0;
    if (answer1 === '//ANSWER GOES HERE') {
        score++;
    }