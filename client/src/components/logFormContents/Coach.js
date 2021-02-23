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
  }
}))

const CoachTable = (props)=> {
  const { load, currentLog, trainId, addSickCoach } = props;
  // console.log(currentLog)
  // console.log('table')
  // console.log(trainId)
  const classes = useStyles();
  const tableHeads = ['Serial No','Owning Railway', 'Painted Number', 'Coach Code', 
  'Mech Code', 'Return Date', 'POH Station', 'POH Date',
  'IOH Station', 'IOH Date', 'Angle Cock', 'Upload/Sick'],
  
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
      array.push(<CoachRow key={i+1} serialNo={i+1} currentLog={currentLog} trainId={trainId} addSickCoach={addSickCoach}/>)
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


















































































































































// import React, { useState, useContext } from 'react'
// import UserContext from '../../context/UserContext' 
// import ProfileContext from '../../context/ProfileContext' 
// import CurrentLogContext from '../../context/CurrentLogContext'
// import CurrentTrainContext from '../../context/CurrentTrainContext'
// import axios from 'axios'

// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
// import AntWitch from './AntSwitch'


// const useStyles = makeStyles((theme) => ({
//     root:{
//       display: 'flex',
//       flexDirection: 'column',
//       margin: theme.spacing(2),
//       padding: theme.spacing(3)
//     },
//     form: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-around', 
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//     formation:{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around', 
//     },
//     protectionOfRake:{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     },
//     pressure:{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     }
//   }));
// const Coach = (props) => {
// const classes = useStyles(),
//     { params } =props,
//     { CurrentLog, setCurrentLog} = useContext(CurrentLogContext),
//     { CurrentTrain, setCurrentTrain} = useContext(CurrentTrainContext),
//     { userData, setUserData } = useContext(UserContext),
//     token = userData.token
//     const idNameAuto = ['owningRailway', 'coachCode', 'mechCode', 'angleCock', 'underGearWorks', 'pipeLineWorks', 'carpentryWorks', 'airBrakeWorks']
//     const label =['Owning Railway', 'Coach Code', 'Mech Code', 'Angle Cock', 'Under Gear Works', 'PipeLine Works', 'Carpentry Works', 'Air Brake Works']
//     const iohPoh = ['station', 'date']
//     const date = new Date(),
//         defDate = {
//             dd : date.getDate(),
//             mm : date.getMonth(),
//             yyyy:date.getFullYear(),
//           }

//     const [CoachData, setCoachData] = useState({
//         owningRailway : 'CR',
//         coachNo : 1234,
//         coachCode : 'ACCN',
//         mechCode : '123a',
//         returnDate : '2020-12-12',
//         angleCock : 'open',
//         underGearWorks : 'new brake blocks fitted',
//         pipeLineWorks : 'blah blah blah',
//         carpentryWorks : 'some works attened',
//         airBrakeWorks : 'asdfghjkl, zxcvbnm',
//     })
//     const [POH, setPOH] = useState({
//         station: 'MTN',
//         date: '2020-01-12'
//     })
//     const [IOH, setIOH] = useState({
//         station: 'PA',
//         date: '2020-09-12'
//     })
//     const body = {
//         ...CoachData,
//         poh : POH,
//         ioh: IOH
//     }
//     const handleCoachDataChange = (evt)=> {
//         const value = evt.target.value;
//         setCoachData({
//           ...CoachData,
//           [evt.target.name]: value
//         });
//     }  
//     const handlePOHChange = (evt)=> {
//         const value = evt.target.value;
//         setPOH({
//           ...POH,
//           [evt.target.name]: value
//         });
//     }
//     const handleIOHChange = (evt)=> {
//         const value = evt.target.value;
//         setIOH({
//           ...IOH,
//           [evt.target.name]: value
//         });
//     },
    
//     SubmitCoach = async (evt)=> {
//         evt.preventDefault()
//         sendCoachData()
//     },
//     sendCoachData = async ()=> {
//          //considering log exists already
//          console.log(JSON.stringify(body))
//         await axios
//         ///api/log/coach/:logId/:trainId
//         .post(`api/log/coach/${CurrentLog}/${CurrentTrain}`, body, { headers: { "x-auth-token": token}})
//         .then(response=> {
//           console.log(response)
//         })
//         .catch(error=> {
//           console.log(error)
//         })
//     }
//     const evalVariable = (stateName, val)=> {
//         let object = stateName,
//             dot = '.',
//             method = `${val}`,
//             wholeString = object + dot + method;
//         return(eval(wholeString)) 
//         // console.log(wholeString)
//     }

//     const coachDataDivs = ()=> { 
//         let coachDataDiv=[]
//         for(let i=0; i<label.length; i++){
//             coachDataDiv.push(
//                 <div>
//                     <TextField
//                     variant="outlined"
//                     margin="normal"
//                     value={evalVariable('CoachData', idNameAuto[i])}
//                     fullWidth
//                     label= {label[i]}
//                     id={idNameAuto[i]}
//                     name={idNameAuto[i]}
//                     autoComplete={idNameAuto[i]}
//                     onChange={evt=>handleCoachDataChange(evt)}
//                     />
//                 </div>
//             )
//         }
//         return coachDataDiv
//     }
//     const ioh_poh = ()=> {
//         const   name = ['IOH', 'POH']
        
//         let arr = []
//         for(let i=0; i<name.length; i++){
//             let element = name[i]
//             console.log(element)
//             console.log(iohPoh[i])
//             arr.push(
//                 <Paper>
//                     <span>{name[i]}</span>
                    
//                     <TextField
//                     variant="outlined"
//                     margin="normal"
//                     value={evalVariable(`${element}`, 'station')}
//                     fullWidth
//                     label= 'Station'
//                     id={'station'}
//                     name={'station'}
//                     autoComplete={'station'}
//                     onChange={evt=>{
//                         if(name[i]==='IOH'){ 
//                             handleIOHChange(evt)
//                         }else handlePOHChange(evt)
//                     }
//                     }
//                     />
//                     <TextField
//                     type= 'date'
//                     defaultValue={`${defDate.yyyy}-${defDate.mm}-${defDate.dd}`}
//                     variant="outlined"
//                     margin="normal"
//                     value={evalVariable(`${element}`, 'date')}
//                     fullWidth
//                     label='Date'
//                     id={'date'}
//                     name={'date'}
//                     autoComplete={'date'}
//                     onChange={evt=>{
//                         if(name[i]==='IOH'){ 
//                             handleIOHChange(evt)
//                         }else handlePOHChange(evt)
//                     }
//                     }
//                     />
//                 </Paper>
//             )
//         }
//         return arr
//     }
    
//     console.log(params)
    
//     return (
//         <Paper elevation={3} className={classes.root}>
//             <h1>Coach</h1>
//             <form className={classes.form} onSubmit={(evt)=>SubmitCoach(evt)}>
//                 <div>
//                     <TextField
//                     type='number'
//                     variant="outlined"
//                     margin="normal"
//                     value={CoachData.coachNo}
//                     fullWidth
//                     label= 'Coach No'
//                     id='coachNo'
//                     name='coachNo'
//                     autoComplete='coachNo'
//                     onChange={evt=>handleCoachDataChange(evt)}
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                     type= 'date'
//                     defaultValue={`${defDate.yyyy}-${defDate.mm}-${defDate.dd}`}
//                     variant="outlined"
//                     margin="normal"
//                     value={CoachData.returnDate}
//                     fullWidth
//                     label='Return Date'
//                     id="returnDate"
//                     name="returnDate"
//                     autoComplete="returnDate"
//                     onChange={evt=>handleCoachDataChange(evt)}
//                     />
//                 </div>
//                 {coachDataDivs()}
//                 {ioh_poh()}
//                 <button type='submit'>Save</button>
//             </form>
//         </Paper>
//     )
// }

// export default Coach
