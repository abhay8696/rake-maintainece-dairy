import React, { useEffect, useContext, useState } from 'react'
import UserContext from '../context/UserContext' 
import ProfileContext from '../context/ProfileContext' 
import AllSupervisors from './officerLogs/allSupervisors'
import FilteredLogs from './officerLogs/filteredLogs'


import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios'
import { motion } from "framer-motion"

import useStyles from './styles/home'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles2 = makeStyles((theme) => ({
  tabRoot: {
    width: '100%',
    '& header':{
      // backgroundColor: 'teal',
      borderRadius: '5px'
    },
  },
  tab1:{
    '& > *':{
      padding: '0px'
    }
  },
}));


const OfficerHome = ()=> {
    const { userData } = useContext(UserContext)
    const token = userData.token;
    const { profileData, setProfileData } = useContext(ProfileContext)
    
    const [supervisorList, setSupervisorList] = useState([])
    const [allUsersAllLogs, setAllUsersAllLogs] = useState([])
    
    const classes = useStyles();

    //tab
    const classes2 = useStyles2();
    const theme = useTheme();
    const [tabPanelValue, setTabPanelValue] = useState(0)
    const handleTabChange = (evt, newValue) => {
      setTabPanelValue(newValue);
    };
    const handleChangeIndex = (index) => {
      setTabPanelValue(index);
    };
    //tab

    const { root, profilePaper } = classes


    const loadProfile = async ()=> {
        console.log("fetching Data from server...")

        let response = await axios.get('api/officerProfile/me', { headers: { "x-auth-token": token}})
        console.log("supervisor home called...")

        let allUserAllLogsRoute = await axios.get('api/officerProfile/allUserAllLogs', { headers: { "x-auth-token": token}});

        localStorage.setItem('userProfile', JSON.stringify(response.data));
        let data = await JSON.parse(localStorage.getItem('userProfile'))
        await setProfileData({
          name : data.officerProfile.name,
          designation: data.officerProfile.designation,
          supervisors: [...data.allUser] ,
          employeeId: data.officerProfile.employeeId
        })
        setSupervisorList([...response.data.allUser])
        setAllUsersAllLogs([...allUserAllLogsRoute.data])
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

          {/* tab */}
          <div className={classes2.tabRoot}>
            <AppBar position="static" color="default" className={classes.appBar}>
              <Tabs
                value={tabPanelValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                // textColor="primary"
                // variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Supervisors" {...a11yProps(0)} />
                <Tab label="OWS" {...a11yProps(1)} />
                <Tab label="NWS" {...a11yProps(2)} />
                <Tab label="GCMC" {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={tabPanelValue}
              onChangeIndex={handleChangeIndex}
              className={classes2.tabBody}
            >
              <TabPanel value={tabPanelValue} index={0} dir={theme.direction} className={classes2.tab1}>
                <AllSupervisors supervisorList={supervisorList} officerData={profileData} />
              </TabPanel>
              <TabPanel value={tabPanelValue} index={1} dir={theme.direction} className={classes2.tab1}>
                <FilteredLogs depotType='OWS' supervisorList={supervisorList} token={token} officerID={profileData.employeeId} allUsersAllLogs={allUsersAllLogs}/>
              </TabPanel>
              <TabPanel value={tabPanelValue} index={2} dir={theme.direction} className={classes2.tab1}>
                <FilteredLogs depotType='NWS' supervisorList={supervisorList} token={token} officerID={profileData.employeeId} allUsersAllLogs={allUsersAllLogs}/>
              </TabPanel>
              <TabPanel value={tabPanelValue} index={3} dir={theme.direction} className={classes2.tab1}>
                <FilteredLogs depotType='GCMC' supervisorList={supervisorList} token={token} officerID={profileData.employeeId} allUsersAllLogs={allUsersAllLogs}/>
              </TabPanel>
            </SwipeableViews>
          </div>
          {/* tab */}
          
        </motion.div>
  )
}

export default OfficerHome