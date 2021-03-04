import Calculator from '../Calculator/Calculator';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  // Initializing state
  const [calculations, setCalculations] = useState([]);
  const [updated, setUpdated] = useState(false);
  // GETs the existing calculations on the server
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/calculations'
    }).then(response =>{
      setCalculations(response.data);
    }).catch(err =>{
      console.log('Error in GET', err);
    });
    }, [updated]);

  return (
    <div className="App">
      <Calculator updated={updated} setUpdated={setUpdated}/>
      <h2>Calculations:</h2>
      <div className="history-display">
        {/* Only displays last 10 calculations performed */}
        {calculations.map((calculation, i) => 
          <h4
            className="history"
            key={i}
            calculation={calculation}
          >
            {calculation.all_calculations}
          </h4>
        )}
      </div>
    </div>
  );
}

export default App;
