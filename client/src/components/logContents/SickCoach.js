import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SickCoachRow from './SickCoachRow'

const useStyles = makeStyles((theme) => ({
  table: {
    '& * >': {
    },
  }
}))

const SickCoachTable = (props)=> {
  const { data } = props;
  // console.log(currentLog)
  // console.log('table')
  console.log(data)
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

  displayRows = ()=> {
    const array = []
    for(let i=0; i<data.length; i++){
      // console.log(coaches[i])
      array.push(
        <SickCoachRow 
          key={i+1} 
          serialNo={i+1}
          data={data[i]}
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
export default SickCoachTable