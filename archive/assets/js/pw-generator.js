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
  
  function generatePassword() 
  {
    // The following variables can access their respective HTML elements
    // The checked attribute returns a boolean value, i.e.,
    // 0 for an unchecked box, and
    // 1 for a checked box

    let number = document.getElementById("numbers").checked;
    let symbol = document.getElementById("symbols").checked;
    let upper = document.getElementById("upperCase").checked;
    let lower = document.getElementById("lowerCase").checked;

    // At least one box should be checked, 
    // or else simply return the function by alerting the user.

    if ( number + symbol + upper + lower === 0) {
        alert("No box chosen. Please select at least one box!");
        return;
      }

    // Accessing the password box
    let pw_box = document.getElementById("pw-box");

    // Access the set length for the password
    let length = document.getElementById("length");

    let pw = ""; // the generated password variable

    // The loop runs until password length matches the required length
    while(pw.length < length.value)
    {
        
        let typeAdder = getType[Math.floor(Math.random() * getType.length)];

        // The name attribute fetches the name of the <input> element
        let isChecked = document.getElementById(typeAdder.name).checked;

        // The respect type should only be included in the password,
        // if its checkbox is already checked by the user
        if (isChecked) {
            pw += typeAdder();
        }
    }
    pw_box.innerHTML = pw;
  }


  function copyPassword()
  {
    // Create a temporary element to attach to the content for the document
    // We'll access the textarea element which is a multi-line text input.
    const tempElement = document.createElement("textarea");

    // Access the generated password by creating a variable
    const generatedPassword = document.getElementById("pw-box").innerText;

    // Return the function, if the password isn't generated.
    if (!generatedPassword) { 
        alert("No password generated!");
        return; 
    }

    // Put the value of the generatedPassword in tempElement
    tempElement.value = generatedPassword;

    // Attach the tempElement in the document
    document.body.appendChild(tempElement);

    // Return the entire text in <textarea> element 
    tempElement.select();

    // The following command copies the password to the clipboard
    document.execCommand("copy");

    // Remove the temporary element
    tempElement.remove();
    
    alert("Password copied to clipboard");
  }

