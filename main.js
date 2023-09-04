// TODO: DEL testcases

// Prevent keyboard input
// document.addEventListener("keydown", function(event) {
//     event.preventDefault(); 
// });

// const textarea = document.getElementById("screen");

// // Function to update the textarea's height based on its content
// function adjustTextareaHeight() {
//     textarea.style.height = 'auto'; // Reset the height to auto
//     textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
// }
  
// // Attach an event listener to the textarea to trigger the adjustment on input
// textarea.addEventListener('input', adjustTextareaHeight);

// // Initial adjustment when the page loads (if there's pre-filled content)
// adjustTextareaHeight();

//Initialization
const numpad = document.querySelectorAll(".numpad.num");
const operator = document.querySelectorAll(".numpad.op");
const output = document.getElementById("output");
const scrn = document.getElementById("screen");
const num = ["",""];   // cycle between inputs
const opStack = [];
const numStack = [];
let i, result, prevOp, opCount;

function init(equals = false) {
    if (!equals) output.textContent = "...";
    scrn.textContent = "0";
    scrn.style.color = "#999"
    num.fill("");   // cycle between inputs
    opStack.length = 0;
    numStack.length = 0;
    i = 0;
    result = 0;
    prevOp = "";
}
init();

// Parsing numbers
numpad.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.textContent;

        if (num.every(element => element === "")) {
            scrn.style.color = "black";
            scrn.textContent = "";
        }

        num[i] += input;
        scrn.textContent += input;
        opCount = 0;
    });
});

// Parsing operators
operator.forEach(button => {
    button.addEventListener('click', () => {
        const currOp = button.textContent;
        opCount++;
        switch(currOp) {
            case ".":
                // temporary console logger
                console.log(
                        opStack, numStack
                );
                break;
            case "AC":
                init();
                break;
            case "backspace":
                num[i] = num[i].slice(0,-1);
                scrn.textContent = scrn.textContent.slice(0, -1);
                break;
            default:
                if (scrn.textContent === "0") break;
             
                opStack.push(currOp);
                
                if (opCount > 1) {
                    let currOp = opStack.pop();
                    prevOp = currOp;
                    opStack[opStack.length - 1] = currOp;
                    scrn.textContent = scrn.textContent.slice(0, -2) + currOp + " ";
                    break;
                }

                numStack.push(num[i])

                if (opStack.length === 1) {
                    if (currOp === "=") {
                        output.textContent = num[i];
                        init(true);
                    } else scrn.textContent += " " + currOp + " ";
                }

                // if (opStack.length > numStack.length) {
                //     let currOp = opStack.pop();
                //     opStack[opStack.length - 1] = currOp;
                //     scrn.textContent = scrn.textContent.slice(0, -2) + currOp;
                //     break;
                // } else numStack.push(num[i]);

              

                let oldi = i;
                i = (i+1) % 2;  // cycling variable for input number

                if (opStack.length === 1) {
                    prevOp = currOp;
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

                    // changing states for next calculation
                    prevOp = currOp;
                    num[oldi] = result;
                    num[i] = "";

                    if (currOp === "=") {
                        output.textContent = result;
                        init(true);
                    } else {
                        scrn.textContent = "(" + scrn.textContent + ")" + " " + currOp + " ";
                        console.log(result);
                        output.textContent = result;
                    }
                }  
        }
    
    });
});