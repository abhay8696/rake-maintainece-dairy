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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Link } from 'react-router-dom'
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
        [employeeId, setEmployeeId] = useState(''),
        [officer, setOfficer] = useState(false),
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
        },
        handleEmployeeIdChange = evt=> {
          setEmployeeId(evt.target.value)
        };


  const onSubmit = async (evt)=> {
    evt.preventDefault();
    const body = {
      name: name,
      email: email,
      password: password,
      batch: batch,
      designation: designation,
      employeeId: employeeId,
    }
    let url;

    console.log(JSON.stringify(body))
    body.designation === 'Senior Officer' ? url = "/api/officers" : url = "/api/users"
    await axios
      .post(url,body)
      .then(response=> {
        console.log(url)
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
            autoFocus={true}
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
            value={email}
            onChange={(evt)=>handleEmailChange(evt)}
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
            value={designation}
            onChange={handleDesignationChange}
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
            fullWidth
            type="Number"
            id="employeeId"
            label="Employee ID"
            name="employeeId"
            autoComplete="employeeId"
            value={employeeId}
            onChange={(evt)=>handleEmployeeIdChange(evt)}
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
            value={batch}
            onChange={(evt)=>handleBatchChange(evt)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Set New Password"
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