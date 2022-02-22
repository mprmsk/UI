import React,{useState} from 'react';
import List from './List'
import InputForm from './InputForm'
import './App.css';

const intial_list=[]

function App() {
  const[intialList,setList]=useState(intial_list);
  

  const addEnergyHandler=(energyData)=>{   
    setList(energyData);    
   }

  return (
    <div className="App">

      <InputForm onAddEnergyData={addEnergyHandler}></InputForm>
      <br></br>
     <List energySellerList={intialList}></List>
    </div>
  );
}

export default App;
 