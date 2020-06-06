var currentQuestion = 0;
var score = 0;
var totalQuestion = questions.length;
var interval;

var container = document.getElementById('quizContainer');
var questionElement = document.getElementById('question');
var number = document.getElementById('number');
var opt1 = document.getElementById('option1');
var opt2 = document.getElementById('option2');
var opt3 = document.getElementById('option3');
var opt4 = document.getElementById('option4');
var button = document.getElementById('button');
var homeButton = document.getElementById('homeButton');
var getResult = document.getElementById('result');
var remainingTime = document.getElementById('remaining-time');
var progressBarFull = document.getElementById('progressBarFull');

function startTime() {
    var time = 60;
    remainingTime.innerHTML = time;
    interval = setInterval(() => {
        time--;
        if (time < 10) {
            time = "0" + time;
        }
        if (time < 10) {
            remainingTime.classList.add("less-time");
        }
        remainingTime.innerHTML = time;
        if (time == 0) {
            clearInterval(interval);
            container.style.display = 'none';
            getResult.style.display = '';
            getResult.innerHTML = "Your result : " + score + "/" + totalQuestion + `<br>`;
            getResult.innerHTML += `<a href = "feedback.html" id = "homeButton" class = "homeButton" >Feedback</button>`;
            if (score < 2) {
                alert("Sorry time up");
            }
            return;
        }

    }, 1000)
}

function loadQuestion(questionIndex) {
    var que = questions[questionIndex];
    number.textContent = currentQuestion + 1 + "/" + totalQuestion;
    progressBarFull.style.width = `${((currentQuestion +1) / totalQuestion ) * 100}%`;
    questionElement.textContent = (questionIndex + 1) + ') ' + que.question;
    opt1.textContent = que.option1;
    opt2.textContent = que.option2;
    opt3.textContent = que.option3;
    opt4.textContent = que.option4;
};

function loadNextQuestion() {
    var selected = document.querySelector('input[type=radio]:checked');
    if (!selected) {
        alert("Please select your answer");
        return;
    }
    var answer = selected.value;
    if (questions[currentQuestion].answer == answer) {
        score++;
    }
    selected.checked = false;
    currentQuestion++;
    
    if (currentQuestion == totalQuestion - 1) {
        button.innerHTML = 'Finish';
    }
    if (currentQuestion == totalQuestion) {
        container.style.display = 'none';
        getResult.style.display = '';
        getResult.innerHTML = "Your result : " + score + "/" + totalQuestion + `<br>`;
        getResult.innerHTML += `<a href = "feedback.html" id = "homeButton" class = "homeButton" >Feedback</button>`;
        if (score < 2) {
            alert("Sorry you didn't pass the quiz competition");
        }
        return;
    }
    loadQuestion(currentQuestion);
}
startTime();
loadQuestion(currentQuestion);
