// DOM elements
const passwordEl = document.getElementById("result");
const generateEl = document.getElementById("generate");
const lengthEl = document.getElementById("length")
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolsEl = document.getElementById("symbols"); 
const clipboardEl = document.getElementById("clipboard");

// random character generator functions
const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomNumber = () => Math.floor(Math.random() * 9);

const getRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}:<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// password generator
const generatePassword = () => {
  const length = lengthEl.value;
  const upper = upperEl.checked;
  const lower = lowerEl.checked;
  const number = numberEl.checked;
  const symbol = symbolsEl.checked;

  let password = "";

  const typesCount = upper + lower + number + symbol;
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  console.log(typesArr);

  if (typesCount == 0) return;

  for(let i=0; i<length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    })
  }

  passwordEl.innerHTML = password.slice(0, length);
}

// event listeners
generateEl.addEventListener('click', generatePassword);

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = passwordEl.innerText;

  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
})