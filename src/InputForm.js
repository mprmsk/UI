import React, { useState ,useEffect} from 'react';


import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function InputForm(props) {
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [IsWeekend, setIsWeekend] = useState(false);
    const [Cost, setCost] = useState(0);
    const [energyType, setEnergyType] = useState('Gas');
    const costChangeHandler = (event) => {
        setCost(event.target.value);
    }

    const handleEnteredDateChange = (event) => {
        setEnteredDate(event);
        if (event.getDay() == 0) {
            setIsWeekend(true);
        } else {
            setIsWeekend(false);
        }
    }

    useEffect(()=>{       
        fetch("/Energy")
        .then(response => response.json())
        .then(json => props.onAddEnergyData(json));           
          
    },[]);

    const energyTypeChange=(event)=>{
        setEnergyType(event.target.value);
    }      
    
    const formSubmitHandler = (event) => {
        event.preventDefault();       
        const enteredData = {
            id:12,
            energy: energyType,
            enteredDate: enteredDate,
            cost: parseFloat(Cost)            
        }      

            const requestOptions = {              
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(enteredData)
            };
            fetch('/Energy', requestOptions)
                .then(async response => {
                    //const isJson = response.headers.get('content-type')?.includes('application/json; charset=UTF-8');
                   // const data = isJson && await response.json();
                    //console.log(response);
                    // check for error response
                    // if (!response.ok) {
                    //     // get error message from body or default to response status
                    //     const error = (data && data.message) || response.status;
                    //    // return Promise.reject(error);
                    // }
                    fetch("/Energy")
        .then(response => response.json())
        .then(json => props.onAddEnergyData(json));                  
                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });
        
    }   

    return (
        <div className="App">
            <form onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <table>
                        <tbody>
                        <tr>
                            <td>Entered Date:</td>
                            <td><DatePicker
                                selected={enteredDate}
                                onChange={handleEnteredDateChange}
                                name="startDate"
                                dateFormat="MM/dd/yyyy"></DatePicker></td>
                        </tr>
                        <tr>
                            <td>Energy Type:</td>
                            <td><select onChange={energyTypeChange} value={energyType}>
                                <option >Gas</option>
                                <option>Electricity</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td>Cost ($):</td>
                            <td><input type="number" value={Cost} onChange={costChangeHandler}></input></td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary">Save Energy</button>
                </div>
            </form>
        </div>
    )
}
export default InputForm;