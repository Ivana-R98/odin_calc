//getting html elements
const displayTop = document.getElementById("display");
const displayBottom = document.getElementById("displayBottom");

let operation = "";
let displayedOperator = "";
let result = 0;

let operating = false;
let timesOperated = 0;
let dotclicked = 0;
let dot = document.getElementById("dot");
let n1Arr = [];
let n2Arr = [];
let n1, n2;
let equalclicked = false;
let equal = document.getElementById("equal");
    equal.disabled = true;
    equal.addEventListener("click", () => { equalclicked = true;});
    equal.addEventListener("click", operate);

// getting events for buttons
const NUMBERS = document.querySelectorAll(".number");
NUMBERS.forEach(number => {
    number.addEventListener("click", getValue)
});
const OPERATORS = document.querySelectorAll(".operator");
OPERATORS.forEach(operator => {
    if(!n1) operator.disabled = true;
})
OPERATORS.forEach(operator => {
    operator.addEventListener("click", (e) => {  
        operating = true;
        if(dotclicked > 0) dotclicked--;
        dot.disabled = false;
        if(operation === "") timesOperated++;
        if (e.target.id === "plus")  { 
            if(timesOperated !== 0 && n2 !== undefined) operate();       
            operation = "add";   
        }
        else if (e.target.id === "minus")  {  
            if(timesOperated !== 0 && n2 !== undefined) operate();
            operation = "subtract";  
        }
        else if (e.target.id === "multiply")  {  
            if(timesOperated !== 0 && n2 !== undefined) operate();
            operation = "multiply";  
        }
        else if (e.target.id === "divide")  {  
            if(timesOperated !== 0 && n2 !== undefined) operate();
            operation = "divide"; 
        }
        displayedOperator = e.target.textContent;
        displayTop.textContent = `${n1} ${displayedOperator} `;
        console.log("times: ", timesOperated)
    })
});

//getting and displaying values
function getValue(e) {
    if(operating === false) {
        OPERATORS.forEach(operator => { operator.disabled = false;})
        if(e.target.textContent === ".") {
            dotclicked++;
        }
        dotclicked > 0 ? dot.disabled = true : dot.disabled = false;
        n1Arr.push(e.target.textContent);
        n1 = Number(n1Arr.join(""));
        displayTop.textContent = `${n1Arr.join("")}`;
        OPERATORS.disabled = false;
        return n1;
    }
    if (operating === true) {
        if(e.target.textContent === ".") {
            dotclicked++;
        }
        dotclicked > 0 ? dot.disabled = true : dot.disabled = false;
        n2Arr.push(e.target.textContent);
        n2 = Number(n2Arr.join(""));
        displayTop.textContent = `${n1} ${displayedOperator} ${n2Arr.join("")}`;
        equal.disabled = false;
        return n2;
    }
}


//clear btn
const CLEAR = document.getElementById("clear").
addEventListener("click", () => {
    document.location.reload();
});

// on del, deletes last number
const DEL = document.getElementById("del").
addEventListener("click", () => {
    if(operating === false) {
        if(n1Arr[n1Arr.length-1] === '.') {
            dotclicked--;
        }
        n1Arr.pop();
        n1 = Number(n1Arr.join(""));
        console.log(n1);
        displayTop.textContent = `${n1Arr.join("")}`;
        return n1;
    }
    else if(operating === true)  {
        equal.disabled = false;
        if(n2Arr[n2Arr.length-1] === '.') {
            dotclicked--;
            dot.disabled = false;
        }
        n2Arr.pop();
        n2 = Number(n2Arr.join(""));
        displayTop.textContent = `${n1} ${displayedOperator} ${n2Arr.join("")}`;
        return n2;
    }
});

// functions for math operations
function adding(a, b) {
    return result = +a + +b; 
}

function subtracting(a, b) {
    return result = +a - +b;
}

function multiplying(a, b) {
    return result = +a * +b;
}

function dividing(a, b) {
    if (n2 === 0) {
        displayBottom.textContent = "Kekw";
        return;
    }
    return result = +a / +b;
}

// operate
function operate() {  
    if(operation === "add") adding(n1, n2);
    else if(operation === "subtract") subtracting(n1, n2);
    else if(operation === "multiply") multiplying(n1, n2);
    else if(operation === "divide" && n2 === 0) { 
        displayBottom.textContent = "Cannot divide with 0"; 
        return;
    }
    else if(operation === "divide") dividing(n1, n2);
    if(!Number.isInteger(result)) result = Number(result).toFixed(2);
    displayTop.textContent = `${n1} ${displayedOperator} ${n2}`;
    displayBottom.textContent = `${result}`;
    operation = "";
    if(equalclicked === true) {
        operating = false;
        displayTop.textContent = `${n1} ${displayedOperator} ${n2}`;
        displayBottom.textContent = `${result}`;
        n1Arr = [];
        n2Arr = [];
        n2 = undefined;
        equalclicked = false;
    }
    else {
    displayTop.textContent = `${n1} ${displayedOperator} ${n2}`;
    displayBottom.textContent = `${result}`;
    n1Arr = result.toString().split("");
    operating = true;
    n2Arr = [];
    n2 = undefined;
    }
    n1 = result;
    equal.disabled = true;
    console.log(n1Arr, n2, n1, operation);
}

