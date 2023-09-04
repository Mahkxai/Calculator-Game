// TODO: DEL testcases

// Prevent keyboard input
document.addEventListener("keydown", function(event) {
    event.preventDefault(); 
});

//Initialization
const numpad = document.querySelectorAll(".numpad.num");
const operator = document.querySelectorAll(".numpad.op");
const output = document.getElementById("prev-result");
const calc = document.getElementById("output");
const num = ["", ""];
let i, result, prevOp, on;

function init() {
    calc.value = "";
    output.value = "";
    num.fill("");
    i = 0;
    result = 0;
    prevOp = "";
    on = false;
}
init();

// Parsing numbers
numpad.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.textContent;
        console.log(num[i], input);
        num[i] += input;
        calc.value += input;
    });
});

// Parsing operators
// process: empty -> val op val op -> result op val op -> result op val op -> result
/*
    LOGIC
    If empty screen:
        operators are disabled
*/

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
                calc.value = calc.value.slice(0, -1);
                break;
            case "=":
            default:
                if (calc.value === "") break;

                calc.value += " " + op + " ";
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
                            result = parseFloat(num[i]) * parseFloat(num[oldi]);
                            break;
                        case "+":
                            result = parseFloat(num[i]) + parseFloat(num[oldi]);
                            break;
                        case "-":
                            result = parseFloat(num[i]) - parseFloat(num[oldi]);
                            break;
                    }

                    prevOp = op;
                    num[oldi] = result;
                    num[i] = "";

                    if (op === "=") {
                        output.value = result;
                        num[i] = result;
                        num[oldi] = "";
                        calc.value = "";
                    } else {
                        calc.value = Number(result.toFixed(4)) + " " + prevOp + " ";
                    }
                }  
        }
    
    });
});