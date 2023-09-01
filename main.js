// TODO: DEL testcases

// check if stack is empty
function isEmpty(arr) {return (arr.length == 0);}

const numpad = document.querySelectorAll(".numpad.num");
const operator = document.querySelectorAll(".numpad.op");
const lcd = document.getElementById("output");
const prevResult = document.getElementById("prev-result");

const num = ["", ""];
let i, result, prevOp, on;

function init() {
    lcd.value = "";
    prevResult.value = "";
    num.fill("");
    i = 0;
    result = 0;
    prevOp = "";
    on = false;
}

init();

// Prevent default keyboard action
document.addEventListener("keydown", function(event) {
    event.preventDefault(); 
});

// Parsing numbers
numpad.forEach(button => {
  button.addEventListener('click', () => {
    const input = button.textContent;
    num[i] += input;
    lcd.value += input;
    console.log(`Number clicked: ${lcd.value}`);
  });
});

// Parsing operators
// process: empty -> val op val op -> result op val op -> result op val op -> result
operator.forEach(button => {
    button.addEventListener('click', () => {
        const op = button.textContent;
        console.log(`Operator clicked: ${op}`);
        
        switch(op) {
            case ".":
                // temporary console logger
                console.log(`Current Num: ${num[i]}\n`, 
                    `Next Num: ${num[(i+1) % 2]}\n`,
                    `On: ${on}\n`,
                    `prevOp: ${prevOp}\n`
                );
                break;
            case "AC":
                init();
                break;
            case "backspace":
                num[i] = num[i].slice(0,-1);
                lcd.value = lcd.value.slice(0, -1);
                break;
            case "=":
            default:
                lcd.value += " " + op + " ";
                let oldi = i;
                i = (i+1) % 2;
                
                if (!on) {
                    prevOp = op;
                    on = true;
                } else {
                    switch(prevOp) {
                        case "/":
                            result = parseFloat(num[i]) / parseFloat(num[oldi]);
                            break;
                        case "*":
                            result = parseFloat(num[oldi]) * parseFloat(num[i]);
                            break;
                        case "+":
                            result = parseFloat(num[oldi]) + parseFloat(num[i]);
                            break;
                        case "-":
                            result = parseFloat(num[i]) - parseFloat(num[oldi]);
                            break;
                    }
                    prevOp = op;
                    num[oldi] = result;
                    num[i] = "";

                    if (op === "=") {
                        prevResult.value = result;
                        num[i] = result;
                        num[oldi] = "";
                        lcd.value = "";
                    } else {
                        lcd.value = Number(result.toFixed(4)) + " " + prevOp + " ";
                    }
                }  
        }
    
    });
});


// add animation to shrink on click