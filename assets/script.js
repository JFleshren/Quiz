document.addEventListener('DOMContentLoaded', function() {
    let timeLeft = 60;
    const timerDisplay = document.getElementById('time');

    // Define currentQuestionIndex here
    let currentQuestionIndex = 0;

    // Function to start timer
    function startTimer() {
    }

    // Event listener for start button
    document.getElementById('startButton').addEventListener('click', () => {
        // Hide start screen
        document.getElementById('startScreen').style.display = 'none';
        // Show the timer
        document.getElementById('timer').style.display = 'block';
        // Show first Q
        showQuestion(currentQuestionIndex);
        startTimer();
    });

    // js show one question at a time
    const questions = document.querySelectorAll('.question');

    // Function to show current question
    function showQuestion(index) {
        questions.forEach((question, idx) => {
            if (idx === index) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    }

    // Event listener for "Next" button
    document.querySelector('.next-question').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            currentQuestionIndex = questions.length - 1;
        }
        showQuestion(currentQuestionIndex);
    });
});

