let surname = document.getElementById("surname");
let btn = document.getElementById("btn_tiket");
let tiket = document.getElementById("tiket_input_number");
let cross = document.getElementById("crossBtn");
let studentsList = document.querySelector("ol");

let num;
let numCheck;
let studentsGroup = [];
let random;

function Student(surname, tiket) {
  this.surname = surname;
  this.tiket = tiket;
}

function randomNumber(min, max) {
  num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function checkNumber() {
  if (studentsGroup.length == 0) {
    random = num;
  } else {
    studentsGroup.forEach((i) => {
      if (i.tiket == num) {
        randomNumber(1, 20);
        checkNumber();
      } else if ((studentsGroup.length <= 19) & (studentsGroup.length > 0)) {
        random = num;
      } else {
        random = NaT;
        console.log("The tiket is over!");
      }
    });
  }
}

function studentScreen() {
  let enter = [];
  studentsGroup.forEach((i) => {
    enter.push(`${i.surname} білет № ${i.tiket}`);
  });
  let enterToHtml = enter.map((item) => `<li>${item}</li>`).join("");
  studentsList.innerHTML = enterToHtml;
}

function pushStudent() {
  surname.value = studentsGroup.push(new Student(surname.value, random));
}

function inner() {
  randomNumber(1, 20);
  checkNumber();
  tiket.value = random;
  btn.disabled = true;
  // pushStudent();
  // studentScreen();
}

function clean() {
  if ((studentsGroup.length <= 19) & (btn.disabled == true)) {
    pushStudent();
    studentScreen();
    surname.value = "";
    tiket.value = "";
    btn.disabled = false;
  }
}

function enterKey(e) {
  let key = e.which || e.keyCode;
  if ((btn.disabled == false) & (key == 13)) {
    // код клавиши Enter
    inner();
  }

  if ((btn.disabled == true) & (key == 27)) {
    // код клавиши Esc
    clean();
  }
}

document.addEventListener("keyup", enterKey);
btn.addEventListener("click", inner);
cross.addEventListener("click", clean);
