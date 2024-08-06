var expression = '';

function appendExpression(value) {
    expression += value;
    showExpression();
}

function showExpression() {
    document.getElementById("expression").innerHTML = expression;
}

function undo() {
    expression = expression.slice(0, -2);
    showExpression();
}

function clearExpression() {
    expression = '';
    showExpression();
}

function solve() {
    expression += '5 ';
    showExpression();
}