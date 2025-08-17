
import "./App.css";
import pPropTypes from 'prop-types';
import PropTypes from "prop-types";
import { useState } from "react";



export function App({value}) {
  const [num, setNum] = useState(value);

  const handleSubmit = () => {
    setNum(num + 1);
  };

  const handleMenos = () =>{
    setNum(num-1);
  }

  const handleReset = () =>{
    setNum (value);
  }

  return (
    <>
    <h1>{num} </h1>
    <button onClick={handleSubmit}>Subir 1</button>
    <button onClick={handleMenos}>Bajar 1</button>
    <button onClick={handleReset}>Reset</button>
    </>
  );
}
