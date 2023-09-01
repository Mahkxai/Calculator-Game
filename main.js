
// Prevent default keyboard action
document.addEventListener("keydown", function(event) {
    event.preventDefault(); 
    console.log("Key pressed:", event.key);
});

// Get numpad elements on click
const numpad = document.querySelectorAll('.numpad.num');
const operator = document.querySelectorAll('.numpad.op');

// Add a click event listener to each button and update LCD with clicked item
const lcd = document.getElementById("output");

// Parsing numbers
numpad.forEach(button => {
  button.addEventListener('click', () => {
    const num = button.textContent;
    console.log(`Number clicked: ${num}`);
    lcd.value += num;
  });
});

// add animation to shrink on click