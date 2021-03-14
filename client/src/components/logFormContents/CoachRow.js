import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext' 
import axios from 'axios'

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
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LoopIcon from '@material-ui/icons/Loop';

const useRowStyles = makeStyles({
    root: {
      borderBottom: '0px', 
      width: '100%',
    },
    cell: {
      '&:hover': {
        backgroundColor: '#d6d6d6'
      },
      padding: '0px',
      borderLeft: '1px solid #d6d6d6',
      borderRight: '1px solid #d6d6d6',
    },
    cellInput: {
      backgroundColor: 'inherit',
      fontSize: '0.9rem',
      border: '0',
      height: '76px',
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
      // height: '60px',
      // width: '250px',
      textAlign: 'left',
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
    iconCell:{
      display: 'flex',
      justifyContent: 'space-around',
      paddingLeft:'0px',
      paddingRight:'0px',
      '& > *': {
        paddingLeft: '0px',
        paddingRight: '0px',
        minWidth: '50%'
      },
      minHeight: '76px',
    },
    sickButton:{
      color: 'red',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
  });

const CoachRow = (props)=> {
    const { serialNo, currentLog, trainId, addSickCoach } = props;
    const { userData, setUserData } = useContext(UserContext)
    const token = userData.token
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const cellNames = [
      'owningRailway', 'coachNo', 'coachCode', 'mechCode', 
      'returnDate', 'pohStation', 'pohDate', 'iohStation', 
      'iohDate', 'angleCock'
    ]
    const workNames = ['underGearWorks', 'pipeLineWorks', 'carpentryWorks', 'airBrakeWorks', 'schedules']
    
    const [displayUploadIcon, setDisplayUploadIcon] = useState('block')
    const [displayLoopIcon, setDisplayLoopIcon] = useState('none')
    const [displayCheckIcon, setDisplayCheckIcon] = useState('none')
    const [borderBottom, setborderBottom] = useState('grey')
    const [scheduleButton, setscheduleButton] = useState('')
    const [coachData, setCoachData] = useState([{
      serialNo: serialNo,
      owningRailway: 'CR',
      coachNo: '20101',
      coachCode: 'ACCN',
      mechCode: 'aa',
      returnDate: '2017-05-24', 
      pohStation: 'MTN', 
      pohDate: '2017-05-24', 
      iohStation: 'PA', 
      iohDate: '2017-05-24', 
      angleCock: 'open/open',
    }])
    const [worksData, setworksData] = useState([{
      underGearWorks: '11091700', pipeLineWorks: 'bababa',
      carpentryWorks: 'aaaa', airBrakeWorks: 'aaas'
    }])
    // console.log([...coachData[0]])

    const evalVariable = (stateName, val)=> {
        let object = stateName,
            dot = '.',
            method = `${val}`,
            wholeString = object + dot + method;
        return(eval(wholeString)) 
        // console.log(object)
    } 

    const handleChange = (evt)=> {
      const value = evt.target.value;
      setCoachData([{
        ...coachData[0],
        [evt.target.name]: value
      }]);
      console.log(evt.target.name)
      console.log(evt.target.value)
    }

    const handleWorksChange = evt=> {
      const value = evt.target.value;
      setworksData([{
        ...worksData[0],
        [evt.target.name]: value
      }]);
      console.log(evt.target.name)
      console.log(evt.target.value)
    }
    const handleScheduleChange = (event) => {
      setscheduleButton(event.target.value);
    };

    const body = {
      serialNo: coachData[0].serialNo,
      owningRailway: coachData[0].owningRailway,
      coachNo: coachData[0].coachNo,
      coachCode: coachData[0].coachCode,
      mechCode: coachData[0].mechCode,
      returnDate: coachData[0].returnDate,
      angleCock: coachData[0].angleCock,
      underGearWorks: worksData[0].underGearWorks,
      pipeLineWorks: worksData[0].pipeLineWorks,
      carpentryWorks: worksData[0].carpentryWorks,
      airBrakeWorks: worksData[0].airBrakeWorks,
      pohStation: coachData[0].pohStation,
      pohDate: coachData[0].pohDate,
      iohStation: coachData[0].iohStation,
      iohDate: coachData[0].iohDate,
    }
    
    const sendData = async ()=> {
      ///api/log/coach/:logId/:trainId
      console.log(body)
      setDisplayUploadIcon('none')
      setDisplayLoopIcon('block')
      setborderBottom('orange')
        await axios
        .post(`/api/log/coach/${currentLog}/${trainId}`, body, { headers: { "x-auth-token": token}})
        .then(response=> {
          console.log(response)
          console.log(response.status)
          if(response.status === 200){
            setDisplayLoopIcon('none')
            setDisplayCheckIcon('block')
            setborderBottom('green')
          }
        })
        .catch(error=> {
          console.log(error)
        })
    }
    const displayCells = ()=> {
      const array = [];
      for(let i=0; i<cellNames.length; i++){
        if(i === 4 || i === 6 || i === 8){array.push(
          <TableCell align="center" width='100px' className={classes.cell}>
            <input 
              name = {cellNames[i]}
              type = 'date'
              value={evalVariable('coachData[0]', cellNames[i])}
              onChange= {(evt)=> handleChange(evt)}
              className={classes.cellInput}
            />
          </TableCell>)
        }
        else{
          array.push(
            <TableCell align="center" className={classes.cell}>
              <input 
                name = {cellNames[i]}
                value={evalVariable('coachData[0]', cellNames[i])}
                onChange= {(evt)=> handleChange(evt)}
                className={classes.cellInput}
              />
            </TableCell>)
        }
      }
      return array;
    }
    
    const displayWorksCells = ()=> {
      const array = [];
      for(let i=0; i<workNames.length; i++){
        i !==4 ?
        array.push(
          <TableCell align="left" className={classes.cell}>
            <textarea 
              name = {workNames[i]}
              value={evalVariable('worksData[0]', workNames[i])}
              onChange= {(evt)=> handleWorksChange(evt)}
              className={classes.worksCellInput}
              style={{width: '100%',}}
            />
          </TableCell>)
        :
        array.push(
          <TableCell align="inline" className={classes.cell}>
          <RadioGroup aria-label="schedule" name="schedule" value={scheduleButton} onChange={handleScheduleChange}>
            <FormControlLabel value="A" control={<Radio />} label="A" />
            <FormControlLabel value="B" control={<Radio />} label="B" />
            <FormControlLabel value="" control={<Radio />} label="None" />
          </RadioGroup>
          </TableCell>)
      }
      return array;
    }

    // const sendSickData = ()=> {
    //   const sickData = {
    //     serialNo: serialNo,
    //     owningRailway: body.owningRailway,
    //     coachNo: body.coachNo,
    //     coachCode: body.coachCode,
    //     returnDate: body.returnDate, 
    //     pohStation: body.pohStation, 
    //     pohDate: body.pohDate, 
    //     iohStation: body.iohStation, 
    //     iohDate: body.iohDate,
    //   }
    //   addSickCoach(sickData)
    // }

    return (
        // <h1>Row</h1>
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className={classes.cell}>
            <input 
                value={coachData[0].serialNo}
                className={classes.cellInput}
              />
          </TableCell>
          {
            displayCells()
          }
          <TableCell className={classes.iconCell} style={{borderBottom:`4px solid ${borderBottom}`}}>
            <Button  onClick={()=> sendData()} className={classes.uploadButton} style={{display: displayUploadIcon}}><CloudUploadIcon /></Button>
            <Button className={classes.LoopIcon} style={{display: displayLoopIcon}}>
              <LoopIcon /> 
              <span style={{}}>uploading...</span>
            </Button>
            <Button className={classes.CheckCircleIcon} style={{display: displayCheckIcon}}><CheckCircleIcon /></Button>
            {/* <Button className={classes.sickButton} onClick={()=> sendSickData()}>S</Button> */}
          </TableCell>
        </TableRow>
        <TableRow className={classes.worksRow}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Works
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Undergear Works</TableCell>
                      <TableCell align="center">Pipeline Works</TableCell>
                      <TableCell align="center">Carpentry Works</TableCell>
                      <TableCell align="center">Air Brake Works</TableCell>
                      <TableCell align="center">Schedules</TableCell>
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