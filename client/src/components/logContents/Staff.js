import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#303c6c',
    // fontSize: '25px',
    // height: '250px',
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]:{
      flexWrap: 'wrap',
    },
    justifyContent: 'space-around',
    '& > *': {
    },
  },
  paperRoots:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    maxWidth:'600px',
    margin: theme.spacing(0.1),
    [theme.breakpoints.up('sm')]: { 
      padding: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.1), 
      padding: theme.spacing(1),
    },
    [theme.breakpoints.between('sm', 'sm')]:{
      maxWidth: '100%'
    },
    [theme.breakpoints.between('md', 'md')]:{
      width: '50%',
    },
  },
  paperObjectDiv: {
    // backgroundColor: '#303c6c',
    // fontSize: '25px',
    // height: '250px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    '& > *': {
    },
  },
  paperTitle:{
    fontSize: '1.5rem',
    borderBottom: '1px solid #d4d4d4',
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft:'auto',
      marginRight:'auto',
      alignSelf: 'center',
      width: '75%',
    },
  },
  paperObject:{
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: '4px 0px',
    padding: '8px',
    width: '45%',
    maxWidth: '600px',
    borderRight: '1px solid #a19f9f',
    borderBottom: '1px solid #a19f9f',
    borderRadius: '5px',
    '& > *': {
      margin: '0px 8px'
    }
  },
  paperProperty:{
    margin: '0px',
  },
  paperValue: {
    fontSize: '1.5rem',
    margin: '4px 0',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  },
  strengthPaperBody:{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]:{
      justifyContent: 'flex-start'
    },
    flexWrap: 'wrap',
    // margin: '8px 0px'
  },
  strengthObject:{
    width: '205px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '0px 0px',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
        width: '25%',
    },
    borderRight: '1px solid #a19f9f',
    borderBottom: '1px solid #a19f9f',
    borderRadius: '5px',
    '& > *': {
      margin: '0px 8px'
    }
    // maxWidth: '500px'
  },
  strengthProperty:{},
  strengthValue:{
    fontSize: '2rem',
    margin: '4px 0',
    display: 'flex',
  },
  }));

const Staff = (props) => {
    const {testing, carpentry, oiling, otherWorks, 
        pipeFitting, strength, underGear , logData} = props,
        {absent, onLeave, onRoll, physicallyPresent, sick, underRest} = logData.staff[0].totalSacntionedStrength,
        works1 = ['Testing','Carpentry','Oiling','Other Works',
                  'Pipe Line','Under Gear',],
        works2 = ['testing','carpentry','oiling','otherWorks',
                  'pipeFitting','underGear',],
        strength1 = ['Absent', 'On Leave', 'On Roll', 'Sick', 'Under Rest', 'Physically Present'],
        strength2 = ['absent', 'onLeave', 'onRoll', 'sick', 'underRest', 'physicallyPresent'],

        displayPaperObjects = ()=> {
          const array = []
          for(let i = 0; i<works1.length; i++){
            array.push(
              <div className={classes.paperObject}>
                <span className={classes.paperProperty}>{works1[i]}</span> 
                <span className={classes.paperValue}>{eval(`${works2[i]}`)}</span>
              </div>
            )
          }
          return array;
        },
        displayStrength = ()=> {
          const array = []
          for(let i = 0; i<strength1.length; i++){
            array.push(
              <div className={classes.strengthObject}>
                <span className={classes.strengthProperty}>{strength1[i]}</span> 
                <span className={classes.strengthValue}>{eval(`${strength2[i]}`)}</span>
              </div>
            )
          }
          return array;
        }
        
// console.log(absent)

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <Paper elevation={3} className={classes.paperRoots}>
          <span className={classes.paperTitle}>Staff</span>
          <div  className={classes.paperObjectDiv}>
            {
              displayPaperObjects()
            }
          </div>
          </Paper>
          <Paper elevation={3} className={classes.paperRoots}>
          <span className={classes.paperTitle}>Total Sanctioned Strength</span>
          <div className={classes.strengthPaperBody}>
            {
              displayStrength()
            }
          </div>
          </Paper>
        </div>
    )
}

export default Staff
