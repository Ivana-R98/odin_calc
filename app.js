let displayNum = document.querySelector("#display");
let nr1, nr2;
let num1 = 0, num2 = 0;
let click = false;
let plus = false;
let minus = false;
let time = false;
let divide = false;
let equal = false;
let result;
let count = 0;
let dotclicked = 0; 

let dot = document.getElementById("dot");
dot.disabled = true;

// display result
let displayRes = document.getElementById("displayres");

// selects all numbers
const NUMBERS = document.querySelectorAll(".number");
NUMBERS.forEach(number => {
    number.addEventListener("click", displayVal)
});

//gets first number
let arrnum1 = [];
let arrnum2 = [];
function displayVal(e) {
    if (click === false) {
        if (arrnum1.length === 0){
            dot.disabled = false;
        }
        arrnum1.push(e.target.textContent);
        if(e.target.id === "dot") {
            dotclicked++;
            if(dotclicked >= 1) {
                dot.disabled = true;
            }
        }
        nr1 = arrnum1.join("");
        displayNum.textContent = nr1;
        num1 = Number(nr1);
        return num1;
    }
    if (arrnum2.length === 0){
        dot.disabled = false;
    }
    if (click === true) {
        arrnum2.push(e.target.textContent);
        if(e.target.id === "dot") {
            dotclicked++;
            if(dotclicked >= 1) {
                dot.disabled = true;
            }
        }
        nr2 = arrnum2.join("");
        displayNum.textContent = nr2;
        num2 = Number(nr2);
        return num2;
    }   
}

// on click clear, reloads calculator
const CLEAR = document.getElementById("clear").
addEventListener("click", () => {
    document.location.reload();
});

// on del, deletes last number
const DEL = document.getElementById("del").
addEventListener("click", (e) => {
    if(click === false) {
        arrnum1.pop();
        if(e.target.id === "dot"){
            dotclicked--;
        }
        console.log(arrnum1);
        nr1 = arrnum1.join("");
        displayNum.textContent = nr1;
        num1 = Number(nr1);
        return num1;
    }
    else if(click === true) {
        arrnum2.pop();
        if(e.target.id === "dot"){
            dotclicked--;
        }
        console.log(arrnum2);
        nr2 = arrnum2.join("");
        displayNum.textContent = nr2;
        num2 = Number(nr2);
        return num2;
    }
});

// selects all operators
const OPERATORS = document.querySelectorAll(".operator");
OPERATORS.forEach(operator => {
    operator.addEventListener("click", (e) => { 
        show = e.target.textContent; 
        displayNum.textContent = show;    
        click = true;
        if (e.target.id === "plus")  plus = true;
        else if (e.target.id === "minus")   minus = true;
        else if (e.target.id === "times")   time = true;
        else if (e.target.id === "divide")  divide = true; 
    })
});

const EQUAL = document.getElementById("equal").
addEventListener("click", () => {
    equal = true;
    operate(num1, num2);
});

function operate (num1, num2) {
    let number1;
    if(count === 0) {
        number1 = +num1;
    }
    else if(count > 0) {
        number1 = +result;
    }
    let number2 = +num2;
    if(equal === true) {
        if(plus === true) {
            result = number1 + number2;
            plus = false;
            displayNum.classList.add("a");
            displayNum.textContent = `${number1} + ${number2}`;
        }
        if(minus === true){
            result = number1 - number2;
            minus = false;
            displayNum.classList.add("a");
            displayNum.textContent = `${number1} - ${number2}`;
        }
        if(time === true) {
            result = number1 * number2;
            time = false;
            displayNum.classList.add("a");
            displayNum.textContent = `${number1} * ${number2}`;
        }
        if(divide === true) {
            result = number1 / number2;
            if(Number.isInteger(result) === false) {
                result = result.toFixed(2);
            }
            if(number2 === 0) {
                result = "KEKW";
                displayNum.classList.add("a");
                displayNum.textContent = `${number1} ÷ ${number2}`;
                displayRes.textContent = result;
                return;
            }
            divide = false;
            displayNum.classList.add("a");
            displayNum.textContent = `${number1} ÷ ${number2}`;
        } 
        if (dotclicked > 0) {
            if(Number.isInteger(result) === false) {
                displayRes.textContent = result;
                num1 = result.toFixed(2);
            }
            else {
                displayRes.textContent = result;
                num1 = result.toFixed(2); 
            }
        }
        else {
            displayRes.textContent = +result;
            num1 = +result;
        }
        arrnum2 = [];
        equal = false;
        count++;
    }
}