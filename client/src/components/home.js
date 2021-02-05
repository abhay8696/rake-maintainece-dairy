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
    '&:hover': {
      backgroundColor: '#f4976c'
    },
    [theme.breakpoints.up('lg')]: {
      // margin: '8px 22px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin:'4px 0px',
    },
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
    justifyContent: 'space-between'
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
          logs: [...data.logs] 
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
            <span>{train.trainName}</span> 
            <span style={{textAlign: 'left'}}>{"Train: " + train.trainNo}</span>
          </Typography>
        )
      })
      return array
    }

    const displayLog = ()=> {
      let divArray = []
      profileData.logs.map(log=>{
        divArray.push(<Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              <span>{log.header[0].depot}</span>
              <span>{log.header[0].day}</span>
            </Typography>
            <Typography variant="h5" component="h2">
              {log.header[0].date}
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
          <CardActions>
            <Button size="small">
              <Link to={{ pathname: "/Log", state: log }}>Open Log</Link>
            </Button>
          </CardActions>
        </Card>)
      })
      return divArray.reverse();
    }

    return (
          userData.user ?     //check if logged in
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
                <span className={classes.paperProperty}>Batch</span> 
                <span className={classes.paperValue}>{profileData.batch}</span>
              </Paper>
              {/* <span className={classes.paperObject}>
                <span className={classes.paperProperty}>Staff</span> 
                <span className={classes.paperValue}>{profileData.staff}</span>
              </span> */}
              {/* <span className={singleLog}></span> */}
            </div>
            <Paper elevation={3} className={classes.createLog}>
              <Link to='/LogForm'>
                  <span>Create New Log</span> 
                  <PostAddIcon />
              </Link>
            </Paper>
            <div className={classes.allLogs}> 
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
          :
          <h1>You need to be logged in to Access this page!</h1>
    )
}

export default Home
