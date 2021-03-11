import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom' //for url history

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import iconsArray from '../../icons/iconsArray'


const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:'',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]:{
      width:'100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      flexWrap: 'wrap',
    },
    '& > *':{
      maxWidth: '412px',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1f2833",
  },
  link:{
    // textDecoration: 'none',
    color: 'black'
  },
  intro: {
    textAlign: 'center',
  },
  introTagline:{
    fontSize: '1.5rem'
  },
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory()
    const {register, handleSubmit } = useForm()
    const {userData, setUserData} = useContext(UserContext)
    const [loginError, setloginError] = useState(false)
    const [helperTextEmail, sethelperTextEmail] = useState('')
    const [helperTextPassword, sethelperTextPassword] = useState('')

    const onSubmit = async data=> {
      console.log(data)
      axios
      .post("api/auth",data)
      .then(async response=> {
        console.log(response)
        const token = response.data.token
        const tokenRes = await axios.get(
          "/api/auth",
          { headers: { "x-auth-token": token}}
        )

        setUserData({
          token,
          user: tokenRes.data
        })
        localStorage.setItem('x-auth-token', token);
        history.push('/home')
      })
      .catch(err=> {
        console.log('!!!!!!!!!!!'+err)
        setloginError(true)
        sethelperTextEmail('Enter Valid Email ID')
        sethelperTextPassword('Enter Valid Password')
        console.log(data)
      })
    }

    return (
      <Container component="main" className={classes.root}>
        <div className={classes.intro}>
          <p>
            Rake Maintenance Diary is a simple Web-App which stores information
            of trians and coaches which are maintained in depot daily.
          </p>
          <p className={classes.introTagline}> 
            It's Digital. It's Online. It's Paperless!
          </p>
          {iconsArray}
        </div>
        <CssBaseline />
        <div className={classes.paper}>
          <LockIcon />
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputRef={register}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={loginError}
              helperText={helperTextEmail}
              onChange={()=>{ sethelperTextEmail(''); setloginError(false)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputRef={register}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={loginError}
              helperText={helperTextPassword}
              onChange={()=>{ sethelperTextPassword(''); setloginError(false)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register' variant="body2" className={classes.link}>
                  {"New User? Sign up/ Register Here"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

export default Login;
