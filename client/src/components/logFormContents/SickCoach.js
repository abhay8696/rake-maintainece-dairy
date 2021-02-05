import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SickCoachRow from './SickCoachRow'

const useStyles = makeStyles((theme) => ({
  root:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  table: {
    '& * >': {
    },
  },
  addSickCoach:{
    width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
  },
  paperSickTitle:{
      fontSize: '1.5rem',
      borderBottom: '1px solid #d4d4d4',
      width: '75%',
  },
  addSickCoachButton:{
      width: '25%',
      [theme.breakpoints.up('sm')]: {
          width: '10%'
      },
  },
}))

const SickCoachTable = (props)=> {
  const { currentLog, trainId } = props;
  console.log(currentLog)
  const [NoOfSickCoaches, setNoOfSickCoaches] = useState(0)
  // console.log(currentLog)
  // console.log('table')
  // console.log(trainId)
  const classes = useStyles();
  const tableHeads = ['Serial No','Owning Railway', 'Painted Number', 'Coach Code', 
  'Return Date', 'POH Station', 'POH Date',
  'IOH Station', 'IOH Date', 'Description'],
  
  displayTableHeads = ()=> {
  const array = [];
  
  tableHeads.map(cell=> {
    array.push(
      <TableCell >{cell}</TableCell>
    )
  })
  return array;
  },

  addSickCoach = ()=> {
    setNoOfSickCoaches(NoOfSickCoaches + 1)
    console.log(NoOfSickCoaches)
  },

  displayRows = ()=> {
    const array = []

    for( let i=0; i<NoOfSickCoaches; i++){
      array.push(<SickCoachRow key={i+1} serialNo={i+1} currentLog={currentLog} trainId={trainId}/>)
    }
    return array
  }

  return (
    <div className={classes.root}>
      <div className={classes.addSickCoach}>
          <span  className={classes.paperSickTitle}>Sick Coaches</span>
          <Button 
              color='primary' 
              variant="contained" 
              className={classes.addSickCoachButton}
              onClick={()=> addSickCoach()}
          >
              <AddIcon />
          </Button>
      </div>
      {
        NoOfSickCoaches > 0 ?
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  displayTableHeads()
                }
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
                {
                  displayRows()
                }
            </TableBody>
          </Table>
        </TableContainer> 
        :
        <span style={{marginLeft: 'auto', marginRight: 'auto'}}>No Sick Coach Added</span>
      }
    </div>
  );
}
export default SickCoachTable