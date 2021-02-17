import React, { useContext } from 'react'
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


const useStyles = makeStyles((theme) => ({
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
  }
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory()
    const {register, handleSubmit } = useForm()
    const {userData, setUserData} = useContext(UserContext)

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
        console.log(data)
      })
    }

    return (
      <Container component="main" maxWidth="xs">
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
                  {"Don't have an account? Sign up/ Register Here"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

export default Login;
