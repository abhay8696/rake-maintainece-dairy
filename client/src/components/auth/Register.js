import React, { useState } from 'react'
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
  },
}));

const Register =()=> {
  const classes = useStyles();
  const history = useHistory()
  // const { register, handleSubmit } = useForm()
  const [name, setName] = useState(""),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [batch, setBatch] = useState(''),
        [designation, setDesignation] = useState(''),

        handleNameChange = evt=> {
          setName(evt.target.value)
        },
        handleEmailChange = evt=> {
          setEmail(evt.target.value)
        },
        handlePasswordChange = evt=> {
          setPassword(evt.target.value)
        },
        handleBatchChange = evt=> {
          setBatch(evt.target.value)
        },
        handleDesignationChange = evt=> {
          setDesignation(evt.target.value)
        };


  const onSubmit = async (evt)=> {
    evt.preventDefault();
    const body = {
      name: name,
      email: email,
      password: password,
      batch: batch,
      designation: designation
    }
    console.log(JSON.stringify(body))
    await axios
      .post("/api/users",body)
      .then(response=> {
        console.log('Registration Successful!')
        console.log(response)
        history.push('/login')
      })
      .catch(err=> {
        console.log('!!!!!!!!!!!'+err)
        console.log(JSON.stringify(body))
      })

      // if(success) return <Redirect to='/login'/>
      // console.log(body)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LockIcon />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form 
          className={classes.form} 
          noValidate 
          onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value= {name}
            onChange={(evt)=>handleNameChange(evt)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(evt)=>handleEmailChange(evt)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="batch"
            label="Batch Name"
            name="batch"
            autoComplete="Batch"
            autoFocus
            value={batch}
            onChange={(evt)=>handleBatchChange(evt)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="designation"
            label="Designation"
            name="designation"
            autoComplete="designation"
            autoFocus
            value={designation}
            onChange={(evt)=>handleDesignationChange(evt)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value= {password}
            onChange={(evt)=>handlePasswordChange(evt)}
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
              <Link to='/' variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;