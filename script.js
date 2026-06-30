// ---------------- TOKENIZER ----------------
function tokenize(expression) {
    let tokens = [];
    let num = "";

    for (let char of expression) {
        if (!isNaN(char) || char === ".") {
            num += char;
        } else {
            if (num !== "") {
                tokens.push(num);
                num = "";
            }

            if ("+-*/^()".includes(char)) {
                tokens.push(char);
            } else if (char === " ") {
                continue;
            } else {
                throw new Error("Invalid character: " + char);
            }
        }
    }

    if (num !== "") {
        tokens.push(num);
    }

    return tokens;
}

// ---------------- PRECEDENCE ----------------
const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3
};

const associativity = {
    "+": "L",
    "-": "L",
    "*": "L",
    "/": "L",
    "^": "R"
};

// ---------------- INFIX TO POSTFIX ----------------
function infixToPostfix(tokens) {
    let output = [];
    let stack = [];

    for (let token of tokens) {

        if (!isNaN(token)) {
            output.push(token);
        }

        else if (token in precedence) {

            while (
                stack.length &&
                stack[stack.length - 1] in precedence &&
                (
                    (associativity[token] === "L" &&
                        precedence[token] <= precedence[stack[stack.length - 1]]) ||

                    (associativity[token] === "R" &&
                        precedence[token] < precedence[stack[stack.length - 1]])
                )
            ) {
                output.push(stack.pop());
            }

            stack.push(token);
        }

        else if (token === "(") {
            stack.push(token);
        }

        else if (token === ")") {

            while (stack.length && stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }

            if (!stack.length) {
                throw new Error("Mismatched parentheses");
            }

            stack.pop();
        }
    }

    while (stack.length) {
        if (stack[stack.length - 1] === "(") {
            throw new Error("Mismatched parentheses");
        }

        output.push(stack.pop());
    }

    return output;
}

// ---------------- POSTFIX EVALUATION ----------------
function evaluatePostfix(postfix) {

    let stack = [];

    for (let token of postfix) {

        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        }

        else {

            if (stack.length < 2) {
                throw new Error("Invalid expression");
            }

            let b = stack.pop();
            let a = stack.pop();

            switch (token) {

                case "+":
                    stack.push(a + b);
                    break;

                case "-":
                    stack.push(a - b);
                    break;

                case "*":
                    stack.push(a * b);
                    break;

                case "/":
                    if (b === 0) {
                        throw new Error("Division by zero");
                    }
                    stack.push(a / b);
                    break;

                case "^":
                    stack.push(Math.pow(a, b));
                    break;
            }
        }
    }

    if (stack.length !== 1) {
        throw new Error("Invalid expression");
    }

    return stack[0];
}

// ---------------- CALCULATE ----------------
function calculate() {

    const expression = document.getElementById("expression").value;
    const result = document.getElementById("result");

    try {
        const tokens = tokenize(expression);
        const postfix = infixToPostfix(tokens);
        const answer = evaluatePostfix(postfix);

        result.innerText = Number.isInteger(answer)
            ? answer
            : answer.toFixed(6).replace(/\.?0+$/, "");

    } catch (err) {
        result.innerText = "Error: " + err.message;
    }
}

// ---------------- CLEAR ----------------
function clearInput() {
    document.getElementById("expression").value = "";
    document.getElementById("result").innerText = "0";
}

// ---------------- ENTER KEY ----------------
document.getElementById("expression").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        calculate();
    }
});
