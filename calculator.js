const input = document.getElementById('input');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let result = null;
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.id === 'clear-btn') { // Исправлен ID кнопки "C"
            currentInput = '';
            result = null;
            operator = '';
            input.textContent = '';
            return;
        }

        if (button.id === 'backspace-btn') { // Логика Backspace
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                input.textContent = currentInput;
            }
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

    const precision = 1000000; // Округление до 6 знаков
    switch (operator) {
        case '+':
            result = Math.round((result + currentNumber) * precision) / precision;
            break;
        case '-':
            result = Math.round((result - currentNumber) * precision) / precision;
            break;
        case '×':
            result = Math.round((result * currentNumber) * precision) / precision;
            break;
        case '÷':
            if (currentNumber === 0) {
                input.textContent = 'Can\'t divide by 0';
                result = null;
                currentInput = '';
                operator = '';
                return;
            }
            result = Math.round((result / currentNumber) * precision) / precision;
            break;
    }

    input.textContent = result;
    currentInput = '';
}
