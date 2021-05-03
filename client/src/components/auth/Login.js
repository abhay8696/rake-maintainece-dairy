import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom' //for url history

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
    fontSize: '1.5rem',
    marginBottom: '0px'
  },
}));

const Login = (props) => {
    const { userTypePath } = props;
    const classes = useStyles();
    const history = useHistory()
    const {register, handleSubmit } = useForm()
    const {userData, setUserData} = useContext(UserContext)
    const [loginError, setloginError] = useState(false)
    const [helperTextEmail, sethelperTextEmail] = useState('')
    const [helperTextPassword, sethelperTextPassword] = useState('')
    const [helperTextDesignation, sethelperTextDesignation] = useState('')
    const [designation, setDesignation] = useState('')
    const [gotoRoute, setGotoRoute] = useState("")

    const onSubmit = async (data)=> {       
      let url = "api/auth";   //userType by default = supervisor

      //if designation === officer set url to "api/officerAuth" else by default it's set to user(supervisor)
      if(designation === "Senior Officer"){
        url = "api/officerAuth";
        console.log('sending request to officer');
        setGotoRoute('/officerHome')
      }else{
        url = "api/auth";
        console.log('sending request to supervisor route');
        setGotoRoute('/home');
      }

      axios
      .post(url,data)
      .then(async response=> {
        console.log(response)
        console.log('post succesful!!!')
        url === "api/auth" ?  userTypePath("supervisor") : userTypePath("officer")
        const token = response.data.token
        console.log(token)
        console.log(`sending get request on ${url}`)
        const tokenRes = await axios.get(
          url,
          { headers: { "x-auth-token": token}}
        )

        setUserData({
          token,
          user: tokenRes.data
        })
        localStorage.setItem('x-auth-token', token);

        // history.push(gotoRoute)
      })
      .catch(async err=> {
        console.log(err)
        setloginError(true)
      })
    }

    return (
      <Container component="main" className={classes.root}>
        <div className={classes.intro}>
          <p>
            Rake Maintenance Diary is a simple Web-App which stores information
            of trians and coaches which are maintained in depot daily.
          </p>
          <div> 
            <p className={classes.introTagline}>It's Digital. It's Online. It's Paperless!</p>
            <p  style={{marginTop: '0px'}}>Imagine 100+ large sized journals that can fit in your pocket.</p>
          </div>
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
            <FormControl variant="outlined" className={classes.formControl} fullWidth 
              margin="normal">
              <InputLabel>Designation</InputLabel>
              <Select
              id="demo-simple-select"
              label="Designation"
              fullWidth
              variant="outlined" 
              margin="normal"
              onChange={(evt)=> {sethelperTextDesignation(''); setDesignation(evt.target.value)}}
              error={loginError}
              helperText={helperTextEmail}
              inputRef={register}
              required
              >
                <MenuItem value={'Senior Officer'}>Senior Officer</MenuItem>
                <MenuItem value={'Senior Section Engineer'}>Senior Section Engineer</MenuItem>
                <MenuItem value={'Junior Engineer'}>Junior Engineer</MenuItem>
              </Select>
            </FormControl>
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














{/*

  
*/}
