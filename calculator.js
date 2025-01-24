const input = document.getElementById('input');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let result = null;
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.id === 'clear') {
            currentInput = '';
            result = null;
            operator = '';
            input.textContent = '';
            return;
        }

        if (button.id === 'result') {
            if (operator && currentInput) {
                calculate();
                operator = '';
            }
            return;
        }

        if (['+', '-', '×', '÷'].includes(value)) {
            if (currentInput && result === null) {
                result = parseFloat(currentInput);
                operator = value;
                currentInput = '';
            } else if (result !== null && currentInput) {
                calculate();
                operator = value;
            } else {
                operator = value;
            }
            return;
        }

        currentInput += value;
        input.textContent = currentInput;
    });
});

function calculate() {
    const currentNumber = parseFloat(currentInput);

    if (isNaN(currentNumber) || isNaN(result)) {
        return;
    }

    switch (operator) {
        case '+':
            result += currentNumber;
            break;
        case '-':
            result -= currentNumber;
            break;
        case '×':
            result *= currentNumber;
            break;
        case '÷':
            if (currentNumber === 0) {
                input.textContent = 'Error';
                result = null;
                currentInput = '';
                operator = '';
                return;
            }
            result /= currentNumber;
            break;
    }

    input.textContent = result;
    currentInput = '';
}
