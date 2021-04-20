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
import ForwardIcon from '@material-ui/icons/Forward';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import AppsIcon from '@material-ui/icons/Apps';

import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { motion } from "framer-motion"

import useStyles from './styles/home'
import { makeStyles } from '@material-ui/core/styles';

const useStyles2 = makeStyles((theme) => ({
  card: {
    maxWidth: '1125px',
    margin: '4px',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      margin:'4px 0px',
    },
    boxShadow: '2px 2px 6px 0px rgba(50, 50, 50, 0.83)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px !important',
  },
  cardRoot:{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > *':{
      minWidth: '40%',
      textAlign: 'left'
    },
    flexGrow: '1',
    padding: '0px',
    // backgroundColor: 'red'
  },
  supName:{
    // width: '30%',
    fontWeight: 'bold'
  },
  supID:{
    // width: '20%'
  },
  supDesignation:{
    // maxWidth: '30%'
  },
  button:{
    width: '66px',
    // backgroundColor: 'grey',
    height: '100%',
    display: 'flex', alignItems: 'center',
    marginLeft: '4px'
  },
}));

const OfficerHome = ()=> {
    const { userData } = useContext(UserContext)
    const token = userData.token;
    const history = useHistory();
    const { profileData, setProfileData } = useContext(ProfileContext)
    const { CurrentLog, setCurrentLog} = useContext(CurrentLogContext)
    
    const classes = useStyles();
    const classes2 = useStyles2();
    const { root, profilePaper } = classes

    const [noLogsAlert, setNoLogsAlert] = useState(false)
    const [noLogMsg, setNoLogMsg] = useState('')
    const [supervisorList, setSupervisorList] = useState([])

    const loadProfile = async ()=> {
        console.log("fetching Data from server...")

        let response = await axios.get('api/officerProfile/me', { headers: { "x-auth-token": token}})
        console.log("supervisor home called...")
        localStorage.setItem('userProfile', JSON.stringify(response.data));
        let data = await JSON.parse(localStorage.getItem('userProfile'))
        await setProfileData({
          name : data.officerProfile.name,
          designation: data.officerProfile.designation,
          supervisors: [...data.allUser] ,
          employeeId: data.officerProfile.employeeId
        })
        setSupervisorList([...response.data.allUser])
        console.log(response.data.allUser[7])
    }
    
    useEffect(async ()=>{
        await loadProfile();
        console.log('home page loaded + Profile')
      },[])

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
    const displaySupervisors = ()=> {
        let divArray = []
        supervisorList.map(supervisor=>{
          let desg
          supervisor.designation === "Senior Section Engineer" ? desg= "SSE" : desg="JE"
          divArray.push(<Card className={classes2.card}>
            <CardContent className={classes2.cardRoot}>
                <span className={classes2.supName}>
                  {supervisor.name}
                </span>
                <span  className={classes2.supID}>
                  ID: {supervisor.employeeId}
                </span>
                <span className={classes2.supDesignation}>
                  {supervisor.designation}
                </span>
                <span  className={classes2.supBatch}>
                  Batch: {supervisor.batch}
                </span>
            </CardContent>
                <Link 
                  to={
                    { 
                    pathname: `/officer_${profileData.employeeId}/supervisorHome_${supervisor.employeeId}`, 
                    supData:supervisor,
                    officerID: profileData.employeeId
                  }
                  }
                  style={{textDecoration:'none'}}  
                  className={classes2.button} 
                >
                  <Button size="small" variant="outlined" className={classes.openLogButton}>
                    <ForwardIcon/>
                  </Button>
                </Link>
          </Card>)
        })
        return divArray.reverse();
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
              <span className={classes.paperProperty}>Divisional Officer</span>  
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
              <span className={classes.paperProperty}>Division</span> 
              <span className={classes.paperValue}>Pune</span>
            </div>
          </Paper>
          
          <div className={classes.buttons}>
            <form className={classes.container} noValidate>  {/*search button*/}
              <TextField
                error= {noLogsAlert}
                helperText={noLogMsg}
                id="date"
                label="Search By Name"
                type="text"
                defaultValue="Supervisor Name"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }} 
                variant="outlined"
                // onChange={(evt)=> searchLog(evt)}
              />
            </form>
            </div>
            
            <div className={classes.allLogs}> 
              {     //display all logs
                  supervisorList  ?
                  displaySupervisors()
                  :
                  <h1>Loading Supervisor List</h1>
              }
            </div>
        </motion.div>
  )
}

export default OfficerHome