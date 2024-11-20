function toggleChoice(elements, selectedElement) {
    elements.forEach(element => {
        if (element === selectedElement) {
            element.classList.add("choice");
        } else {
            element.classList.remove("choice");
        }
    });
}
let rubOne = document.querySelector(".rub-one");
let usdOne = document.querySelector(".usd-one");
let eurOne = document.querySelector(".eur-one");
let gbpOne = document.querySelector(".gbp-one");
let rubTwo = document.querySelector(".rub-two");
let usdTwo = document.querySelector(".usd-two");
let eurTwo = document.querySelector(".eur-two");
let gbpTwo = document.querySelector(".gbp-two");
let p2 = document.querySelector(".input-footer-text-two");
let p1 = document.querySelector(".input-footer-text-one");
const apiKey = '30f3ad65d9-7206660b30-sn5ci5';
const baseUrl = 'https://api.fastforex.io/fetch-all';
let fromCurrency = 'RUB';
let toCurrency = 'USD';
let error = document.querySelector(".internet");
let firstInp = document.querySelector(".input-one input");
let secondInp = document.querySelector(".input-two input");
let rate = 1;
let rate1 = 1;
let a;
function updateExchangeRate() {
    fetch(`${baseUrl}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            rate = data.results[toCurrency] / data.results[fromCurrency];
            rate1 = data.results[fromCurrency] / data.results[toCurrency]
            p1.textContent = "1 " + fromCurrency + " = " + (rate !== 1 ? rate.toFixed(5) : "1") + " " + toCurrency;
            p2.textContent = "1 " + toCurrency + " = " + (rate1 !== 1 ? rate1.toFixed(5) : "1") + " " + fromCurrency;
            if (a == 2) {
                firstInp.value = (secondInp.value * rate1).toFixed(5);
            }
            else if (a == 1) {
                secondInp.value = (firstInp.value * rate).toFixed(5);
            }
        })
}
function wifi() {
    while (!navigator.onLine) {
        error.classList.remove('disnone');
        if(a == 1){
            secondInp.value = "";
        }
        else if(a == 2){
            firstInp.value = "";
        }
        break;
    }
    while (navigator.onLine) {
        if (error.classList != "disnone") {
            error.classList.add('disnone')
        }

        break;
    }
    
}

function ensureSingleDecimal(input) {
    let value = input.value;
    let parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1] && parts[1].length > 5) {
        parts[1] = parts[1].substring(0, 5);
        value = parts.join('.');
    }
    input.value = value;
}

firstInp.addEventListener('input', () => {
    if (firstInp.value.length > 19) {
        let item = firstInp.value.split('');
        for (let i = 19; i < firstInp.value.length; i++) {
            item[i] = "";
        }
        firstInp.value = item.join('');
    }
    firstInp.value = firstInp.value.replace(/[^0-9.,]/g, '');
    firstInp.value = firstInp.value.replace(",", ".");
    ensureSingleDecimal(firstInp);
    a = 1;
});
secondInp.addEventListener('input', () => {
    if (secondInp.value.length > 19) {
        let item = secondInp.value.split('');
        for (let i = 19; i < secondInp.value.length; i++) {
            item[i] = "";
        }
        secondInp.value = item.join('');
    }
    secondInp.value = secondInp.value.replace(/[^0-9.,]/g, '');
    secondInp.value = secondInp.value.replace(",", ".");
    ensureSingleDecimal(secondInp);
    a = 2;
});
firstInp.addEventListener("input", () => {
    if (firstInp.value === ".") {
        firstInp.value = "0.";
    }
    else {
        secondInp.value = (firstInp.value * rate).toFixed(5);
    }
    wifi();
});

secondInp.addEventListener("input", () => {
    if (secondInp.value === ".") {
        secondInp.value = "0.";
    }
    else {
        firstInp.value = (secondInp.value * rate1).toFixed(5);
    }
    wifi();
});

usdOne.addEventListener("click", () => {
    toggleChoice([rubOne, usdOne, eurOne, gbpOne], usdOne);
    fromCurrency = usdOne.textContent;
    updateExchangeRate();
    wifi();
});

rubOne.addEventListener("click", () => {
    toggleChoice([rubOne, usdOne, eurOne, gbpOne], rubOne);
    fromCurrency = rubOne.textContent;
    updateExchangeRate();
    wifi();
});

eurOne.addEventListener("click", () => {
    toggleChoice([rubOne, usdOne, eurOne, gbpOne], eurOne);
    fromCurrency = eurOne.textContent;
    updateExchangeRate();
    wifi();
});

gbpOne.addEventListener("click", () => {
    toggleChoice([rubOne, usdOne, eurOne, gbpOne], gbpOne);
    fromCurrency = gbpOne.textContent;
    updateExchangeRate();
    wifi();
});

usdTwo.addEventListener("click", () => {
    toggleChoice([rubTwo, usdTwo, eurTwo, gbpTwo], usdTwo);
    toCurrency = usdTwo.textContent;
    updateExchangeRate();
    wifi();
});

rubTwo.addEventListener("click", () => {
    toggleChoice([rubTwo, usdTwo, eurTwo, gbpTwo], rubTwo);
    toCurrency = rubTwo.textContent;
    updateExchangeRate();
    wifi();
});

eurTwo.addEventListener("click", () => {
    toggleChoice([rubTwo, usdTwo, eurTwo, gbpTwo], eurTwo);
    toCurrency = eurTwo.textContent;
    updateExchangeRate();
    wifi();
});

gbpTwo.addEventListener("click", () => {
    toggleChoice([rubTwo, usdTwo, eurTwo, gbpTwo], gbpTwo);
    toCurrency = gbpTwo.textContent;
    updateExchangeRate();
    wifi();
});
updateExchangeRate();