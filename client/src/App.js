import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Navbar from './components/Navbar'
import Home from './components/home' 
import OfficerHome from './components/officerHome' 
import LogForm from './components/LogForm' 
import Trains from './components/logFormContents/Trains' 
import Coach from './components/logFormContents/Coach'
import Log from './components/Log' 
import Header from './components/logFormContents/Header' 
import SupervisorHome from './components/officerLogs/supervisorHome'

import axios from 'axios'
import UserContext from './context/UserContext'
import ProfileContext from './context/ProfileContext'
import CurrentLogContext from './context/CurrentLogContext'  //to track current log
import CurrentTrainContext from './context/CurrentTrainContext'  //to track current Train
import './App.css';
import { AnimatePresence } from "framer-motion"
// import 'bootstrap/dist/css/bootstrap.min.css'

const useStyles = makeStyles((theme) => ({
    mainArea: {
      overflow: 'auto',
      width: '100%'
    }
}))

function App() {
  const location = useLocation
  const classes = useStyles();
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })
  const [userType, setUserType] = useState("supervisor")

  const [profileData, setProfileData] = useState({
    name: '',
    designation: '',
    batch: '',
    logs: [],
    employeeId: undefined,
  })
  const [CurrentLog, setCurrentLog] = useState(undefined)
  const [CurrentTrain, setCurrentTrain] = useState(undefined)
  
  //to check if user is logged in
  const IsAuthenticated = async ()=> {
    console.log('running is-authenticated')
    let token = localStorage.getItem('x-auth-token');
    if(token === null){
      localStorage.setItem('x-auth-token', "");
      token = ""
    }
    let tokenRes = await axios.get(
      "/api/auth",            //supervisor auth route
      { headers: { "x-auth-token": token}}
    )
    if(!tokenRes.data){       //if tokenRes.data is empty (i.e. not supervisor) check for officer
      console.log("not supervisor, checking for officer...")
      tokenRes = await axios.get(
      "/api/officerAuth",            //officer auth route
      { headers: { "x-auth-token": token}}
    )
    setUserType("officer")
    }
    setUserData({
      token,
      user: tokenRes.data
    })
    console.log(tokenRes.data)
  }

  useEffect(()=> {
    IsAuthenticated();
  }, [])

  const userTypePath = (path)=> {
    if(path === "supervisor"){
       console.log("ssssssssssssssssssssss")
       setUserType("supervisor")
     } else{ 
       console.log("oooooooooooooooooooooo")
       setUserType("officer")
      }
     console.log('usertype called')
  }
  
  return (
    <div className = "root">
    <Router>
      <UserContext.Provider value={{userData, setUserData}}>
          <ProfileContext.Provider value={{profileData, setProfileData}}>
            <CurrentLogContext.Provider value={{CurrentLog, setCurrentLog}}>
              <CurrentTrainContext.Provider value={{CurrentTrain, setCurrentTrain}}>
                <Fragment>
                    <Navbar />
                    <div className="body">
                      <div className={classes.mainArea}>
                        <AnimatePresence exitBeforeEnter>
                          <Switch location={location} key={location.pathname}>
                          <Route exact path='/register' component={ Register } />
                            {
                              userData.user ?
                              <Fragment>
                              {
                                userType === "supervisor" ?
                                <Route exact path='/' component={ Home }/>
                                :
                                <Route exact path='/' component={OfficerHome}/>  
                              }
                              <Route exact path='/home' component={ Home } /> 
                              <Route exact path='/officer:officerName/supervisorHome:supID' component={ SupervisorHome } /> 
                              <Route exact path='/officerHome' component={ OfficerHome } /> 
                              <Route exact path='/login' component={ Home }/>
                                <Route exact path='/LogForm' component={ LogForm } /> 
                                <Route exact path='/LogForm/train' component={ Trains } /> 
                                <Route exact path='/LogForm/train/coaches' component={ Coach } /> 
                                <Route exact path='/Log' component={ Log } /> 
                                <Route exact path='/log/header' component={ Header } /> 
                              <Route exact path='/log/:logDate' component={ Log } /> 
                              </Fragment>
                              :
                              <Fragment>
                              <Route exact path='/login' component={()=> <Login userTypePath={userTypePath}/> }/>
                              <Route exact path='/register' component={ Register }/>
                              <Route exact path='/' component={()=> <Login userTypePath={userTypePath}/> }/>
                              <Redirect exact path='/home' component={ Home } /> 
                              <Route exact path='/officerHome' component={ OfficerHome } /> 
                                <Redirect exact path='/LogForm' component={ Login } /> 
                                <Redirect exact path='/LogForm/train' component={ Login } /> 
                                <Redirect exact path='/LogForm/train/coaches' component={ Login } /> 
                                <Redirect exact path='/Log' component={ Login } /> 
                                <Redirect exact path='/log/header' component={ Login } /> 
                              </Fragment>
                            }
                            </Switch>
                        </AnimatePresence>
                      </div>
                    </div>
                </Fragment>
              </CurrentTrainContext.Provider>
            </CurrentLogContext.Provider>
          </ProfileContext.Provider>
      </UserContext.Provider>
    </Router>
    </div>
  );
}

export default App;
