import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext' 
import CurrentLogContext from '../../context/CurrentLogContext'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root:{
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(3)
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around', 
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
const Cleaning = () => {
const classes = useStyles(),
    { CurrentLog, setCurrentLog} = useContext(CurrentLogContext),
    { userData, setUserData } = useContext(UserContext),
    token = userData.token;

    const [state, setState] = useState({
      WashingAndCleaning : false,
      InternalCleaning: false,
      ExternalCleaning: false,
      LavatoryFloorCleaning: false,
      DisinfectionOfLavatory: false,
      PestControl: false
    })
    
    
    const body = {
      washingAndCleaning : state.WashingAndCleaning,
      internalCleaning : state.InternalCleaning,
      externalCleaning : state.ExternalCleaning,
      lavatoryFloorCleaning : state.LavatoryFloorCleaning,
      disinfectionOfLavatory : state.DisinfectionOfLavatory,
      pestControl : state.PestControl,
    }
const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      },
      
    hanldeSubmit = async (evt)=> {
      evt.preventDefault()
      sendData()
    },
    sendData = async ()=> {
         //considering log exists already
        //  console.log(body)
        await axios
        .post(`api/log/washingAndCleaning/${CurrentLog}`, body, { headers: { "x-auth-token": token}})
        .then(response=> {
          console.log(response)
        })
        .catch(error=> {
          console.log(error)
        })
        
    }
      
    return (
        <Paper elevation={3} className={classes.root}>
            <span>Cleaning and Wasing Works</span>
            <form className={classes.form} onSubmit={(evt)=>hanldeSubmit(evt)}>
              <div>
              Washing And Cleaning
                <Checkbox
                  checked={state.WashingAndCleaning}
                  onChange={handleChange}
                  name= 'WashingAndCleaning'
                  color="primary"

                />
              </div>
              <div>
              Internal Cleaning
                <Checkbox
                  checked={state.InternalCleaning}
                  onChange={handleChange}
                  name= 'InternalCleaning'
                  color="primary"
                  
                />
              </div>
              <div>
              External Cleaning
                <Checkbox
                  checked={state.ExternalCleaning}
                  onChange={handleChange}
                  name= 'ExternalCleaning'
                  color="primary"
                />
              </div>
              <div>
              Lavatory Floor Cleaning
                <Checkbox
                  checked={state.LavatoryFloorCleaning}
                  onChange={handleChange}
                  name= 'LavatoryFloorCleaning'
                  color="primary"
                />
              </div>
              <div>
              Disinfection Of Lavatory
                <Checkbox
                  checked={state.DisinfectionOfLavatory}
                  onChange={handleChange}
                  name= 'DisinfectionOfLavatory'
                  color="primary"
                />
              </div>
              <div>
              Pest Control
                <Checkbox
                  checked={state.PestControl}
                  onChange={handleChange}
                  name= 'PestControl'
                  color="primary"
                />
              </div>
              <button type='submit'>Save</button>
            </form>
        </Paper>
    )
}

export default Cleaning
