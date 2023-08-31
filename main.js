// Hello, World_    :)

// null and undefined are acceptable datatypes; return null; return undefined;

var a;
var b = 2;
console.log(a);
a = b;
console.log(a);

// myString is different than MYSTRING

// "/" quotient operator. "%" remainder operator

// Increment/decrement operators supported

// "\" escape character, or use single quotes (') or backticks (`)

// string concatenation allowed

var len = "FOUR";
console.log(len, len.length);

// strings are immutabe:
//      var string = "Jello"; string[0] = H     is not acceptable

var ourArray = ["Max", 23];
var multArray = [["Hi", 435], ["Bye", 352]];

// arrays are mutable

ourArray.push("Can push onto array like a stack!");
var stackPop = ourArray.pop();     // remove element at the end (stack); can omit assignment
var queueShift = ourArray.shift();   // remove element at the front (queue); can omit assignment
ourArray.unshift("Added to front of the array!"); 

function functionName(a, b) {
    sum = a+b;      // notice that it was defined without a var keywork, which makes it a GLOBAL variable; using var makes it a local var in the scope of functionName()
    console.log("Function is called: ", sum);
}

functionName(4, 10);
console.log("scope check ", sum);
// local variable takes precedence over global variable when multiple defintions are present

function nextInLine(queue, nextItem) {
    queue.push(nextItem);
    return queue.shift();
}

arr = [1, 2, 3];

// arguments are passed by reference
console.log("Before: ", JSON.stringify(arr));
nextInLine(arr, 4);
console.log("After: ", JSON.stringify(arr));

// comparison operator converts the values being compared to a common type: 3 == "3" is true
// STRICT comparison operator checks two values without conversion: 3 === "3" is false
console.log(3 !== "3");     // true since no data conversion was performed

var v = 2;

switch(v) {
    case 1:
    case 2:
    case 3:
        console.log("Same output for cases 1, 2, 3! Achieved by omitting <break> in each.")
        break;
    default:
        console.log("E R R O R")
}




/* OBJECTS */

// objects are like arrays in a sense but with properties instead of indices
var myObj = {
    "property1": 1,
    "property2": "hi",
    "property 3": "Arr",
};

console.log(JSON.parse(JSON.stringify(myObj)));

// objects are mutable
myObj.property1 = 3;

myObj["property 3"] = 0;
console.log(myObj["property 3"]);

myObj.newElement = "succesfully added a new PROPERTY"  // use of bracket notation is also allowed
console.log(myObj.newElement);

delete myObj["newElement"];

// NaN: Not a number

// Data Conversion
console.log(parseInt("888"));
console.log(parseInt("101001010", 2));  // binary to decimal

// Nested Ternary Operator
function isEqual(a, b) {
    return a > b ? "Greater" : a < b ? "Smaller" : "Equal"; 
}

// LET only defines withing a BLOCK scope, not a FUNCTION scope like VAR

// const VARIABLE_NAME is read-only declaration of a variable; but individual elements in const array IS mutable; do avoid this use Object.free(<object_name>)

// Use const and let over var




/* ARROW FUNCTIONS */
// both the functions below are the same
const concatArr = (arr1, arr2) => arr1.concatArr(arr2);

var concatArr2 = function(arr1, arr2) {
    return arr2.concatArr(arr1);
}




/* SPREAD OPERATOR "..." */
// spreads contents into an array, or contents from an array to another array
// for array operation, it allows for passing by value and ensures values aren't changed by reference

function printArr(...val) {
    for (let i = 0; i < val.length; i++) {
        console.log(val[i]);
    }
}

printArr(1, 2, 3);

let arr1 = [1, 2, 3];
let arr2 = [...arr1];
console.log(arr2);




/* DESTRUCTURING */
const OBJECT1 = { 
    first: 1, 
    second: { num: 2, str: "two" }
};

function destructure(myObj) {
    const {second : {str : value1}} = myObj;
    return value1;
}
console.log(destructure(OBJECT1));

destructure = myObj => {
    const {second: {num: value1}} = myObj;
    return value1;
}
console.log(destructure(OBJECT1));

// arrays
const [x, y, , ...z] = [1, 2, 3, 4, 5, 6];
console.log(x, y, z);

let aa = 9, bb = 0;
(() =>  {
    [aa, bb] = [bb, aa]
})();
console.log(aa, bb);

const stats = {
    a: 5,
    b: 3, 
};

const half = (  function() { 
    return function half({ a, b }) {  // destructuring the passed object with reference to the original property names
        return (a + b) / 2;
    }
}
)();

console.log(JSON.parse(JSON.stringify(stats)));
console.log(half(stats));




/* CLASS */
// old method
var className = function(objName) {
    this.objName = objName;
}

var oldObj = new className('Object');
console.log(oldObj.objName);

//new method
class newClass {
    constructor(name) {
        this.name = name;
    }
}

var newObj = new newClass("New Obj");
console.log(newObj.name);

function createClass() {
    class demoClass {
        constructor(name) {
            this.name = name;
        }
    }

    return demoClass;
}

const demo = createClass();
const demoObj = new demo("Demo");
console.log(demoObj.name);

/* PRACTICE */
const numArr = [4, 6, -7, 8, 9, 0];
const squaredList = arr => arr.filter(num => Number.isInteger(num) && num > 0).map(x => x*x);
console.log(squaredList(numArr));