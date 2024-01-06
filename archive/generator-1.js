const result = document.querySelector("#result");
const passLength = document.querySelector("#length");
const passLengthResult = document.querySelector("#length-result");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");
// const includeUpper = document.querySelector("#upper");
// const includeLower = document.querySelector("#lower");
const generateBtn = document.querySelector("#generate");
const copyPass = document.querySelector("#copy");

// Create an object that has strings
// for upperCase and lowerCase letters,
// symbols and numbers
const types = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~\`|}{[]:;?><,./-="
}

//  One of these types will be randomly selected to match the set password length
//  We have functions to select each one of these types
//  All these functions will be stored in an array, getType
const getType = [

  // Function to randomly select an uppercase letters
  function upperCase() {
    return types.upperCase[Math.floor(Math.random() * types.upperCase.length)];
  },

  // Function to randomly select an lowercase letters
  function lowerCase() {
    return types.lowerCase[Math.floor(Math.random() * types.lowerCase.length)];
  },

  // Function to randomly select a number
  function numbers() {
    return types.numbers[Math.floor(Math.random() * types.numbers.length)];
  },

  // Function to randomly select a symbol
  function symbols() {
    return types.symbols[Math.floor(Math.random() * types.symbols.length)];
  }
];


// Set default password length 20 max on load 
document.addEventListener("DOMContentLoaded", () => {
  passLength.value = 20;
  passLengthResult.innerText = 20;
  let onLoadLength = passLength.value;
  let onLoadNumbers = includeNumbers.checked;
  let onLoadSymbols = includeSymbols.checked;
  result.value = generatePassword(onLoadNumbers, onLoadSymbols, onLoadLength);
});
// Listen for password range change 
passLength.addEventListener("change", (event) => {
  passLengthResult.innerText = event.target.value;
});
// Listen for copy button 
copyPass.addEventListener("click", () => {
  copy(result.value);
});
generateBtn.addEventListener("click", () => {
  const length = passLength.value;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  // const upper = includeUpper.checked;
  // const lower = includeLower.checked;
  result.value = generatePassword(numbers, symbols, length);
});
function generatePassword(number, symbol, length) {
  let generatedPassword = "";
  let variationsCount = [number, symbol].length;
  for (let i = 0; i < length; i += variationsCount) {
    if (number) {
      generatedPassword += getRandomNumber();
    }
    if (symbol) {
      generatedPassword += getRandomSymbol();
    }
    generatedPassword += getRandomLower();
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
// Copy generated password in more secure way 
function copy(text) {
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  let copiedResult = document.execCommand("copy");
  document.body.removeChild(input);
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent = "Copied!";
  document.body.appendChild(alert);
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
    document.body.removeChild(alert);
  }, 1000);
  return result;
}