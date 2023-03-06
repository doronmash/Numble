var index = 1;
var result = 0;
var cellIndex = 0;
var equation = [];

function getCurrentRow(index) {
    var arr = document.getElementsByClassName("mathText" + (index));
    return arr;
}

function disableElements(cellIndex) {
    var arrToDisable = [];
    var arrToEnable = [];
    if (cellIndex % 2 === 0) {
        arrToDisable = document.getElementsByClassName("sign");
        arrToEnable = document.getElementsByClassName("number");
    }
    else {
        arrToDisable = document.getElementsByClassName("number");
        arrToEnable = document.getElementsByClassName("sign");

    }

    for (var i = 0; i < arrToDisable.length; i++) {
        arrToDisable[i].disabled = true;
    }

    for (var i = 0; i < arrToEnable.length; i++) {
        arrToEnable[i].disabled = false;
    }
}

function insertValue(value) {
    var currentRow = getCurrentRow(index);

    if (cellIndex < currentRow.length) {

        currentRow[cellIndex].value = value;
        cellIndex++;
        disableElements(cellIndex);
    }
    else {
        console.log("equation is full");
    }
}

function deleteValue() {
    if (cellIndex != 0) {
        cellIndex--;
        var currentRow = getCurrentRow(index);
        currentRow[cellIndex].value = "";
        disableElements(cellIndex);
    }
    else {
        var currentRow = getCurrentRow(index);
        currentRow[cellIndex].value = "";
        disableElements(cellIndex);
    }
}

function start() {
    reset();
    var sign = ['+', '-', '*', '/', '*'];
    equation = new Array(7);

    var h1 = document.getElementById("winH1");
    h1.style.display = "none";

    for (var i = 0; i < 7; i++) {
        if (i % 2 === 0) {
            equation[i] = Math.floor(Math.random() * 9)+1;
        }
        else {
            equation[i] = sign[Math.floor(Math.random() * 5)]
        }
    }
    disableElements(cellIndex);
    result = calculateResultNumber(equation);
    if (!Number.isInteger(result)) {
        start();
    }
    document.getElementById("label" + index).innerHTML = ("= " + result);
    document.getElementById("start").disabled = true;
}
function reset() {

    index = 1;
    cellIndex = 0;
    //var arr = document.getElementsByClassName("mathText" + (index));
    for (n=1;n<=6;n++) {
        const boxes =  document.getElementsByClassName('mathText' +(n)) ;
        for (const box of boxes) {
          box.style.backgroundColor = '#56629D';;
          box.value='';
          box.disabled = false;
        }
        document.getElementById("label" + n).innerHTML = ("=");
    }
    const bts =  document.getElementsByClassName('calcButton') ;
    for (const bt of bts) {
      bt.style.backgroundColor = '#00b3b3';
      bt.disabled = false;
    }
}

function calculateResultNumber(equation) {
    var stringEquation = equation.join('');
    console.log(stringEquation);
    return eval(stringEquation);
}

function enter() {
    var inputEquation = getCurrentRow(index);

    if (cellIndex == inputEquation.length) {
        var result = checkResult();
        if (result) {
            console.log("winner");
            var h1 = document.getElementById("winH1");

            /*var elementDiv = document.getElementsByClassName("confetti");
            for (var i = 0; i < elementDiv.length; i++) {
                elementDiv[i].style.display = "inline";
            }*/

            var h1 = document.getElementById("winH1");
            h1.style.display = "inline";

            localStorage.setItem("win", 1);
            initLockStorege(index);
            document.getElementById("start").disabled = false;
        }
        else {
            index++;
            cellIndex = 0;
            document.getElementById("label" + index).innerHTML = ("= " + this.result);
            disableElements(cellIndex);
        }
        var counterNumOfPlayed = localStorage.getItem("numberOfPlayed");

        if (!counterNumOfPlayed) {
            localStorage.setItem("numberOfPlayed", 0);
        }
        else {
            counterNumOfPlayed++;
            localStorage.setItem("numberOfPlayed", counterNumOfPlayed);
        }
    }
    else {
        console.log("Must enter all equation");
    }
}

function setLocalStorege(num) {
    var temp = localStorage.getItem(num);

    if (!temp) {
        localStorage.setItem(num, 1);
    }
    else {
        temp++;
        localStorage.setItem(num, temp);
    }
    console.log("11111");
}

function initLockStorege(index) {
    console.log(index);
    localStorage.setItem("index", index);

    switch (index) {
        case 1:
            setLocalStorege("1");
            break;
        case 2:
            setLocalStorege("2");
            break;
        case 3:
            setLocalStorege("3");
            break;
        case 4:
            setLocalStorege("4");
            break;
        case 5:
            setLocalStorege("5");
            break;
        case 6:
            setLocalStorege("6");
            break;
    }
}

function changeColorHelper(inputEquation, tempEquation, element, index, animation, color, char) {
    inputEquation[index].style.backgroundColor = color;
    /* inputEquation[index].style.animation = animation; */
    element.style.backgroundColor = color;
    /* element.style.animation = animation; */
    if (char != null) {
        tempEquation[index] = char;
    }
    console.log("helper");
}

function changeColor(tempEquation, inputEquation, index, color) {
    var element = document.getElementById(inputEquation[index].value);

    switch (color) {
        case "green":
            if (index % 2 == 0) {
                if (inputEquation[index].value == tempEquation[index]) {
                    changeColorHelper(inputEquation, tempEquation, element, index, "greenAnimathion 3s infinite", "green", "g");
                }
            }
            else {
                if (inputEquation[index].value == tempEquation[index]) {
                    changeColorHelper(inputEquation, tempEquation, element, index, "greenAnimathion 3s infinite", "green", "g");
                }
            }
            break;
        case "yellow":
            var inputEquationChangeToNumber = parseInt(inputEquation[index].value);

            if (index % 2 == 0) {

                if (tempEquation.includes(inputEquationChangeToNumber)) {

                    changeColorHelper(inputEquation, null, element, index, "yellowAnimathion 3s infinite", "yellow", null);

                    for (var i = 0; i < tempEquation.length; i++) {
                        if (inputEquation[index].value == tempEquation[i]) {
                            tempEquation[i] = "y";
                            console.log(tempEquation.toString());

                            return tempEquation;
                        }
                    }
                }
            }
            else {

                if (tempEquation.includes(inputEquation[index].value)) {
                    changeColorHelper(inputEquation, null, element, index, "yellowAnimathion 3s infinite", "yellow", null);

                    for (var i = 0; i < tempEquation.length; i++) {
                        if (inputEquation[index].value == tempEquation[i]) {
                            tempEquation[i] = "y";
                            return tempEquation;
                        }
                    }
                }
            }
            break;
    }

    return tempEquation;
}

function checkResult() {
    var boolResult = 0;
    var inputEquation = getCurrentRow(index);
    var tempEquation = equation.slice();

    ////////////////////////////////////////////////////////////////// change to green

    for (var i = 0; i < inputEquation.length; i++) {
        if (tempEquation[i] != "g") {
            tempEquation = changeColor(tempEquation, inputEquation, i, "green");
        }
    }
    ////////////////////////////////////////////////////////////////// change to yellow

    console.log(tempEquation.toString());
    for (var i = 0; i < inputEquation.length; i++) {
        if (tempEquation[i] != "g") {
            tempEquation = changeColor(tempEquation, inputEquation, i, "yellow");
        }
    }

    ////////////////////////////////////////////////////////////////// change to gray     

    for (var i = 0; i < inputEquation.length; i++) {
        if (inputEquation[i].style.backgroundColor != "yellow" && inputEquation[i].style.backgroundColor != "green") {
            var element = document.getElementById(inputEquation[i].value);

            if (i % 2 == 0) {
                var inputEquationChangeToNumber = parseInt(inputEquation[i].value);

                if (!(tempEquation.includes(inputEquationChangeToNumber))) {
                    inputEquation[i].style.backgroundColor = "gray";
                    /* inputEquation[i].style.animation = "grayAnimathion 3s infinite";*/
                    console.log(document.getElementById(inputEquation[i].value).style.backgroundColor);

                    if (document.getElementById(inputEquation[i].value).style.backgroundColor != "green" && document.getElementById(inputEquation[i].value).style.backgroundColor != "yellow") {
                        element.style.backgroundColor = "gray";
                        /*element.style.animation = "grayAnimathion 3s infinite"; */
                    }
                }
            }
            else {
                if (!(tempEquation.includes(inputEquation[i].value))) {
                    inputEquation[i].style.backgroundColor = "gray";
                    /*inputEquation[i].style.animation = "grayAnimathion 3s infinite";*/

                    if (document.getElementById(inputEquation[i].value).style.backgroundColor != "green" && document.getElementById(inputEquation[i].value).style.backgroundColor != "yellow") {
                        element.style.backgroundColor = "gray";
                        /* element.style.animation = "grayAnimathion 3s infinite"; */
                    }
                }
            }
        }
    }

    ////////////////////////////////////////////////////////////////// check if win

    for (var i = 0; i < tempEquation.length; i++) {

        if (tempEquation[i] == "g") {
            boolResult++;
        }
    }
    return boolResult === inputEquation.length;
}

