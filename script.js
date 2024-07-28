let arr1;
let enteringArr1 = true;
let arr2;

let op;

let res = "";

function Operate(arr1, arr2, op) {
  let num1 = Number(arr1);
  let num2 = Number(arr2);
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "X":
      return num1 * num2;
    case "/":
      if (arr2 == 0) {
        return divByZero();
      }
      return num1 / num2;
  }
}
function clear() {
  arr1 = "";
  arr2 = "";
  res = "";
  op = "";
  enteringArr1 = true;
  displayResult("");
  screenSmallText.innerHTML = "";
}

const buttons = document.querySelectorAll(".button");

function enterNumber(number) {
  res += number;
  displayResult(res);
}

function clickOp(op) {}

const screen = document.querySelector("#screen");
const screenSmallText = screen.querySelector("#smallLine");
const screenBigText = screen.querySelector("#bigLine");

function displayResult(text) {
  screenBigText.innerHTML = text;
}

function divByZero() {
  clear();
  return "DON'T DIVIDE BY ZERO";
}

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.classList.toggle("hover");
  });
  button.addEventListener("mouseout", () => {
    button.classList.toggle("hover");
  });
  button.addEventListener("mousedown", () => {
    button.classList.toggle("pressed");
  });
  button.addEventListener("mouseup", () => {
    button.classList.toggle("pressed");
  });
  if (button.classList.contains("number")) {
    button.addEventListener("click", (e) => {
      console.log(e.target.id || e.target.innerHTML);
      enterNumber(e.target.id || e.target.innerHTML);
    });
  }
  if (button.classList.contains("operator")) {
    button.addEventListener("click", (e) => {
      if (enteringArr1 === false && res !== "") {
        res = Operate(arr1, res, op);
        displayResult(res);
        if (res === "DON'T DIVIDE BY ZERO") {
          clear();
          displayResult("DON'T DIVIDE BY ZERO");
          return;
        }
      }
      arr1 = res;
      op = e.target.id || e.target.innerHTML;
      screenSmallText.innerHTML = res + " " + op;
      enteringArr1 = false;
      res = "";
    });
  }

  if (button.classList.contains("equal")) {
    button.addEventListener("click", () => {
      console.log("equal");
      if (enteringArr1 === false && res !== "") {
        console.log("equals");
        arr2 = res;
        displayResult(Operate(arr1, arr2, op));
        console.log(Operate(arr1, arr2, op));
        screenSmallText.innerHTML = "";
        res = "";
        enteringArr1 = true;
      }
    });
  }
  if (button.classList.contains("clear")) {
    button.addEventListener("click", () => {
      clear();
    });
  }
  if (button.classList.contains("back")) {
    button.addEventListener("click", () => {
      if (enteringArr1) {
        res = res.slice(0, res.length - 1);
        displayResult(res);
      } else if (!enteringArr1) {
        if (res === "") {
          op = "";
        } else {
          res = res.slice(0, res.length - 1);
          displayResult(res);
        }
      }
    });
  }
});
