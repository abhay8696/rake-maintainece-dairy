import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProfileContext from '../context/ProfileContext' 
import AuthOptions from '../components/auth/authOptions'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';

import './styles/Navbar.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navbar: {
      // backgroundColor: "#f4976c", 
      backgroundColor: "#071e3d", 
      boxShadow: 'none',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
      [theme.breakpoints.down('xs')]:{
        padding: '0px'
      }
    },
    allLogs: {
      textDecoration: 'none',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      // padding: theme.spacing(1),
    },
    allLogsLabel:{
      marginRight :theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    appTitle: {
      position: 'absolute',
      width: '100%',
      height:'64px',
      display: 'flex',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      // backgroundColor: 'grey',
      fontSize: '1.5rem',
      [theme.breakpoints.down('xs')]:{
        fontSize: '1.2rem',
        height: '48px'
      },
      [theme.breakpoints.between('md', 'md')]:{
        height:'76px',
      }
    },
    userButton:{
      zIndex: '2',
      color: 'white',
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    authOptions: {
      // padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#bfbfbf'
    },
    userName:{
      marginRight :theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    userIcon:{
      marginTop: '5px',
      marginLeft: '0px',
    },
    leftSide:{
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        width: '15%',
        justifyContent: 'space-around'
      },
      zIndex: '2',
    },
    date:{ 
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    popOver: {
      // backgroundColor: '',
      width: '200px',
      height: '100px'
    },
  }));

const Navbar = () => {
    const classes = useStyles(),
    { profileData, setProfileData } = useContext(ProfileContext),

    [auth, setAuth] = React.useState(true),
    [anchorEl, setAnchorEl] = React.useState(null),
    date = new Date(),
          dayy = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          defDate = {
            dd : date.getDate(),
            mm : date.getMonth()+1,
            yyyy:date.getFullYear(),
            day: dayy[date.getDay()]
          },
          currentDate = `${defDate.dd}/0${defDate.mm}/${defDate.yyyy}`,

    handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    },
  
    handleClose = () => {
      setAnchorEl(null);
    };

  
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{boxShadow: 'none'}}>
            <div variant="h6" className={classes.navbar}>
              <span className={classes.leftSide}>
                <Button>
                  <Link to='/' className={classes.allLogs}>
                    <span className={classes.allLogsLabel}>All Logs</span>
                    <Tooltip title="All Logs" className={classes.tooltip}>
                      <AppsIcon />
                    </Tooltip>
                  </Link>
                </Button>
                <span className={classes.date}>{currentDate}</span>
              </span>
              {/* <span className={classes.rightSide}> */}
                    <Button type="button"  className={classes.userButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
                      {
                        //show username if logged in else show nothing
                        profileData.name ? 
                          <span className={classes.userName}>{profileData.name}</span>
                        :
                          <> </>
                      }
                      <Tooltip title="User" className={classes.tooltip}>
                        <span className={classes.userIcon}><AccountCircleIcon /></span>
                      </Tooltip> 
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      style={{marginTop: '60px'}}
                    >
                      <div className={classes.popOver}>
                      {auth && (
                      <span className={classes.authOptions}>
                        <MenuItem onClick={handleClose}><AuthOptions/></MenuItem>
                      </span>
                      )}
                      </div>
                    </Menu>
              {/* </span> */}
            </div>
              <span className={classes.appTitle}>
                Rake Maintenance Diary
              </span>
        </AppBar>
      </div>
    );
  }

export default Navbar;

