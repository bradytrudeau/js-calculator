import { useState } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import './Calculator.css';

function Calculator() {
  const [value, setValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState('0');


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
        setTotal((prevValue / parseFloat(value)).toString());
      }
      else if (operator === "x") {
        setTotal((prevValue * parseFloat(value)).toString());
      }
      else if (operator === "+") {
        setTotal((prevValue + parseFloat(value)).toString());
      }
      else if (operator === "-") {
        setTotal((prevValue - parseFloat(value)).toString());
      }
      axios({
        method: 'POST',
        url: '/calculations',
        data: (prevValue, operator, value, "=", total).toString()
      }).then(response => {
        console.log('Response.data', response.data)
      }).catch(error => {
        console.log('Error in GET:', error);
      });
      setPrevValue("0");
      setValue("0");
      return;
    }
    setValue((parseFloat(num + content)).toString());
  }
  return (
    <div className="calculator">
      <div className="output">
        {value}
      </div>
      <div className="buttons">
        <Button onButtonPress={handleClick} content="AC"></Button>
        <Button onButtonPress={handleClick} content="DEL"></Button>
        <Button onButtonPress={handleClick} content="+/-"></Button>
        <Button onButtonPress={handleClick} content="÷"></Button>
        <Button onButtonPress={handleClick} content="7"></Button>
        <Button onButtonPress={handleClick} content="8"></Button>
        <Button onButtonPress={handleClick} content="9"></Button>
        <Button onButtonPress={handleClick} content="x"></Button>
        <Button onButtonPress={handleClick} content="4"></Button>
        <Button onButtonPress={handleClick} content="5"></Button>
        <Button onButtonPress={handleClick} content="6"></Button>
        <Button onButtonPress={handleClick} content="-"></Button>
        <Button onButtonPress={handleClick} content="1"></Button>
        <Button onButtonPress={handleClick} content="2"></Button>
        <Button onButtonPress={handleClick} content="3"></Button>
        <Button onButtonPress={handleClick} content="+"></Button>
        <Button onButtonPress={handleClick} content="0" type="double-key">0</Button>
        <Button onButtonPress={handleClick} content="."></Button>
        <Button onButtonPress={handleClick} content="="></Button>
      </div>
    </div>
  );
}

export default Calculator;