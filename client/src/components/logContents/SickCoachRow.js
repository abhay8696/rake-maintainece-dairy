import React, { useContext } from 'react';
import UserContext from '../../context/UserContext' 

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
        // borderBottom: 'unset',
      },
      width: '100%'
    },
    cell: {
      // backgroundColor: 'blue',
      '&:hover': {
        backgroundColor: '#d6d6d6'
      },
      padding: '0px 0px',
      borderLeft: '1px solid #d6d6d6'
    },
    cellInput: {
      backgroundColor: 'inherit',
      fontSize: '0.9rem',
      border: '0',
      height: '60px',
      width: '80px',
      textAlign: 'center',

    },
    worksRow:{
      // position: 'absolute'
    },
    worksCellInput:{
      backgroundColor: 'inherit',
      fontSize: '0.9rem',
      border: '0',
      height: '60px',
      // width: '250px',
      textAlign: 'left',
    },
    worksCell:{
      borderLeft: '1px solid #d6d6d6',
      borderRight: '1px solid #d6d6d6',
      width: '20%',
    },
    workTable:{
      // backgroundColor: '#dedcdc'
    },
    uploadButton:{
      backgroundColor: ''
    },
    CheckCircleIcon: {
      color: 'green'
    },
    LoopIcon: {
      color: 'orange',
      fontSize: '0.4rem',
      // position: 'absolute'
    },
  }); 

const SickCoachRow = (props)=> {
    const { data, serialNo } = props;
    console.log(data)
    const {owningRailway, coachNo, coachCode, mechCode, returnDate, 
            pohStation, pohDate, iohStation, iohDate, description} = data
    const { userData, setUserData } = useContext(UserContext)
    const classes = useRowStyles();
    const cellNames = ['owningRailway', 'coachNo', 'coachCode', 
      'returnDate', 'pohStation', 'pohDate', 'iohStation', 
      'iohDate', 'description'
    ]
    
 
    
    const displayCells = ()=> {
      const array = [];
      for(let i=0; i<cellNames.length; i++){
          array.push(
            <TableCell align="center" width='100px' height='76px' className={classes.cell}>
              {eval(cellNames[i])}
            </TableCell>
            )
      }
      return array;
    }
    
    return (
        // <h1>Row</h1>
      <React.Fragment>
        <TableRow className={classes.root}>
            <TableCell align="center" width='100px' className={classes.cell}>
              {serialNo}
            </TableCell>
          {
            displayCells()
          }
        </TableRow>
      </React.Fragment>
    );
  }
  


  export default SickCoachRow;