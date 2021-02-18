import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext' 
import axios from 'axios'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LoopIcon from '@material-ui/icons/Loop';

const useRowStyles = makeStyles({
    root: {
      '& > *': {
      },
      borderBottom: '0px', 
      width: '100%',
      // backgroundColor: 'skyblue'
    },
    cell: {
    //   backgroundColor: 'blue',
      '&:hover': {
        backgroundColor: '#d6d6d6'
      },
      padding: '0px 0px',
      borderLeft: '1px solid #d6d6d6',
      borderRight: '1px solid #d6d6d6',
    },
    cellInput: {
      backgroundColor: 'inherit',
      fontSize: '0.9rem',
      border: '0',
      height: '76px',
      width: '100%',
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
    },
    sickButton:{
      color: 'red',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
  });

const CoachRow = (props)=> {
    const { serialNo, currentLog, trainId  } = props;
    const { userData, setUserData } = useContext(UserContext)
    const token = userData.token
    const classes = useRowStyles();
    const cellNames = [
      'owningRailway', 'coachNo', 'coachCode', 
      'returnDate', 'pohStation', 'pohDate', 'iohStation', 
      'iohDate', 'description'
    ]
    
    const [displayUploadIcon, setDisplayUploadIcon] = useState('block')
    const [displayLoopIcon, setDisplayLoopIcon] = useState('none')
    const [displayCheckIcon, setDisplayCheckIcon] = useState('none')
    const [borderBottom, setborderBottom] = useState('grey')

    const [coachData, setCoachData] = useState([{
      serialNo: serialNo,
      owningRailway: 'CR',
      coachNo: '20101',
      coachCode: 'ACCN',
      returnDate: '2017-05-24', 
      pohStation: 'MTN', 
      pohDate: '2017-05-24', 
      iohStation: 'PA', 
      iohDate: '2017-05-24', 
      description: 'wheel defect',
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


    const body = {
      serialNo: coachData[0].serialNo,
      owningRailway: coachData[0].owningRailway,
      coachNo: coachData[0].coachNo,
      coachCode: coachData[0].coachCode,
      returnDate: coachData[0].returnDate,
      pohStation: coachData[0].pohStation,
      pohDate: coachData[0].pohDate,
      iohStation: coachData[0].iohStation,
      iohDate: coachData[0].iohDate,
      description: coachData[0].description
    }
    
    const sendData = async ()=> {
      ///api/log/sickCoach//:logId/:trainId
      console.log(body)
      setDisplayUploadIcon('none')
      setDisplayLoopIcon('block')
      setborderBottom('orange')
        await axios
        .post(`/api/log/sickCoach/${currentLog}/${trainId}`, body, { headers: { "x-auth-token": token}})
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
      let width = '100px'
      for(let i=0; i<cellNames.length; i++){
          if (i === 8) width = '200px';
          array.push(
            <TableCell align="center" width={width} className={classes.cell}>
              <input 
                name = {cellNames[i]}
                value={evalVariable('coachData[0]', cellNames[i])}
                onChange= {(evt)=> handleChange(evt)}
                className={classes.cellInput}
                width={width} 
              />
            </TableCell>)
      }
      return array;
    }
    
    return (
        // <h1>Row</h1>
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row" width='100px' className={classes.cell}>
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