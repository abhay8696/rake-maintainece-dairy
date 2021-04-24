import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import useStyles from '../styles/home'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import LoopIcon from '@material-ui/icons/Loop';
import AppsIcon from '@material-ui/icons/Apps';

import { motion } from "framer-motion"

const SupervisorHome = (props) => {
    const { supData, officerID } = props.location,
    classes = useStyles(),
    { root, profilePaper } = classes,
    [supervisor, setSupervisor] = useState({logs:[]}),
    [logBucket, setLogBucket] = useState([]),
    [loadingPage, setLoadingPage] = useState(true),
    [noLogsAlert, setNoLogsAlert] = useState(false),
    [noLogMsg, setNoLogMsg] = useState(''),
    [showSearchedLog, setShowSearchedLog] = useState(false)


    useEffect(async ()=>{
        await loadSupervisorProfile();

        console.log(supervisor.logs)
      },[])

    const loadSupervisorProfile = async ()=> {
        let res = await axios.get(`/api/officerProfile/user/${supData._id}`)
        setSupervisor({
          name : res.data.name,
          designation: res.data.designation,
          batch: res.data.batch,
          logs: [...res.data.logs],
          employeeId: res.data.employeeId
        })
        setLogBucket([...res.data.logs])
        setLoadingPage(false)
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
    },

    displayLog = ()=> {
      let divArray = []
      console.log(logBucket)
      logBucket.map(log=> {
        let date = log.header[0].date
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
            <Link to={{ 
                      pathname: `/officer_${officerID}/supervisorHome_${supervisor.employeeId}/log_${date}}`,
                      prop: {logData: log, txr: supervisor.name}
                    }} 
                  style={{textDecoration:'none'}}>
              <Button size="small" variant="outlined" className={classes.openLogButton}>
                Open Log
              </Button>
            </Link>
          </CardActions>
        </Card>)
      })
      divArray.reverse()
      return divArray
    },
    
    searchLog = async (evt)=> {
      let foundLogs = 0
      console.log(logBucket)
      let searchDate = evt.target.value
      searchDate = searchDate.split("-").reverse().join('-')
      console.log(searchDate)
      let arr = []

      for(let i=0; i<logBucket.length; i++){
        if(logBucket[i].header[0].date === searchDate){
          arr.push(logBucket[i])
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
        setLogBucket(supervisor.logs)
      }else{
        setNoLogsAlert(false)
        setNoLogMsg('')
        setLogBucket(arr)
        setShowSearchedLog(true)
      }
    }

    return (
        <>
        {loadingPage ? <div className={classes.loadingIcon}><LoopIcon/><span>Fetching Data from Database...</span></div> :
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
                <span className={classes.paperValue}>{supervisor.name}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Employee ID</span> 
                <span className={classes.paperValue}>{supervisor.employeeId}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Designation</span> 
                <span className={classes.paperValue}>{supervisor.designation}</span>
              </div>
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>Batch</span> 
                <span className={classes.paperValue}>{supervisor.batch}</span>
              </div>
            </Paper>
            
            <div className={classes.buttons}>
            <form className={classes.container} noValidate>  {/*search button*/}
              <TextField
                error= {noLogsAlert}
                helperText={noLogMsg}
                id="date"
                label="Search By Date"
                type="date"
                defaultValue="yyyy-mm-dd"
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
                logBucket.length > 0 ?     //display all logs
                  displayLog()
                :
                  <div className={classes.noLogMsg}>
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
                    setLogBucket(supervisor.logs)
                  }}
                >
                  Show All Logs
                  <AppsIcon />
              </Button>
                : <></>
              }
            </div>
            
          </motion.div>
}
          </>
    )
}

export default SupervisorHome

