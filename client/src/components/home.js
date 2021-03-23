import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext' 
import ProfileContext from '../context/ProfileContext' 
import CurrentLogContext from '../context/CurrentLogContext'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import SearchIcon from '@material-ui/icons/Search';

import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const cardColors = ['#000', '#55c202', '#c20202', '#c26502', '#a2c202', '#0cc202', '#02afc2', '#c20242', '#c2b802']
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(16),
      height: 'auto'
    },
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]:{
        margin: theme.spacing(1)
    } 
  },
  profilePaper:{
    // backgroundColor: 'inherit',
    maxWidth: '1125px',
    // fontSize: '25px',
    // height: '250px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    '& > *': {
    },
  },
  paperObject:{
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'5px',
    // backgroundColor: '#f3f169',
    // margin: '4px 0px',
    [theme.breakpoints.between('sm','md')]: {
      maxWidth: '50%'
    },
    padding: '8px 0px',
    [theme.breakpoints.down('sm')]: {
        width: '45%'
    },
    maxWidth: '500px'
  },
  paperProperty:{
    // fontWeight: 'bold'
  },
  paperValue: {
    fontSize: '2rem',
    // margin: '4px 0',
    '& > *': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        margin: '4px',
        // backgroundColor: 'blue'
    }
  },
  logPaper: {
    width: '80%',
    height: '60px',
    backgroundColor:'blue',
    display: 'flex',
    justifyContent: 'space-between',
  },
  createLog:{
    // backgroundColor: 'red',

    width: '100%',
    maxWidth: '500px',
    marginTop:'16px',
    padding: '4px',
    '& > *': {
      textDecoration: 'none',
      color: 'black',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      '& > *': {
        margin: '4px'
      }
    },
    '&:hover': {
      backgroundColor: '#f4976c'
    },
  },
  allLogs: {
    width: '100%',
    display: 'flex',
    left: 'auto',
    right: 'auto',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]:{
      justifyContent: 'space-between',
    },
  },
  card: {
    maxWidth: '500px',
    margin: '4px',
    // backgroundColor:'#cc5577',
    [theme.breakpoints.up('sm')]: {
      minWidth: 275,
    },
    [theme.breakpoints.down('xs')]: {
      width: '49%',
      margin:'4px 0px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '2px 2px 6px 0px rgba(50, 50, 50, 0.83)',
  },
  addIcon:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection:'column',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    height: '80%',
    width: '100%',
  },
  cardRoot:{
    padding: '0px 0px',
    // backgroundColor: 'black'
  },
  iconCardRoot:{
    height: '100%',
    padding: '0px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    padding: '0px 4px',
    [theme.breakpoints.down('xs')]:{
      flexDirection: 'column'
    },
  },
  dateDay:{
    fontSize: 14,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
    padding: '4px 4px',
    // backgroundColor: '#eac100',
    '& > *':{
      color: '',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize: 13,
    },
  },
  cardActions:{
    display: 'flex', 
    justifyContent: 'center'
  },
  buttons:{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  openLogButton:{
    // background: '#cc5577',
    color: '#cc5577',
    border: '1px solid #cc5577',
    borderRadius: '5px'
  },
  createNewLogButton:{
    border: '1px soild grey',
    // backgroundColor: 'grey',
    borderRadius: '5px'
  },
  pos: {
    marginBottom: 12,
    padding: '0px 4px'
  },
  noLogMsg:{
    width: '50%',
    fontSize: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '32px',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '45%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const Home = (props) => {
    const { userData } = useContext(UserContext)
    const token = userData.token
    const { profileData, setProfileData } = useContext(ProfileContext)
    const { CurrentLog, setCurrentLog} = useContext(CurrentLogContext)
    const classes = useStyles();
    const { root, profilePaper } = classes
    const [showAllLogs, setShowAllLogs] = useState(true)
    // const [Logs, setLogs] = useState([])
    // const bull = <span className={classes.bullet}>•</span>;
    // // 
    
    const loadProfile = async ()=> {
      //check userProfile in local storage
      let data;
      // if(localStorage.getItem('userProfile')){  //if true, load profile from local storage
      //   console.log('getting profile from local storage...')
      //   data = await JSON.parse(localStorage.getItem('userProfile'))
      //   setProfileData({
      //     name : data.name,
      //     designation: data.designation,
      //     batch: data.batch,
      //     logs: [...data.logs] 
      //   })
      //   console.log('Abra Kadabra')
        
      // }else{    //else fetch from from server
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
      // }

      console.log(data.logs)
      await setCurrentLog(undefined)
      // await setLogs([...profileData.logs])  
      // console.log(Logs)
    }
    
    useEffect(async ()=>{
      await loadProfile();
      console.log('home page loaded + Profile')
    },[])


    const displayTrainOnCard = (log)=> {
      const array = [];
      log.trains.map(train => {
        array.push(
          <Typography variant="body2" component="p" className={classes.title}>
            <span style={{textAlign: 'left'}}>{"Train No: " + train.trainNo}</span>
            <span>{train.trainName}</span> 
          </Typography>
        )
      })
      return array
    }
    
    const searchLog = (evt)=> {
      console.log('search button clicked')
      let newDate = evt.target.value
      newDate = newDate.split("-").reverse().join('-')
      console.log(newDate)

      setShowAllLogs(true)
      for(let i=0; i<profileData.logs.length; i++){
        if(profileData.logs[i].header[0].date === newDate){
          console.log(profileData.logs[i])
        }
      }
    }

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const displayLog = ()=> {
      let divArray = []
      let num = 0
      profileData.logs.map(log=>{
        // num === cardColors.length-1 ? num=0 : num++  //to generate font-color 
        divArray.push(<Card className={classes.card}>
          <CardContent className={classes.cardRoot} style={{color: cardColors[num]}}>
            <Typography className={classes.dateDay} style={{color: cardColors[num]}} gutterBottom>
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
                // displayTrainOnCard(log)
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

    return (
          !userData.user ?     //check if not logged in
            <h1>You need to be logged in to Access this page!</h1>
          :
          <div className={root}>
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
              {/* <span className={classes.paperObject}>
                <span className={classes.paperProperty}>Staff</span> 
                <span className={classes.paperValue}>{profileData.staff}</span>
              </span> */}
              {/* <span className={singleLog}></span> */}
            </Paper>
            <div className={classes.buttons}>
                <Link to='/LogForm' style={{textDecoration:'none'}}>
                    <Button size="small" variant="outlined" className={classes.createNewLogButton}>
                      Create New Log
                      <PostAddIcon fontSize="large"/>
                    </Button>
                </Link>
                {/* <Button size="small" variant="outlined" className={classes.createNewLogButton} onClick={()=>searchLog()}>
                      Search By Date
                      <SearchIcon fontSize="large"/>
                </Button> */}
                
            <form className={classes.container} noValidate>
              <TextField
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
                profileData.logs.length > 0 ?
                  showAllLogs ? displayLog() : <></>
                :
                  <div className={classes.noLogMsg}>
                    <GridOffIcon />  
                    <span>No Logs Added! </span>
                  </div>
              }
            </div>
          </div>
    )
}

export default Home
