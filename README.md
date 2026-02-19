# Expression Parser Calculator (Tokenizing Calculator)

A Python-based calculator that tokenizes and parses mathematical expressions and evaluates them using **operator precedence**, **stacks**, and the **Shunting Yard Algorithm**.

This project demonstrates core concepts used in compilers and interpreters such as:
- Tokenizing (Lexical Analysis)
- Parsing (Syntax Analysis)
- Infix to Postfix Conversion
- Expression Evaluation using Stack

---

## Features

- Supports operators: `+  -  *  /  ^`
- Supports parentheses: `( )`
- Handles spaces in input
- Correct operator precedence and associativity
- Detects invalid expressions (example: `2+/`)
- Uses stack-based postfix evaluation

---

##  Concepts Used

- **Tokenizing and String Processing**
- **Parsing Expressions**
- **Operator Precedence & Associativity**
- **Shunting Yard Algorithm**
- **Data Structures (Stack, List)**
- **Postfix Expression Evaluation**

---

##  Example Inputs

| Expression | Result |
|-----------|--------|
| `2+9/5`   | `3.8`  |
| `4*5/6`   | `3.3333333333` |
| `(2+3)*4` | `20`   |
| `2^3^2`   | `512`  |

---

##  How It Works

### Step 1: Tokenizing
Input:  
`"2+3*4"`

Tokens:  
`['2', '+', '3', '*', '4']`

### Step 2: Infix → Postfix (Shunting Yard)
Postfix:  
`['2', '3', '4', '*', '+']`

### Step 3: Evaluate Postfix Using Stack
Final Result: `14`

---

##  Run the Program

### Clone the Repository
```bash
git clone https://github.com/your-username/expression-parser-calculator.git
cd expression-parser-calculator
