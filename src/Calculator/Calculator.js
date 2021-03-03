import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import './Calculator.css';

function Calculator({updated, setUpdated}) {
  // Initializing state
  const [value, setValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);

  // Submits a new calculation to the server
  const addCalculation = (calc) => {
    axios({
      method: 'POST',
      url: '/calculations',
      data: {
        newCalculation: calc
      }          
    }).then(response => {
      setPrevValue("0");
      setValue("0");
      setUpdated(!updated);
    }).catch(err => {
      console.log('Error in POST:', err);
    });
  }

  // Handles the click of each button and runs conditionals
  // to check what the operator is and perform the correct calculations
  const handleClick = (content) => () => {
    const num = parseFloat(value);
    if (content === "AC") {
      setValue("0");
      setPrevValue(null);
      return;
    }
    if (content === "DEL") {
      let numString = num.toString();
      setValue(numString.slice(0, -1));
      return;
    }
    if (content === "+/-") {
      setValue((num * -1).toString());
      return;
    }
    if (content === ".") {
      if (value.includes(".")) {
        return;
      }
      setValue(value + ".");
      return;
    }
    if (content === "÷") {
      setPrevValue(parseFloat(value));
      setValue("0");
      setOperator("÷");
      return;
    }
    if (content === "x") {
      setPrevValue(parseFloat(value));
      setValue("0");
      setOperator("x");
      return;
    }
    if (content === "-") {
      setPrevValue(parseFloat(value));
      setValue("0");
      setOperator("-");
      return;
    }
    if (content === "+") {
      setPrevValue(parseFloat(value));
      setValue("0");
      setOperator("+");
      return;
    }
    if (content === "=") {
      if (!operator) {
        return;
      }
      if (operator === "÷") {
        let total = ((prevValue / parseFloat(value)).toString());
        addCalculation((prevValue + " " + operator + " " + value + " " + "=" + " " + total).toString());   
      }
      else if (operator === "x") {
        let total = ((prevValue * parseFloat(value)).toString());
        addCalculation((prevValue + " " + operator + " " + value + " " + "=" + " " + total).toString());   
      }
      else if (operator === "+") {
        let total = ((prevValue + parseFloat(value)).toString());
        addCalculation((prevValue + " " + operator + " " + value + " " + "=" + " " + total).toString());   
      }
      else if (operator === "-") {
        let total = ((prevValue - parseFloat(value)).toString());
        addCalculation((prevValue + " " + operator + " " + value + " " + "=" + " " + total).toString());   
      }
      return;
    }
    if (value[value.length - 1] === ".") {
      setValue(value + content);
    }
    else {    
      setValue((parseFloat(num + content)).toString());
    }
  };

  return (
    <div className="calculator">
      <div className="output">
        <p className="output-text">{value}</p>
      </div>
      <div className="buttons">
        <Button onButtonPress={handleClick} content="AC" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="DEL" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="+/-" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="÷" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="7" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="8" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="9" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="x" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="4" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="5" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="6" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="-" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="1" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="2" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="3" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="+" type="single-key"></Button>
        <Button onButtonPress={handleClick} content="0" type="double-key">0</Button>
        <Button onButtonPress={handleClick} content="." type="single-key"></Button>
        <Button onButtonPress={handleClick} content="=" type="single-key"></Button>
      </div>
    </div>
  );
}

export default Calculator;