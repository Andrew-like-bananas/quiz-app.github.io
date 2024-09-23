// Initialize data storage (list) here
// A list that holds multiple dictionaries (key-value pairs)
const database = [
    {
        question : "What is the capital of Japan?",
        options : ["1. Nagoya", "2. Hokkaido", "3. Tokyo", "4. Kyoto"],
        answer : "3. Tokyo"
    },

    {
        question : "What is the tallest mountain in Singapore?",
        options : ["1. Mount Faber", "2. Bukit Batok", "3. Jurong Hill", "4. Bukit Timah Hill"],
        answer : "4. Bukit Timah Hill"
    },

    {
        question : "In which year did the Titanic sink?",
        options : ["1. 1920", "2. 1912", "3. 1922", "4. 1924"],
        answer : "2. 1912"
    },

    {
        question : "Which year was iPhone first launched?",
        options : ["1. 2004", "2. 2005", "3. 2006", "4. 2007"],
        answer : "4. 2007"
    },

    {
        question : "Which company invented ChatGPT?",
        options : ["1. IBM", "2. Nvidia", "3. ChatGPT", "4. OpenAI"],
        answer : "4. OpenAI"
    },

    {
        question : "When is Albert Einstein's Birthday?",
        options : ["1. 14 March 1879", "2. 12 July 1949", "3. 8 August 1783", "4. 23 October 1992"],
        answer : "1. 14 March 1879"
    },

    {
        question : "What is the distance from the Earth to the Moon?",
        options : ["1. 400,300 km", "2. 474,382 km", "3. 384,400 km", "4. 999,999 km"],
        answer : "3. 384,400 km"
    },
];

// Identify all HTML components that we want to control
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerText = document.getElementById('countdownText')
const progressBarFill = document.getElementById('progress-bar-fill')
const optionContainer = document.getElementById('option-container')
const resultLabel = document.getElementById('result')
const feedbackLabel = document.getElementById('feedback')
const progressBarContainer = document.getElementById('progress-bar-container');
const timerElement = document.getElementById('timer')
const endLabel = document.getElementById('end')

progressBarFill.style.width = '0%';
feedbackLabel.style.display = ''; // hide feedback label

let currentQuestionNo = 0; 
let timer = 0;
let score = 0;

startButton.addEventListener('click', startQuiz)
function startQuiz()
{
    startButton.style.display = 'none'; // hide the start button
    loadNextQuestion();
}

function loadNextQuestion()
{
    // Reset timer
    clearInterval(timer);

    if(currentQuestionNo < database.length)
    {
        // Update progress bar
        progressBarFill.style.width = `${((currentQuestionNo + 1) / database.length) * 100}%`;

        // Set initial countdown value
        timerText.textContent = 15;
        const currentQuestionset = database[currentQuestionNo];
        questionElement.textContent = currentQuestionset.question;

        // Remove all previous button clones
        optionContainer.innerHTML = '';

        // Clone 4 option buttons for a button
        currentQuestionset.options.forEach((option) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            optionContainer.appendChild(button);
            button.addEventListener('click', () => {
                disableOptionButtons();
                checkAnswer(option);
            });
        });

        // re-enable option buttons
        enableOptionButtons();

        // Start the countdown timer
        // Define in {} what to do when timer fires
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer
                clearInterval(timer);
                currentQuestionNo = currentQuestionNo + 1;
                loadNextQuestion();
            }
        }, 1000);
    } else 
    {
        EndQuiz();
    }
}

function checkAnswer(option)
{
    // Retrieve answer key of a question set
    const answer = database[currentQuestionNo].answer;

    if (option === answer)
    {
        score = score + 1;
    }

    resultLabel.textContent = `You scored ${score} points`;
    showFeedback(option);
}

function showFeedback(option)
{
    const answer = database[currentQuestionNo].answer;
    let feedbackText = "";
    if(option === answer)
    {
        feedbackText = "That's correct! Keep going!"
    } else if (option === null)
    {
        feedbackText = "Time is up, next question."
    } else {
        feedbackText = "Womp Womp... Try again!"
    }

    feedbackLabel.textContent = feedbackText;

    // Wait for 3 seconds before it loads the next question
    setTimeout(() => {
        // Define  what we do 3 seconds later
        // Make it load next question correct answer is clicked
        currentQuestionNo = currentQuestionNo + 1;
        loadNextQuestion();
        feedbackLabel.textContent = "";
    }, 3000);
}

function disableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Disable all option buttons with a "for-each" loop
    allOptionButtons.forEach(button => {
        button.disabled = true;
    });
}

function enableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Enable all option buttons with a "for-each" loop
    allOptionButtons.forEach(button => {
        button.disabled = false;
    });
}

function EndQuiz()
{
    clearInterval(timer);
    progressBarContainer.style.display = 'none';
    optionContainer.style.display = 'none';
    timerElement.style.display = 'none';
    feedbackLabel.textContent = "";
    questionElement.textContent = "Quiz Ended";
    resultLabel.textContent = "";
    endLabel.textContent = `You scored ${score} points! Let's try again!`;
}