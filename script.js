const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator-display');
const keys = calculator.querySelector('.calculator-keys');

let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetDisplay = false;

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        if (!action) {
            if (shouldResetDisplay) {
                display.value = keyContent;
                shouldResetDisplay = false;
            } else {
                display.value = display.value === '0' ? keyContent : display.value + keyContent;
            }
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            firstValue = display.value;
            operator = action;
            shouldResetDisplay = true;
        }

        if (action === 'decimal') {
            if (!display.value.includes('.')) {
                display.value += '.';
            }
        }

        if (action === 'clear') {
            display.value = '0';
            firstValue = '';
            operator = '';
            secondValue = '';
            shouldResetDisplay = false;
        }

        if (action === 'calculate') {
            secondValue = display.value;
            display.value = calculate(firstValue, operator, secondValue);
            shouldResetDisplay = true;
        }
    }
});

function calculate(n1, operator, n2) {
    let result = 0;
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }
    return result;
}