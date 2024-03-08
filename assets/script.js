document.addEventListener('DOMContentLoaded', function() {
    // Timer
    let timeLeft = 60;
    const timerDisplay = document.getElementById('time');
    let timerInterval;
    let deductionMade = false;

    // Function to start timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                submitQuiz(); // Automatically submit quiz when time is up
            }
        }, 1000);
    }

    // Function to show current question
    function showQuestion(index) {
        console.log('Showing question at index:', index);
        questions.forEach((question, idx) => {
            if (idx === index) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
        deductionMade = false;
    }

    // Start button click event
    document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('timer').style.display = 'block';
        showQuestion(currentQuestionIndex);
        showButtons();
        startTimer();
    });

    function showButtons() {
        document.querySelectorAll('.next-question').forEach(button => {
            button.style.display = 'block';
        });
    }

    // Submit button click event
    document.getElementById('submitQuizButton').addEventListener('click', () => {
        submitQuiz(); // Call submitQuiz() directly
    });

    // Function to submit the quiz
    function submitQuiz() {
        let score = 0;
        // Calculate score based on remaining time and correct answers
        score += timeLeft; // Each remaining second is worth 1 point
        questions.forEach((question) => {
            const selectedOption = question.querySelector('input:checked');
            if (selectedOption && selectedOption.value === 'correct') {
                score += 5; // Each correct answer is worth 5 points
            }
        });

        // Prompt the user to enter their name
        const playerName = prompt("Enter your name:");

        // Get the previous high score from local storage
        let highScore = localStorage.getItem('highScore');

        // Check if the current score is higher than the existing high score
        if (!highScore || score > highScore) {
            // Update the high score and player's name if the current score is higher
            localStorage.setItem('highScore', score);
            localStorage.setItem('highScoreName', playerName);
        }

        // Display the scores
        displayScores(score, highScore);
    }

    // Function to display the current score and the high score
    function displayScores(currentScore, highScore) {
        // Get the player's name for the high score from local storage
        let highScoreName = localStorage.getItem('highScoreName');

        // Prepare the message
        let message = "Your score: " + currentScore;
        if (highScore && highScoreName) {
            message += "\nHigh Score: " + highScore + " by " + highScoreName;
        } else {
            message += "\nNo high score recorded yet.";
        }

        // Display the scores
        alert(message);

        // Reset the quiz by reloading the page
        resetQuiz();
    }

    // Function to reset the quiz state by reloading the page
    function resetQuiz() {
        location.reload();
    }

    // Hide the initial "Submit" button
    document.getElementById('submitQuizButton').style.display = 'none';

    // Next button click event
    document.querySelectorAll('.next-question').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Next button clicked.');
            console.log('deductionMade before:', deductionMade);
            const selectedOption = questions[currentQuestionIndex].querySelector('input:checked');
            console.log('Selected option value:', selectedOption ? selectedOption.value : 'No option selected');
            if (selectedOption && selectedOption.value !== 'correct') {
                // Subtract 5 seconds if the selected answer is incorrect
                timeLeft -= 5;
                if (timeLeft < 0) {
                    timeLeft = 0;
                }
                console.log('Time left after deduction:', timeLeft);
                timerDisplay.textContent = timeLeft;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                currentQuestionIndex = questions.length - 1; // Ensure it doesn't go beyond the last question
                document.querySelector('.next-question').style.display = 'none';
                document.getElementById('submitQuizButton').style.display = 'block';
            } else {
                // If it's not the last question, show "Next" button and hide "Submit" button
                document.querySelector('.next-question').style.display = 'block';
                document.getElementById('submitQuizButton').style.display = 'none';
            }
            showQuestion(currentQuestionIndex);
        });
    });

    // js show one question at a time
    const questions = document.querySelectorAll('.question');
    let currentQuestionIndex = 0;

});
