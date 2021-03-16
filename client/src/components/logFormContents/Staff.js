import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'  
import CurrentLogContext from '../../context/CurrentLogContext'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './logFormStyles'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  } 

const Staff = (props) => {
const classes = useStyles(),
    { CurrentLog, setCurrentLog} = useContext(CurrentLogContext),
    { userData, setUserData } = useContext(UserContext),
    token = userData.token,
    worksArray = ['Undergear' , 'Air Brake Testing', 'Pipe Fitting', 'Carpentry', 'DPO and SBO', 'Other Works'],
    totalSacntionedStrength = ['On Roll', 'Present', 'On Leave', 'Absent', 'Sick', 'Under Rest'],
    strength = ['onRoll', 'physicallyPresent', 'onLeave', 'absent', 'sick', 'underRest'],
    idNameAuto = ['Undergear' , 'Testing', 'PipeFitting', 'Carpentry', 'DPOandSBO', 'OtherWorks'],
    idNameAuto2= ['onRoll', 'physicallyPresent', 'onLeave', 'absent', 'sick', 'underRest'],

    
    [snackbarState, setsnackbarState] = React.useState({
      snackBarOpen: false,
      vertical: 'top',
      horizontal: 'center',
    }),
    { snackBarOpen, vertical, horizontal } = snackbarState,

    handleClick = (newState) => () => {
      setsnackbarState({ snackBarOpen: true, vertical: 'top', horizontal: 'center'});  
    },

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setsnackbarState({ ...snackbarState, snackBarOpen: false });
    },

    [Works, setWorks] = useState({
        Undergear : 'Billy, Mandy',
        Testing : 'Rachel, Monica, Pheobe',
        PipeFitting : 'Ross, Chandler, Joey',
        Carpentry : 'Rick, Morty',
        DPOandSBO : 'Walter, Jesse',
        OtherWorks : 'Robin',
    }),
    
    [Strength, setStrength] = useState({
        onRoll : 15,
        physicallyPresent : 11,
        underRest : 1,
        onLeave : 1,
        absent : 1,
        sick : 1,
    }),

    body = {
        underGear: Works.Undergear,
        brakePower: Works.Testing,
        pipeFitting: Works.PipeFitting,
        carpentry: Works.Carpentry,
        oiling: Works.DPOandSBO,
        otherWorks: Works.OtherWorks,
        totalSacntionedStrength: Strength
    },

    handleWorksChange = (evt)=> {
        const value = evt.target.value;
        setWorks({
          ...Works,
          [evt.target.name]: value
        });
      },

    handleStrngthChange = (evt)=> {
      const value = evt.target.value;
      setStrength({
        ...Strength,
        [evt.target.name]: value
      });
    },

    hanldeSubmit = async (evt)=> {
        evt.preventDefault()
        console.log('clickedddd')
        sendData()
    },
    sendData = async ()=> {
         //considering log exists already
        //  console.log(body)
        await axios
        .post(`api/staff/${CurrentLog}`, body, { headers: { "x-auth-token": token}})
        .then(response=> {
          console.log(response)
        })
        .catch(error=> {
          console.log(error)
        })
        
    },
    
    evalVariable = (stateName, val)=> {
        let object = stateName,
            dot = '.',
            method = `${val}`,
            wholeString = object + dot + method;
        return(eval(wholeString)) 
        // console.log(object)
    },

    workDivs = ()=> { 
        let worksDiv=[]
        
        for(let i=0; i<worksArray.length; i++){
            // evalVariable(idNameAuto[i]);
            worksDiv.push(<div>
                {worksArray[i]}
                <TextField
                variant="outlined"
                margin="normal"
                value={evalVariable('Works', idNameAuto[i])}
                fullWidth
                // label= {worksArray[i]}
                id={idNameAuto[i]}
                name={idNameAuto[i]}
                autoComplete={idNameAuto[i]}
                onChange={evt=>handleWorksChange(evt)}
                />
            </div>)
        }
        return worksDiv
    },
    strengthDivs = ()=> { 
        let stringthDiv=[]
        
        for(let i=0; i<worksArray.length; i++){
            stringthDiv.push(<div>
                <span className={classes.strengthProperty}>{totalSacntionedStrength[i]}</span>
                <TextField
                type='number'
                variant="outlined"
                margin="normal"
                value={evalVariable('Strength',strength[i])}
                fullWidth
                // label= {totalSacntionedStrength[i]}
                id={idNameAuto2[i]}
                name={idNameAuto2[i]}
                autoComplete={idNameAuto2[i]}
                onChange={evt=>handleStrngthChange(evt)}
                />
            </div>)
        }
        return stringthDiv
    }
    
    
    return (
        <Paper elevation={3} className={classes.staffRoot}>
            <span className={classes.formTitle}>Staff Position</span>
            <form className={classes.form} onSubmit={(evt)=>hanldeSubmit(evt)}>
                <div className={classes.staffFormArea}>
                    <div className={classes.names}>
                        {/* <span>Names</span> */}
                        {workDivs()}
                    </div>
                    <hr className={classes.hr}/>
                    <span className={classes.formTitle}>Total Sanctioned Strength</span>
                    <div className={classes.strength}>
                        {strengthDivs()}
                    </div>
                </div>
                <Button type='submit' variant="outlined"  onClick={handleClick()} className={classes.submit}>Save</Button>
            </form>
              <Snackbar 
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarOpen} 
                autoHideDuration={2000} 
                onClose={handleClose}
                style={{width: '350px', marginTop: '55px'}}
                key={vertical + horizontal}
                >
                <Alert onClose={handleClose} severity="success">
                  Staff Info Saved!
                </Alert>
              </Snackbar>
        </Paper>
    )
}

export default Staff
