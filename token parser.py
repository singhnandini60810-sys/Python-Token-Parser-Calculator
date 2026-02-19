import math

# ---------------- TOKENIZER ----------------
def tokenize(expression):
    tokens = []
    num = ""

    for char in expression:
        if char.isdigit() or char == ".":
            num += char
        else:
            if num:
                tokens.append(num)
                num = ""

            if char in "+-*/^()":
                tokens.append(char)
            elif char.isspace():
                continue
            else:
                raise ValueError(f"Invalid character: {char}")

    if num:
        tokens.append(num)

    return tokens


# ---------------- OPERATOR PRECEDENCE ----------------
precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3
}

associativity = {
    "+": "L",
    "-": "L",
    "*": "L",
    "/": "L",
    "^": "R"   # exponent is right associative
}


# ---------------- INFIX TO POSTFIX (SHUNTING YARD) ----------------
def infix_to_postfix(tokens):
    output = []
    stack = []

    for token in tokens:
        if token.replace(".", "", 1).isdigit():
            output.append(token)

        elif token in precedence:
            while (stack and stack[-1] in precedence and
                   ((associativity[token] == "L" and precedence[token] <= precedence[stack[-1]]) or
                    (associativity[token] == "R" and precedence[token] < precedence[stack[-1]]))):
                output.append(stack.pop())

            stack.append(token)

        elif token == "(":
            stack.append(token)

        elif token == ")":
            while stack and stack[-1] != "(":
                output.append(stack.pop())

            if not stack:
                raise ValueError("Mismatched parentheses")

            stack.pop()  # remove "("

        else:
            raise ValueError(f"Unknown token: {token}")

    while stack:
        if stack[-1] in "()":
            raise ValueError("Mismatched parentheses")
        output.append(stack.pop())

    return output


# ---------------- POSTFIX EVALUATION ----------------
def evaluate_postfix(postfix):
    stack = []

    for token in postfix:
        if token.replace(".", "", 1).isdigit():
            stack.append(float(token))

        else:
            if len(stack) < 2:
                raise ValueError("Invalid expression")

            b = stack.pop()
            a = stack.pop()

            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            elif token == "/":
                if b == 0:
                    raise ZeroDivisionError("Division by zero")
                stack.append(a / b)
            elif token == "^":
                stack.append(a ** b)

    if len(stack) != 1:
        raise ValueError("Invalid expression")

    return stack[0]


# ---------------- MAIN CALCULATOR FUNCTION ----------------
def calculate(expression):
    tokens = tokenize(expression)
    postfix = infix_to_postfix(tokens)
    result = evaluate_postfix(postfix)
    return result


# ---------------- RUN PROGRAM ----------------
if __name__ == "__main__":
    while True:
        expr = input("\nEnter expression (or type 'exit'): ")

        if expr.lower() == "exit":
            print("Calculator closed.")
            break

        try:
            print("Result:", calculate(expr))
        except Exception as e:
            print("Error:", e)
