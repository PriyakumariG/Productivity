let display = document.querySelector("#display");
let miniDisplay = document.querySelector("#miniDisplay");
let backsps = document.querySelector("#backsps");
let data = [], temp = [];

function init(x){
    data = [];
    temp = [];
    display.innerHTML =x;
    miniDisplay.innerHTML = "&nbsp;";
    backsps.innerHTML = "AC";
}

function input(x, y){
    temp.push(x);
    display.innerHTML = temp.join("");
    data.push(y||x);
    backsps.innerHTML = "&DoubleLeftArrow;";
    evaluate();
}

function backspace(){
    if(backsps.innerHTML == "AC") init("0");
    else {
        data.pop();
        temp.pop();
        display.innerHTML = temp.length == 0? "0":temp.join("");
        temp.length == 0? init("0"):evaluate();
    }
}

function evaluate(){
    try{
        let x = parseFloat(eval(data.join("")).toFixed(11));
        miniDisplay.innerHTML = x;
        return x;
    }catch{}
}

function getAns(){
    let x = evaluate();
    init(x);
    data.push(x);
    temp.push(x);
}