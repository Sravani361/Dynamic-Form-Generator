import React from 'react';
import './App.css';
import DynamicFormGenerator from "./components/DynamicFormGenerator";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold my-4">Dynamic Form Generator</h1>
      <DynamicFormGenerator/>
    </div>
  );
}

export default App;
