function getHistory() {
     return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText=num;
}

function getOutcome() {
    return document.getElementById("outcome-value").innerText;
}

function printOutcome(num) {
    if(num=="") {
        document.getElementById("outcome-value").innerText=num; 
    } // removes 0 if not content //
    else {
        document.getElementById("outcome-value").innerText=getFormattedNumber(num);
    } // if content, returns num //
} 

function getFormattedNumber(num) {
    if(num=="-") {
        return ""; 
    } // allows - values to work //
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
} // adds commas //

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
} // removes commas //

var operator = document.getElementsByClassName("operator");
for(var i = 0; i<operator.length; i++) { // self note:research loops //
    operator[i].addEventListener('click',function() {
        if(this.id=="clear") {
            printHistory("");
            printOutcome("");
        } // clears history & outcome //
        else if(this.id=="backspace") {
            var outcome = reverseNumberFormat(getOutcome()).toString();
            if(outcome) {
                outcome = outcome.substr(0,outcome.length-1);
                printOutcome(outcome);
            } 
        } // turn outcome into string, if outcome has a value, minus the end term //
        else {
            var outcome = getOutcome();
            var history = getHistory();
            if (outcome==""&&history!="") {
                if (isNaN(history[history.length-1])) {
                    history = history.substr(0,history.length-1);
                } 
            }
            if (outcome!=""||history!="") { // if no content in outcome OR history //
                // condition?true:false //
                outcome = outcome==""?outcome:reverseNumberFormat(outcome);
                history = history+outcome;
                if (this.id=="=") {
                    var result = eval(history);
                    printOutcome(result);
                    printHistory("");
                } // evaluate - FIX, not working?? //
                else {
                    history = history + this.id;
                    printHistory(history);
                    printOutcome("");
                } // other operators //
            }
        }
    });
} // click operator buttons //

var number = document.getElementsByClassName("number");
for(var i = 0; i<number.length; i++) {
    number[i].addEventListener('click',function() {
        var outcome = reverseNumberFormat(getOutcome()); // ?? go back to understand //
        if(outcome!=NaN) { //if outcome is a num //
            outcome = outcome+this.id;
            printOutcome(outcome);
        }
    });
} // click number buttons //

