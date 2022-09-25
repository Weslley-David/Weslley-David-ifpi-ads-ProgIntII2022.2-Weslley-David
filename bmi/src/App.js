import { useState } from "react";
import './style.css'
function App() {
  const [name, setName] = useState("Ana")
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()
  const [bmi, setBmi] = useState()

  const calculateBmi = () => {
    let bmi = Number(weight) / (Number(height) * 2)
    setBmi(`${name}, your bmi is:\n ${bmi.toFixed(2)}`)
  }
  return (

    <div className="App">
      <div className="form">
        <header>BMI APP</header>
          <input placeholder="nome ..." onChange={(e) => { setName(e.target.value) }} />
          <input placeholder="altura..." onChange={(e) => { setHeight(e.target.value) }} />
          <input placeholder="peso..." onChange={(e) => { setWeight(e.target.value) }} />
          <button onClick={calculateBmi}>calculate</button>
          <label>{bmi}</label>
        <footer>by Weslley</footer>
      </div>
    </div>
  );
}

export default App;
