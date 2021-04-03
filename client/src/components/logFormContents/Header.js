import React, { useState, useContext } from 'react'
import axios from 'axios'
import UserContext from '../../context/UserContext' 
import ProfileContext from '../../context/ProfileContext' 
import CurrentLogContext from '../../context/CurrentLogContext'


import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from './logFormStyles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} 


const Header = (props) => {
  const { enableStaffAndTrain, scroll } = props;
  const { userData, setUserData } = useContext(UserContext)
  const { CurrentLog, setCurrentLog} = useContext(CurrentLogContext)
  const token = userData.token
    const classes = useStyles();
    const num = "12:00";
    const [from, setFrom] = useState(num)
    const [to, setTo] = useState(num)
    const date = new Date(),
          dayy = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          defDate = {
            dd : date.getDate(),
            mm : date.getMonth()+1,
            yyyy:date.getFullYear(),
            day: dayy[date.getDay()]
          },
          Place = ['GCMC', 'OWS', 'NWS']
    if(defDate.dd < 10) defDate.dd = `0${defDate.dd}`
    if(defDate.mm < 10) defDate.mm = `0${defDate.mm}`
    let currentDate = `${defDate.yyyy}-${defDate.mm}-${defDate.dd}`
    // const [ddmmyy, setDDMMYY] = useState(Place[0])
    const [place, setPlace] = useState(Place[0])
    const [day, setDay] = useState(defDate.day)
    // const [open, setOpen] = React.useState(false);
    const [snackbarState, setsnackbarState] = React.useState({
      snackBarOpen: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { snackBarOpen, vertical, horizontal } = snackbarState;

    const handleClick = (newState) => () => {
      setsnackbarState({ snackBarOpen: true, vertical: 'top', horizontal: 'center'});  
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setsnackbarState({ ...snackbarState, snackBarOpen: false });
    };

    const body = {
      date : currentDate,
      day: day,
      depot: place,
      dutyHrs: {
        from : from,
        to : to
      }
    }
    console.log(body.date)
    const handlePlaceChange = evt=> {
      setPlace((evt).target.value)
    }
    
    const hanldeSubmit = async (evt)=> {
      evt.preventDefault()
      enableStaffAndTrain();
      sendData()
      scroll()
    }

    const sendData = async ()=> {
      if(!CurrentLog){    //if there is no log present
        await axios
        .post('api/log', body, { headers: { "x-auth-token": token}})
        .then (response=> {
          console.log(response.data.logs)
          let array = response.data.logs
          if(array.length === 1 ){ 
            console.log(array[0]._id)
            let newLog = array[0]._id
            setCurrentLog(newLog)   
          }
          else {
            console.log(array[array.length-1])
          let newLog = array[array.length-1] 
          setCurrentLog(newLog)
        }
        })
        .catch(error=> {
          console.log(error)
        })
      }else{     //if log exists already
        await axios
        .post(`api/log/${CurrentLog}`, body, { headers: { "x-auth-token": token}})
        .then(response=> {
          console.log('resp')
          console.log(response)
          console.log('resp')
        })
        .catch(error=> {
          console.log(error)
        })
      }
    }
    return (
        <Paper elevation={3} className={classes.root}>
            <span className={classes.formTitle}>Create New Log</span>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={(evt)=>hanldeSubmit(evt)}> 
              <div className={classes.formArea}>
                <div>
                  <span>Date</span> 
                  <TextField
                    type= 'date'
                    value={body.date}
                    // defaultValue="2017-05-24"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    className={classes.headerInputs}
                    // id="date"
                    name="date"
                    autoComplete="date"
                    onClick={()=> console.log(typeof(body.date))}
                    // onChange={evt=> setToday(evt.target.value)}
                    disabled
                  />
                </div>

                <div style={{position: 'relative'}}>
                  <span>Day</span> 
                  <TextField
                    defaultValue={defDate.day}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    className={classes.headerInputs}
                    id="date"
                    name="date"
                    autoComplete="date"
                    // onChange={evt=> setToday(evt.target.value)}/
                    disabled
                  />
                </div>
                
                <div> 
                  <span>Place</span> 
                  <div className={classes.headerInputs}>
                    <Select
                      id="demo-customized-select"
                      onChange={handlePlaceChange}
                      value={place}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={Place[0]}>GCMC</MenuItem>
                      <MenuItem value={Place[1]}>Old Washing Siding</MenuItem>
                      <MenuItem value={Place[2]}>New Washing Siding</MenuItem>
                    </Select>
                  </div>  
                </div>
                <div className={classes.timeDiv}>
                  <span>Duty Hours</span>
                    <span className={classes.dutyHours}>
                      <TextField
                      type= 'time'
                      variant="outlined"
                      margin="normal"
                      required
                      value = {from}
                      fullWidth
                      className={classes.headerInputs}
                      id="from"
                      name="from"
                      autoComplete="from"
                      onChange={evt=> setFrom(evt.target.value)}
                      autoFocus
                      /> 
                      <span>-</span>
                      <TextField
                      type= 'time'
                      variant="outlined"
                      margin="normal"
                      required
                      value = {to}
                      fullWidth
                      className={classes.headerInputs}
                      id="to"
                      name="to"
                      autoComplete="to"
                      onChange={evt=> setTo(evt.target.value)}
                      autoFocus
                    />
                    </span>
                </div>
              </div>
              <Button variant="outlined" onClick={handleClick({ vertical: 'top', horizontal: 'center' })} type='submit' className={classes.submit}>
                Create
              </Button>
            </form>
              <Snackbar 
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarOpen} 
                autoHideDuration={5000} 
                onClose={handleClose}
                style={{width: '350px', marginTop: '55px'}}
                key={vertical + horizontal}
                >
                <Alert onClose={handleClose} severity="success">
                  New Log Created! Please Continue with staff positions and adding trains.
                </Alert>
              </Snackbar>
        </Paper>
    )
}

export default Header