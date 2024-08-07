let expressionString = '';

function appendExpression(value) {
    let answerElement = document.getElementById("answer");

    if (answerElement.textContent.trim() !== '') {
        expressionString = '';
        answerElement.innerHTML = '';
    }

    expressionString += value;
    showExpression();
}

function showExpression() {
    let build = '';
    let operations = {'+': ' + ', '/': ' ÷ ', '*': ' × ', '-': ' - '}

    for (let char of expressionString) {
        if (operations[char] !== undefined) {
            build += operations[char];
        } else {
            build += char;
        }
    }

    document.getElementById("expression").innerHTML = build;
}

function undo() {
    let answerElement = document.getElementById("answer");

    if (answerElement.textContent.trim() !== '') {
        answerElement.innerHTML = '';
    }

    expressionString = expressionString.substring(0, expressionString.length - 1);
    showExpression()
}

function clearExpression() {
    expressionString = '';
    showExpression()
}

function solve() {
    try {
        document.getElementById("answer").innerHTML = eval(expressionString);
    } catch (error) {
        document.getElementById("answer").innerHTML = 'ERROR';
    }
}