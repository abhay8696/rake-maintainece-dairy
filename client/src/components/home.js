import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext' 
import ProfileContext from '../context/ProfileContext' 
import CurrentLogContext from '../context/CurrentLogContext'


import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import AppsIcon from '@material-ui/icons/Apps';

import axios from 'axios'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

import useStyles from './styles/home'


const Home = (props) => {
    const { userData } = useContext(UserContext)
    const token = userData.token
    const { profileData, setProfileData } = useContext(ProfileContext)
    const { CurrentLog, setCurrentLog} = useContext(CurrentLogContext)
    const classes = useStyles();
    const { root, profilePaper } = classes
    const [showSearchedLog, setShowSearchedLog] = useState(false)
    const [logBucket, setLogBucket] = useState(profileData.logs)
    const [noLogsAlert, setNoLogsAlert] = useState(false)
    const [noLogMsg, setNoLogMsg] = useState('')
    
    const loadProfile = async ()=> {
      //check userProfile in local storage
      let data;
        console.log('fetching profile from server...') 
        let response = await axios.get('api/profile/me', { headers: { "x-auth-token": token}})

        localStorage.setItem('userProfile', JSON.stringify(response.data));
        data = await JSON.parse(localStorage.getItem('userProfile'))
        setProfileData({
          name : data.name,
          designation: data.designation,
          batch: data.batch,
          logs: [...data.logs] ,
          employeeId: data.employeeId
        })
        setLogBucket([...data.logs])
      // }

      console.log(data.logs)
      await setCurrentLog(undefined)
    }
    
    useEffect(async ()=>{
      await loadProfile();
      console.log('home page loaded + Profile')
    },[])

    
    const searchLog = async (evt)=> {
      let foundLogs = 0
      console.log(profileData.logs)
      let searchDate = evt.target.value
      searchDate = searchDate.split("-").reverse().join('-')
      console.log(searchDate)
      let arr = []

      for(let i=0; i<profileData.logs.length; i++){
        if(profileData.logs[i].header[0].date === searchDate){
          arr.push(profileData.logs[i])
          foundLogs++
        }
      }
      if(foundLogs === 0){
        console.log('log not found')
        setNoLogsAlert(true)
        setNoLogMsg('No Logs found on this date!')
        setTimeout(() => {
          setNoLogsAlert(false)
        }, 5000);
        setLogBucket(profileData.logs)
      }else{
        setNoLogsAlert(false)
        setNoLogMsg('')
        setLogBucket(arr)
        setShowSearchedLog(true)
      }
    }

    const displayLog = ()=> {
      let divArray = []
      logBucket.map(log=>{
        divArray.push(<Card className={classes.card}>
          <CardContent className={classes.cardRoot}>
            <Typography className={classes.dateDay} gutterBottom>
              <Typography variant="" component="h2">
                {log.header[0].date}
              </Typography>
              <span>{log.header[0].day}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                <span>{log.header[0].depot}</span>
            </Typography>
              {
                log.trains[0] ?  
                  <Typography variant="body2" component="p" className={classes.title}>
                    <span style={{textAlign: 'left'}}>{"Train No: " + log.trains[0].trainNo}</span>
                    <span>{log.trains[0].trainName}</span> 
                  </Typography>
                : 
                  <Typography variant="body2" component="p" className={classes.title}>
                        <span>No Trains</span> 
                  </Typography>
              }
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Link to={{ pathname: "/Log", state: log }} style={{textDecoration:'none'}}>
              <Button size="small" variant="outlined" className={classes.openLogButton}>
                Open Log
              </Button>
            </Link>
          </CardActions>
        </Card>)
      })
      return divArray.reverse();
    }
    
    const 
    paperTransition = {     //to make page transition using framer-motion library
      in: {
        opacity: 1,
        y:0,
      },
      out:{
        opacity: 0,
        y: "100vh"
      }
    },
    pageTransition = {
      duration: 0.3,
      transition: 'linear'
    }
    return (
          !userData.user ?     //check if not logged in
            <h1>You need to be logged in to Access this page!</h1>
          :
          <motion.div className={root} 
          initial="out" 
          animate="in" 
          exit="out" 
          variants={paperTransition}
          transition={pageTransition}
          >
            <Paper elevation={1} className={profilePaper}>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Train Examiner</span>  
                <span className={classes.paperValue}>{profileData.name}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Employee ID</span> 
                <span className={classes.paperValue}>{profileData.employeeId}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Designation</span> 
                <span className={classes.paperValue}>{profileData.designation}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Batch</span> 
                <span className={classes.paperValue}>{profileData.batch}</span>
              </div>

            </Paper>
            <div className={classes.buttons}>
                <Link to='/LogForm' style={{textDecoration:'none'}}>
                    <Button size="small" variant="outlined" className={classes.createNewLogButton}>
                      Create New Log
                      <PostAddIcon fontSize="large"/>
                    </Button>
                </Link>
                
            <form className={classes.container} noValidate>  {/*search button*/}
              <TextField
                error= {noLogsAlert}
                helperText={noLogMsg}
                id="date"
                label="Search By Date"
                type="date"
                defaultValue="2021-03-23"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evt)=> searchLog(evt)}
              />
            </form>
            </div>

            <div className={classes.allLogs}> 
              {
                profileData.logs.length > 0 ?     //display all logs
                  displayLog()
                :
                  <div className={classes.noLogMsg, setNoLogMsg}>
                    <GridOffIcon />  
                    <span>No Logs Added! </span>
                  </div>
              }
              {
                showSearchedLog ?                  //if searched log is present
                <Button 
                  size="small" 
                  variant="outlined" 
                  className={classes.showAllLogsButton}
                  onClick={()=> {
                    setNoLogsAlert(false)
                    setShowSearchedLog(false)
                    setLogBucket(profileData.logs)
                  }}
                >
                  Show All Logs
                  <AppsIcon />
              </Button>
                : <></>
              }
            </div>
          </motion.div>
    )
}

export default Home
