import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom' //for url history
import UserContext from '../../context/UserContext'
import CurrentLogContext from '../../context/CurrentLogContext'

import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    button: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: '5px',
        cursor: 'pointer',
        border: '1px solid black',
        color: 'black',
        '&:hover':{
            backgroundColor: '#fbe8a6',
            // border: 'none'
          }
    },
    logOut: {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        width: '200px',
        color: 'black',
        '&:hover':{
            // backgroundColor: '#fbe8a6',
            // border: 'none'
          }
    }
}))

const AuthOptions = () => {
    const classes = useStyles();
    const {userData, setUserData} = useContext(UserContext)
    const {CurrentLog, setCurrentLog} = useContext(CurrentLogContext)

    const   history = useHistory(),
            register = ()=> history.push('/register'),
            login = ()=> history.push('/login'),
            logout = ()=> {
                setUserData({
                    token: undefined,
                    user: undefined
                })
                setCurrentLog(undefined)
                localStorage.setItem("x-auth-token", "")
                localStorage.setItem("userProfile", "")
                history.push('/login')
            }


    return (
        <>
            {
                userData.user ?
                <span onClick={logout} className={classes.logOut}>
                    <ExitToAppIcon />
                    <span> Log Out</span>
                </span>
                :
                <div>
                <span onClick={register} className={classes.button}>Register</span>
                <span onClick={login} className={classes.button}>Log In</span>
                </div>
            }
            
        </>
    )
}

export default AuthOptions
