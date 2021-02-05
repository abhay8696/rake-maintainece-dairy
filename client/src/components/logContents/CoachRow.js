import React, { useContext } from 'react';
import UserContext from '../../context/UserContext' 

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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

const CoachRow = (props)=> {
    const { data } = props;
    console.log(data)
    const { serialNo, owningRailway, coachNo, coachCode, mechCode, returnDate, 
            pohStation, pohDate, iohStation, iohDate,
            angleCock, airBrakeWorks, carpentryWorks, pipeLineWorks, underGearWorks} = data
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const cellNames = ['serialNo',
      'owningRailway', 'coachNo', 'coachCode', 'mechCode', 
      'returnDate', 'pohStation', 'pohDate', 'iohStation', 
      'iohDate', 'angleCock'
    ]
    const workNames = ['underGearWorks', 'pipeLineWorks', 'carpentryWorks', 'airBrakeWorks']
    

    
    const displayCells = ()=> {
      const array = [];
      for(let i=0; i<cellNames.length; i++){
          array.push(
            <TableCell align="center" width='100px' className={classes.cell}>
              {eval(cellNames[i])}
            </TableCell>)
      }
      return array;
    }
    
    const displayWorksCells = ()=> {
      const array = [];
      for(let i=0; i<workNames.length; i++){
        array.push(
          <TableCell align="center" className={classes.worksCell}>
            {eval(workNames[i])}
          </TableCell>)
      }
      return array;
    }

    
    return (
        // <h1>Row</h1>
      <React.Fragment>
        <TableRow className={classes.root}>
        <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell> 
          {
            displayCells()
          }
        </TableRow>
        <TableRow className={classes.worksRow}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Works
                </Typography>
                <Table size="small" aria-label="purchases" className={classes.workTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Undergear Works</TableCell>
                      <TableCell align="center">Pipeline Works</TableCell>
                      <TableCell align="center">Carpentry Works</TableCell>
                      <TableCell align="center">Air Brake Works</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        {
                          displayWorksCells()
                        }
                        {/* <TableCell>{worksRow.pipeLineWorks}</TableCell>
                        <TableCell align="right">{worksRow.carpentryWorks}</TableCell>
                        <TableCell align="right">{worksRow.airBrakeWorks}</TableCell> */}
                      </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  CoachRow.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          underGearWorks: PropTypes.string.isRequired,
          pipeLineWorks: PropTypes.string.isRequired,
          carpentryWorks: PropTypes.string.isRequired,
          airBrakeWorks: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };


  export default CoachRow;