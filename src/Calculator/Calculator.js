import Buttons from '../Buttons/Buttons';
import Output from '../Output/Output';
import './Calculator.css';

function Calculator() {
  return (
    <div className="calculator">
      <Output/>
      <Buttons/>
    </div>
  );
}

export default Calculator;