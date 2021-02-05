import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CoachRow from './CoachRow'

const useStyles = makeStyles((theme) => ({
  table: {
    '& * >': {
    },
  }
}))

const CoachTable = (props)=> {
  const { load, currentLog, trainId, coaches } = props;
  // console.log(currentLog)
  // console.log('table')
  console.log(coaches)
  const classes = useStyles();
  const tableHeads = ['Serial No','Owning Railway', 'Painted Number', 'Coach Code', 
  'Mech Code', 'Return Date', 'POH Station', 'POH Date',
  'IOH Station', 'IOH Date', 'Angle Cock'],
  
  displayTableHeads = ()=> {
  const array = [];
  
  tableHeads.map(cell=> {
    array.push(
      <TableCell >{cell}</TableCell>
    )
  })
  return array;
  },

  displayRows = ()=> {
    const array = []
    for(let i=0; i<load; i++){
      // console.log(coaches[i])
      array.push(
        <CoachRow 
          key={i+1} 
          currentLog={currentLog} 
          trainId={trainId} 
          data={coaches[i]}
        />
      )
    }
    return array;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
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
  );
}
export default CoachTable