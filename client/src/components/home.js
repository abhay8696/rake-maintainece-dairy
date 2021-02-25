import React, { useEffect, useContext } from 'react'
import UserContext from '../context/UserContext' 
import ProfileContext from '../context/ProfileContext' 
import CurrentLogContext from '../context/CurrentLogContext'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';

import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const cardColors = ['#55c202', '#c20202', '#c26502', '#a2c202', '#0cc202', '#02afc2', '#c20242', '#c2b802']
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
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]:{
        margin: theme.spacing(1)
    } 
  },
  profilePaper:{
    // backgroundColor: '#303c6c',
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
    backgroundColor: 'white',
    margin: '4px 0px',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    },
    maxWidth: '500px'
  },
  paperProperty:{
    // fontWeight: 'bold'
  },
  paperValue: {
    fontSize: '2rem',
    margin: '4px 0',
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
    justifyContent: 'center'
  },
  card: {
    minWidth: 275,
    maxWidth: '500px',
    margin: '4px',
    [theme.breakpoints.up('lg')]: {
      // margin: '8px 22px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin:'4px 0px',
    },
    boxShadow: '2px 2px 6px 0px rgba(50, 50, 50, 0.83)',
  },
  cardRoot:{
    padding: '2px 8px',
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
  },
  cardActions:{
    display: 'flex', 
    justifyContent: 'center'
  },
  openLogButton:{
    border: '1px soild grey',
    backgroundColor: 'grey',
    borderRadius: '5px'
  },
  pos: {
    marginBottom: 12,
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
}));


const Home = (props) => {
    const { userData } = useContext(UserContext)
    const token = userData.token
    const { profileData, setProfileData } = useContext(ProfileContext)
    const { CurrentLog, setCurrentLog} = useContext(CurrentLogContext)
    const classes = useStyles();
    const { root, profilePaper } = classes
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

    const displayLog = ()=> {
      let divArray = []
      let num = 0
      profileData.logs.map(log=>{
        num === cardColors.length-1 ? num=0 : num++  //to generate font-color 
        divArray.push(<Card className={classes.card}>
          <CardContent className={classes.cardRoot} style={{color: cardColors[num]}}>
            <Typography className={classes.title} style={{color: cardColors[num]}} gutterBottom>
              <span className={classes.dateDay}>
                <Typography variant="h5" component="h2">
                  {log.header[0].date}
                </Typography>
                <span>{log.header[0].day}</span>
              </span>
              <span>{log.header[0].depot}</span>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            </Typography>
              {
                log.trains[0] ?  
                  displayTrainOnCard(log)
                : 
                  <Typography variant="body2" component="p" className={classes.title}>
                        <span>No Trains</span> 
                  </Typography>
              }
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Link to={{ pathname: "/Log", state: log }} style={{textDecoration:'none'}}>
              <Button size="small" className={classes.openLogButton} style={{backgroundColor:cardColors[num]}}>
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
            <div className={profilePaper}>
              <Paper elevation={1} className={classes.paperObject}>
                <span className={classes.paperProperty}>Train Examiner</span>  
                <span className={classes.paperValue}>{profileData.name}</span>
              </Paper>
              <Paper elevation={1} className={classes.paperObject}>
                <span className={classes.paperProperty}>Designation</span> 
                <span className={classes.paperValue}>{profileData.designation}</span>
              </Paper>
              <Paper elevation={1} className={classes.paperObject}>
                <span className={classes.paperProperty}>Employee ID</span> 
                <span className={classes.paperValue}>{profileData.employeeId}</span>
              </Paper>
              <Paper elevation={1} className={classes.paperObject}>
                <span className={classes.paperProperty}>Batch</span> 
                <span className={classes.paperValue}>{profileData.batch}</span>
              </Paper>
              {/* <span className={classes.paperObject}>
                <span className={classes.paperProperty}>Staff</span> 
                <span className={classes.paperValue}>{profileData.staff}</span>
              </span> */}
              {/* <span className={singleLog}></span> */}
            </div>
            
            <div className={classes.allLogs}> 
            <Card className={classes.card}>
              <CardContent className={classes.cardRoot}>
                <PostAddIcon />
              </CardContent>
              <CardActions className={classes.cardActions}>
              <Link to='/LogForm' style={{textDecoration:'none'}}>
                  <Button size="small" className={classes.openLogButton}>
                  Create New Log
                  </Button>
                </Link>
              </CardActions>
            </Card>
              {
                profileData.logs.length > 0 ?
                  displayLog()
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
