import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    paper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    paperObject:{
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius:'5px',
      margin: '4px 0px',
      padding: '8px',
      [theme.breakpoints.down('sm')]: {
          minWidth: '45%',
          maxWidth: '49%',
      },
      maxWidth: '500px'
    },
    paperValue: {
      fontSize: '2rem',
      margin: '4px 0',
      display: 'flex',
      [theme.breakpoints.down('sm')]:{
        fontSize: '1.8rem'
      },
    },
    dutyTime:{
      margin: '0px 4px'
    },
  }));

const Header = (props) => {
    const { date, day, place, from, to} = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.paperObject}>
              <span className={classes.paperProperty}>Date</span> 
              <span className={classes.paperValue}>{date}</span>
            </Paper>
            <Paper elevation={1} className={classes.paperObject}>
              <span className={classes.paperProperty}>Day</span> 
              <span className={classes.paperValue}>{day}</span>
            </Paper>
            <Paper elevation={1} className={classes.paperObject}>
              <span className={classes.paperProperty}>Place</span> 
              <span className={classes.paperValue}>{place}</span>
            </Paper>
            <Paper elevation={1} className={classes.paperObject}>
                <span className={classes.paperProperty}>Duty Time</span>
                <span  className={classes.paperValue}>
                  <span className={classes.dutyTime}>{from}</span>
                  <span className={classes.dutyTime}>-</span>
                  <span className={classes.dutyTime}>{to}</span>
                </span>
            </Paper>
        </div>
    )
}

export default Header
