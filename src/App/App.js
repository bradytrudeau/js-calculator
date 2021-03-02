import Calculator from '../Calculator/Calculator';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [calculations, setCalculations] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/calculations'
    }).then(response =>{
      console.log('GET response:',response.data)
      setCalculations(response.data);
    }).catch(err =>{
      console.log(err);
    });
    }, [updated]);

  return (
    <div className="App">
      <Calculator updated={updated} setUpdated={setUpdated}/>
      <div className="History">
        {calculations.map((calculation, i) => 
          <div
            key={i}
            calculation={calculation}
          >
            {calculation.newCalculation}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
