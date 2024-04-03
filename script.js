const options = {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "Put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; Mix",
    chaos: "Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Move; Period of word",
    machine: "Device or appliance",
    scent: "Distinctive smell",
    spice: "Aromatic or pungent plant substance used to flavor food",
    pause: "A temporary stop in action or speech",
    bounce: "Spring back after hitting a surface",
    blend: "Mix together thoroughly",
    disorder: "Lack of order or regular arrangement",
    maze: "A network of paths and hedges designed as a puzzle",
    disrupt: "Interrupt by causing a disturbance or problem",
    transition: "A change from one state or condition to another",
    apparatus: "Equipment or machinery used for a specific purpose",
    fragrance: "A pleasant aroma or smell",
    harmony: "Agreement or concord",
    turmoil: "A state of great disturbance, confusion, or uncertainty",
    shuffle: "Move things around or mix them up",
    concoction: "A mixture of various ingredients or elements",
    turmoil: "A state of great disturbance or confusion",
    chaos: "Complete disorder and confusion",
    disarray: "A state of disorganization or untidiness",
    rearrange: "Organize differently",
    blend: "Combine different substances to create a harmonious mixture",
    contraption: "A mechanical device or gadget",
    tangle: "Twist together into a confused mass",
    concoct: "Create or devise",
    jumble: "Mix up in a confused or untidy way",
    scatter: "Throw in various random directions",
    concoction: "A mixture of various ingredients or elements",
    array: "An impressive display or range of a particular type of thing",
    mingle: "Mix or cause to mix together",
    disorder: "A state of confusion or untidiness",
    blend: "Mix together different elements",
    shuffle: "Move things around or mix them up",
    concoct: "Create or devise using skill and ingenuity",
    assortment: "A collection of various types of things",
    disorder: "A state of confusion or untidiness",
    clutter: "A collection of things lying about in an untidy state",
    confusion: "A lack of clarity or order",
    amalgamation: "The action, process, or result of combining or uniting",
    blend: "Mix together different elements",
    fusion: "The process or result of joining two or more things together to form a single entity"
};

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",randomHint = "";
let winCount = 0,lossCount = 0;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
  let lettersButtons = document.querySelectorAll(".letters");
  stopGame();
};

startBtn.addEventListener("click", () => {
  controls.classList.add("hide");
  init();
});

const stopGame = () => {
  controls.classList.remove("hide");
};

const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInpSection.innerText = "";
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id="wordHint">
  <span>Hint: </span>${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  userInpSection.innerHTML = displayItem;
  userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
};

const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.innerText = "";
  randomHint = "";
  message.innerText = "";
  userInpSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");

    button.innerText = String.fromCharCode(i);

    button.addEventListener("click", () => {
      message.innerText = `Correct Letter`;
      message.style.color = "#008000";
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");

      //If array contains clicked value replace the matched Dash with Letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //If character in array is same as clicked button
          if (char === button.innerText) {
            button.classList.add("correct");
            //Replace dash with letter
            inputSpace[index].innerText = char;
            //increment counter
            winCount += 1;
            //If winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = "You Won";
              startBtn.innerText = "Restart";
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        button.classList.add("incorrect");
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = "#ff0000";
        if (lossCount == 0) {
          word.innerHTML = `The word was: <span>${randomWord}</span>`;
          resultText.innerHTML = "Game Over";
          blocker();
        }
      }

      //Disable clicked buttons
      button.disabled = true;
    });

    //Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
