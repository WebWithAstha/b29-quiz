const quizQuestions = [
  {
    question: "Which method is used to select an element by its ID in the DOM?",
    choices: [
      "getElementById",
      "querySelectorAll",
      "getElementsByClassName",
      "querySelector",
    ],
    correctAnswer: "getElementById",
  },
  {
    question: "What does `document.createElement()` do?",
    choices: [
      "Creates a new element in the HTML document",
      "Deletes an element from the HTML document",
      "Returns an existing element by its ID",
      "Applies a style to an element",
    ],
    correctAnswer: "Creates a new element in the HTML document",
  },
  {
    question:
      "Which method would you use to add a new child element to a specific parent element?",
    choices: ["appendChild", "removeChild", "replaceChild", "insertBefore"],
    correctAnswer: "appendChild",
  },
];

const qna = document.querySelector("#qna");
const quesDiv = document.querySelector("#question");
const choicesDiv = document.querySelector("#answers");
const submitBtn = document.querySelector("#submit");
const scoreBoard = document.querySelector("#score-board");

scoreBoard.style.display = "none";

let currentQIndex = 0;

let score = 0;

function displayQuestion() {
  // displaying question
  quesDiv.innerHTML = `<span class="font-normal">Q.${
    currentQIndex + 1
  }</span> ${quizQuestions[currentQIndex].question}`;

  // displaying choices
  choicesDiv.innerHTML = "";
  quizQuestions[currentQIndex].choices.forEach((elem, i) => {
    choicesDiv.innerHTML += `
        <div
              class="choice flex group border border-white/[.2] hover:border-purple-500 duration-300 mb-4 rounded-xl px-4 py-2 items-center justify-between"
            >
              <h4 class="w-[90%]"><span>${i + 1}.</span> <span class="value ">${elem}</span></h4>
              <div
                class="flex items-center justify-center p-2 rounded-full border border-white/[.3] group-hover:border-purple-500 duration-300"
              ></div>
            </div>
        `;
  });
}

function addEventOnOption() {
  document.querySelectorAll(".choice").forEach((elem, i) => {
    elem.addEventListener("click", (event) => {
      let selectedAns = elem.querySelector(".value").textContent;
      let correctAnswer = quizQuestions[currentQIndex].correctAnswer;
      if (selectedAns == correctAnswer) {
        score++;
      }

      currentQIndex++;
      console.log(currentQIndex);

      if (currentQIndex === quizQuestions.length) {
        displayScoreBoard();
      }

      displayQuestion();
      addEventOnOption();
    });
  });
}

function displayScoreBoard() {
  qna.style.display = "none";
  scoreBoard.style.display = "flex";
  scoreBoard.innerHTML += `
     <div id="feedback">
    <h1 class="font-medium text-xl italic">${
      score < 2 ? "Oops" : score == 2 ? "You were close" : "Hurray"
    }</h1>
</div>
<div id="score" class="text-2xl font-bold tracking-widest rounded-full flex items-center justify-center w-32 aspect-square mb-4 border-purple-500 border">
    <span>${score}/${quizQuestions.length}</span>
</div>
 <button
id="reset"
class="bg-purple-600 px-10 py-2  font-medium uppercase hover:bg-purple-500 duration-300 rounded-full mx-auto block"
>
Reset
</button>
    `;


    document.querySelector("#reset").addEventListener('click',(e)=>{
        score = 0;
        currentQIndex = 0;
        scoreBoard.style.display = "none";
        qna.style.display = "block";
        displayQuestion();
        addEventOnOption();
    })
}

displayQuestion();
addEventOnOption();
