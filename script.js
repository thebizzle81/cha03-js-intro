  // Assignment code here

  // There might be a more elegant way of including all possible numbers, symbols, and letters (upperCase and lowerCase) as possible characters when the password is generated, but writing them all out by hand seemed to give me the least amount of problems
  const keys = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()_+~\\`|}{[]:;?><,./-="
  };

// Here is where the Math. features that generate random characters are Returned for storage
// The getKey() method of the PushSubscription interface returns an ArrayBuffer representing a client public key, which can then be sent to a server and used in encrypting push message data.
// The return statement ends function execution and specifies a value to be returned to the function caller.
  const getKey = [
    function upperCase() {
      return keys.upperCase[Math.floor(Math.random() * keys.upperCase.length)];
    },
    function lowerCase() {
      return keys.lowerCase[Math.floor(Math.random() * keys.lowerCase.length)];
    },
    function number() {
      return keys.number[Math.floor(Math.random() * keys.number.length)];
    },
    function symbol() {
      return keys.symbol[Math.floor(Math.random() * keys.symbol.length)];
    }
  ];

// The Challenge suggested using document.querySelector and generateBtn.addEventListener but document.getElementById seemed to work the best
// getElementById
generateBtn.addEventListener("click", writePassword);

function createPassword() {
  const upper = document.getElementById("upperCase").checked;
  const lower = document.getElementById("lowerCase").checked;
  const number = document.getElementById("number").checked;
  const symbol = document.getElementById("symbol").checked;
  if (upper + lower + number + symbol === 0) {
    alert("Please check at least one box!");  
    return;
  }

  // Building the passwordBox to collect all the Returned getElementById's
  const passwordBox = document.getElementById("passwordBox");
  const length = document.getElementById("length");
  // check length value is not too big or too small 
  let password = "";
  while (length.value > password.length) {
    let keyToAdd = getKey[Math.floor(Math.random() * getKey.length)];
    let isChecked = document.getElementById(keyToAdd.name).checked;
    if (isChecked) {
      password += keyToAdd();
    }
  }

  passwordBox.innerHTML = password;

    // Took a lot of experimentation to make copyPassword do what it is supposed to do, so I pulled some of this code from other examples I found online and see if I could integrate them into my project. Some of this code is advanced from where we are in the course, but I eventually got it to work, so while I still need to study some of these methods etc. some more to fully understand them, I decided to use them for my own purposes for now.
  // createElement
  // The <textarea> HTML element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.
  // The appendChild() method of the Node interface adds a node to the end of the list of children of a specified parent node.
}
function copyPassword() {
  const textarea = document.createElement("textarea");
  const password = document.getElementById("passwordBox").innerText;
  if (!password) { return; }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
} 