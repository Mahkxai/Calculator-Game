
// Prevent default keyboard action
document.addEventListener("keydown", function(event) {
    event.preventDefault(); 
    console.log("Key pressed:", event.key);
});

// Get numpad elements on click
const numpad = document.querySelectorAll(".numpad.num");
const operator = document.querySelectorAll(".numpad.op");
const lcd = document.getElementById("output");
const prevResult = document.getElementById("prev-result");

// Parsing numbers
numpad.forEach(button => {
  button.addEventListener('click', () => {
    const num = button.textContent;
    console.log(`Number clicked: ${num}`);
    lcd.value += num;
  });
});

// Parsing operators
operator.forEach(button => {
  button.addEventListener('click', () => {
    const op = button.textContent;
    console.log(`Operator clicked: ${op}`);

    switch(op) {
        case "AC":
            lcd.value = "";
            break;

        case "DEL":
            // lcd.pop();
            lcd.value = lcd.value.slice(0, -1);
            break;

        case "=":
            if (lcd.value != "") {
                prevResult.value = lcd.value;
                lcd.value = "";
            }
            break;

        case "/":
        case "*":
        case "+":
        case "-":
        case "%":
        case "()":
        case ".":
            break;
            
        default:
            lcd.value += " " + op + " ";
    }
  });
});

// add animation to shrink on click