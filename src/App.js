import "./App.css";
import Buttons from "./componenets/Buttons";
import { useState } from "react";
import { evaluate, round } from "mathjs";

const App = () => {
  const [evaluation, setEvaluation] = useState(0);
  const [expression, setExpression] = useState("");
  const [canEvaluate, setCanEvaluate] = useState(true);
  const buttons = ["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "del", "="];

  const handleButtonClick = (button) => {
    if (/[0-9]/.test(button)) {
      setExpression(expression + button);
      if (canEvaluate) {
        setEvaluation(round(evaluate(expression + button), 5));
      }
    } else if (/[+\-*/.]/.test(button)) {
      const lastChar = expression.charAt(expression.length - 1);
      if (!/[+\-*/.]/.test(lastChar) && expression.length !== 0) {
        setExpression(expression + button);
      }
    } else if (/=/.test(button)) {
      setExpression(" ");
    } else if (button === "del") {
      const string = expression;
      setExpression(string.slice(0, -1));
    } else if (/[()]/.test(button)) {
      setExpression(expression + button);

      let openBrack = 0;
      let closeBrack = 0;

      for (let char of expression + button) {
        if (char === "(") {
          openBrack += 1;
        } else if (char === ")") {
          closeBrack += 1;
        }
      }

      if (openBrack === closeBrack) {
        setCanEvaluate(true);
        setEvaluation(round(evaluate(expression + button), 5));
      } else {
        setCanEvaluate(false);
      }
    } else if (button === "C") {
      setExpression("");
      setEvaluation("");
    }
  };

  const getButtonType = (button) => {
    if (/[0-9.del]/.test(button)) {
      return "number";
    } else if (/[+\-*/()]/.test(button)) {
      return "operator";
    } else if (/=/.test(button)) {
      return "equals";
    } else if (/C/.test(button)) {
      return "C";
    }
  };

  return (
    <div className="App">
      <div className="whole-calculator">
        <div className="screen">
          <h2 className="expression">{expression}</h2>
          <h2 className="expression">{evaluation}</h2>
        </div>
        <div className="button-card">
          {buttons.map((button, index) => {
            return (
              <Buttons
                key={index}
                buttonType={getButtonType(button)}
                label={button}
                handleButtonClick={() => {
                  handleButtonClick(button);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
