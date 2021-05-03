import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DisplayLogs from './displayLogs'

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
    [loadingPage, setLoadingPage] = useState(true)


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
            
            <DisplayLogs supervisor={supervisor} officerID={officerID} />
            
          </motion.div>
}
          </>
    )
}

export default SupervisorHome

