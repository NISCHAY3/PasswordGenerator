const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_:|<>.,|?/;"'

let password = "";
let passwordLength = 10;
let checkCount = 1;

// set strength circle color to grey

handleSlider();

// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lenghtDisplay.innerText = passwordLength;

};

function setIndicator(color) {

    indicator.style.backgroundColor = color;
    // shadow
}

function getRandomInteger(min, max) {
    Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

function genrateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}


function genrateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt[randNum];
}

function codeStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolscheck.checked) hasSymbol = true;


    if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");

    }
    else if ((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }


}

async function copyContent() {

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMsg.innerText = "copied";
    }

    catch (e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active")
    }, 2000);

}

function handleCheckboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }

    })

    if (passwordLength < checkCount) {

        passwordLength = checkCount;
        handleSlider();

    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent;
    }
});




generateBtn.addEventListener('click', () => {

    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // remove old password;

    password = "";

    // if (uppercaseCheck.checked) {
    //     password += genrateUpperCase();

    // }
    // if (lowercaseCheck.checked) {
    //     password += genrateLowerCase();

    // }
    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();

    // }
    // if (symbolscheck.checked) {
    //     password += generateSymbol();

    // }

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(genrateUpperCase());
    }

    if (lowercaseCheck.checked) {
        funcArr.push(genrateLowerCase());

    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber());

    }
    if (symbolscheck.checked) {
        funcArr.push(generateSymbol());
    }

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }





})
