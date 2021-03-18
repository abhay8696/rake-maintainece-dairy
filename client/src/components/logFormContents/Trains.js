import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import UserContext from '../../context/UserContext' 
import Train from './Train'
import CurrentLogContext from '../../context/CurrentLogContext'
import CurrentTrainContext from '../../context/CurrentTrainContext'
import axios from 'axios'


import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';


import useStyles from '../../styles/trainFormStyles'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  } 

const Trains = () => {
const classes = useStyles(),
    { CurrentLog, setCurrentLog} = useContext(CurrentLogContext),
    { userData, setUserData } = useContext(UserContext),
    { CurrentTrain, setCurrentTrain} = useContext(CurrentTrainContext),
    [AllTrains, setAllTrains] = useState([]),
    [toggleFetchIcon, settoggleFetchIcon] = useState('none'),
    [IsAllTrainDataFound, setIsAllTrainDataFound] = useState(false),
    token = userData.token,
    [TrainData, setTrainData] = useState({
        trainNo : 1234,
        trainName : 'Special Train 1',
        load: 5,
        timeUnfitMemoIssued : '12:00',
        timeReplacementProvided : '13:00',
        brakeType : 'Air',
        remarks: 'Wheel Defects'
    }),
    [formation, setFormation] = useState({
        memoNo: '1',
        timeRecieved: '11:00',
        pitlineNo: 1
    }),
    [protectionOfRake, setProtectionOfRake] = useState({
        lineBlockingTime : "12:00",
        lineReleaseTime : "12:00",
    }),
    [pressure, setPressure] = useState({
        FPfront : '6.0 kg/cm2',
        FPrear : '5.8 kg/cm2',
        BPfront : '5.0 kg/cm2',
        BPrear : '4.8 kg/cm2',
    }),
    [toggleWashing, setToggleWashing] = useState(false),
    [washingAndCleaningWorks, setWashingAndCleaningWorks] = useState({
        internalCleaning: true,
        externalCleaning: false,
        lavatoryFloorCleaning: false,
        disinfectionOfLavatory: false,
        pestControl: false,
    }),

    body = {
        trainNo :TrainData.trainNo,
        trainName: TrainData.trainName,
        formation: {
            memoNo: formation.memoNo,
            timeRecieved: formation.timeRecieved,
            pitlineNo: formation.pitlineNo
        },
        load: TrainData.load,
        protectionOfRake: {
            lineBlockingTime: protectionOfRake.lineBlockingTime,
            lineReleaseTime: protectionOfRake.lineReleaseTime,
        },
        timeUnfitMemoIssued: TrainData.timeUnfitMemoIssued,
        timeReplacementProvided: TrainData.timeReplacementProvided,
        brakeType: TrainData.brakeType,
        pressure: {
            fp: {
                front:pressure.FPfront,
                rear:pressure.FPrear
            },
            bp: {
                front: pressure.BPfront,
                rear: pressure.BPrear
            }
        },
        washingAndCleaning: {
            checkBox: toggleWashing,
            internalCleaning: washingAndCleaningWorks.internalCleaning,
            externalCleaning: washingAndCleaningWorks.externalCleaning,
            lavatoryFloorCleaning: washingAndCleaningWorks.lavatoryFloorCleaning,
            disinfectionOfLavatory: washingAndCleaningWorks.disinfectionOfLavatory,
            pestControl: washingAndCleaningWorks.pestControl,
        },
        remarks: TrainData.remarks
    },

    [snackbarState, setsnackbarState] = React.useState({
        snackBarOpen: false,
        vertical: 'top',
        horizontal: 'center',
      }),
      { snackBarOpen, vertical, horizontal } = snackbarState,

      handleClick = (newState) => () => {
        setsnackbarState({ snackBarOpen: true, vertical: 'top', horizontal: 'center'});  
      },
  
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setsnackbarState({ ...snackbarState, snackBarOpen: false });
      },
    
    handleTrainDataChange = (evt)=> {
        setTrainData({
          ...TrainData,
          [evt.target.name]: evt.target.value
        });
      },
    handleFormationChange = (evt)=> {
        setFormation({
            ...formation,
            [evt.target.name]: evt.target.value
        })
    },
    handleProtectionOfRakeChange = (evt)=> {
        setProtectionOfRake({
            ...protectionOfRake,
            [evt.target.name]: evt.target.value
        })
    },
    handlePressureChange = (evt)=> {
        setPressure({
            ...pressure,
            [evt.target.name]: evt.target.value
        })
    }, 
    handleToggleWashing = ()=> {
        setToggleWashing(!toggleWashing)
        setWashingAndCleaningWorks({
            internalCleaning: false,
            externalCleaning: false,
            lavatoryFloorCleaning: false,
            disinfectionOfLavatory: false,
            pestControl: false,
        })
    },
    handleWashingWorks = (evt) => {

        setWashingAndCleaningWorks({
            ...washingAndCleaningWorks,
            [evt.target.name]: !(evalVariable('washingAndCleaningWorks', evt.target.name))
        })
    },

    fetchLogData = async ()=> {
        let response = await axios.get(`/api/log/${CurrentLog}`,{ headers: { "x-auth-token": token}})
        console.log(response.data.trains)
        setAllTrains([...response.data.trains])
        setIsAllTrainDataFound(true)
    },
    editAlltrains = async (newArray)=> {
        setAllTrains([...newArray])
        if(AllTrains.length === 0 ) {setIsAllTrainDataFound(false)}
    },
    displayTrains = ()=> {
        const trainArray =[]
        // eslint-disable-next-line array-callback-return
        if(AllTrains.length>0){
            AllTrains.map(train=> {
                trainArray.push(
                    <div className={classes.trainNdeleteButton}>
                    <Train data = {train} formButtons={true} 
                    collection={AllTrains} itemID={train._id} 
                    changeCollectionSate={editAlltrains} token={token}
                    currentLog ={CurrentLog} 
                    />
                    </div>
                )
            })
            return trainArray;
        } else return <></>
    },
    evalVariable = (stateName, val)=> {
        let object = stateName,
            dot = '.',
            method = `${val}`,
            wholeString = object + dot + method;
        return(eval(wholeString)) 
        // console.log(eval(wholeString))
    }, 
    displayWashing = ()=> {
        const works = ['internalCleaning', 'externalCleaning', 
                        'lavatoryFloorCleaning', 'disinfectionOfLavatory', 'pestControl']
        const worksNames = ['Internal Cleaning', 'External Cleaning', 
                        'Lavatory Floor Cleaning', 'Disinfection Of Lavatory', 'Pest Control']
        let array = []
        if(toggleWashing){
            for(let i = 0; i < works.length; i++){
                array.push(
                    <span>
                        <span>{worksNames[i]}</span>
                        <Checkbox
                            checked={evalVariable('washingAndCleaningWorks', works[i])}
                            name= {works[i]}
                            onChange={(evt)=> handleWashingWorks(evt)}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </span>
                )
                // console.log(array);
            }
            return array
        }
    },
    

    SubmitTrain = async (evt)=> {
        evt.preventDefault()
        console.log('clicked')
        settoggleFetchIcon('block')
        window.scrollTo(0,0)
        await sendData()
        await fetchLogData();
        settoggleFetchIcon('none')
    },

    sendData = async ()=> {
         //considering log exists already
         console.log(JSON.stringify(body))
        await axios
        .post(`/api/log/train/${CurrentLog}`, body, { headers: { "x-auth-token": token}})
        .then(response=> {
            console.log(response.data._id)
            console.log('Train called too!')
            let newTrain = response.data._id
            setCurrentTrain(newTrain)
        })
        .catch(error=> {
          console.log(error)
          console.log(CurrentLog)
        })
        
    }
    

    return (
    // <Container>
        <div className={classes.root} >
        <Paper elevation={3} className={classes.formPaper} onSubmit={(evt)=>SubmitTrain(evt)}>
            <span className={classes.formTitle}>Add New Train</span>
            <form className={classes.form}>
                <div className={classes.formArea}>
                <div style={{maxWidth:'211px'}}>
                    <TextField
                    type= 'number'
                    variant="outlined"
                    value= {TrainData.trainNo}
                    margin="normal"
                    // fullWidth
                    label= 'Train No'
                    id="trainNo"
                    name="trainNo"
                    autoComplete="trainNo"
                    onChange={evt=>handleTrainDataChange(evt)}
                    className={classes.boxes}
                    />
                </div>
                <div style={{maxWidth:'211px'}}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    value= {TrainData.trainName}
                    // fullWidth
                    label= 'Train Name'
                    id="trainName"
                    name="trainName"
                    autoComplete="trainName"
                    onChange={evt=>handleTrainDataChange(evt)}
                    className={classes.boxes}
                    />
                </div>
            
                <div style={{maxWidth:'211px'}}>
                    
                    <TextField
                    type= 'number'
                    variant="outlined"
                    margin="normal"
                    value= {TrainData.load}
                    // fullWidth
                    label= 'Load'
                    id="load"
                    name="load"
                    autoComplete="load"
                    onChange={evt=>handleTrainDataChange(evt)}
                    className={classes.boxes}
                    />
                </div>
                
                <div className={classes.brakeType}>
                    <span>Brake Type</span>
                    <Select
                        name="brakeType"
                        id="demo-customized-select"
                        onChange={evt=>handleTrainDataChange(evt)}
                        value={TrainData.brakeType}
                        className={classes.boxes}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Air'}>Air</MenuItem>
                        <MenuItem value={'Vaccum'}>Vaccum</MenuItem>
                    </Select>
                </div>

                <div className={classes.protectionOfRake}>
                    <div className={classes.boxLabels}>Protection Of Rake</div>
                    <span>
                    <span>
                        {/* <p className={classes.innerLabels}>Line Blocking Time </p> */}
                        <TextField
                        type= 'time'
                        variant="outlined"
                        margin="normal"
                        value={protectionOfRake.lineBlockingTime}
                        label='Line Blocking Time'
                        required
                        // value = {from}
                        // fullWidth
                        id="lineBlockingTime"
                        name="lineBlockingTime"
                        autoComplete="lineBlockingTime"
                        onChange={evt=>handleProtectionOfRakeChange(evt)}
                        className={classes.boxes}
                        style={{maxWidth:'30ch', width:'150px'}}
                        autoFocus
                        /> 
                    </span>
                    <span>
                        {/* <p className={classes.innerLabels}>Line Release Time </p> */}
                        <TextField
                        type= 'time'
                        variant="outlined"
                        margin="normal"
                        value={protectionOfRake.lineReleaseTime}
                        label='Line Release Time'
                        required
                        // value = {from}
                        // fullWidth
                        id="lineReleaseTime"
                        name="lineReleaseTime"
                        autoComplete="lineReleaseTime"
                        onChange={evt=>handleProtectionOfRakeChange(evt)}
                        className={classes.boxes}
                        style={{maxWidth:'30ch', width:'150px'}}
                        autoFocus
                        /> 
                    </span>
                    </span>
                </div>

                <div className={classes.formation}>
                    <span className={classes.boxLabels}>Formation</span>
                    <span>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        value= {formation.memoNo}
                        // fullWidth
                        label= 'Memo No'
                        id="memoNo"
                        name="memoNo"
                        autoComplete="memoNo"
                        onChange={evt=>handleFormationChange(evt)}
                        className={classes.boxes}
                        />
                        
                        <TextField
                        type= 'time'
                        variant="outlined"
                        margin="normal"
                        value= {formation.timeRecieved}
                        label= 'Time Recieved'
                        required
                        // value = {from}
                        // fullWidth
                        id="timeRecieved"
                        name="timeRecieved"
                        autoComplete="timeRecieved"
                        onChange={evt=>handleFormationChange(evt)}
                        className={classes.boxes}
                        autoFocus
                        /> 
                        <div className={classes.boxGroup}>
                        <span>Pit-Line No</span>
                        <Select
                            name="pitlineNo"
                            id="demo-customized-select"
                            onChange={evt=>handleFormationChange(evt)}
                            className={classes.boxes}
                            value= {formation.pitlineNo}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        </div> 
                    </span>
                </div>
                <div className={classes.sick}>
                    <span className={classes.boxLabels}>{`Sick Coach (if any)`}</span>
                    <span>
                        <div>
                            <TextField
                            type= 'time'
                            variant="outlined"
                            margin="normal"
                            value={TrainData.timeUnfitMemoIssued}
                            label= 'Time Un-Fit Memo Issued'
                            fullWidth
                            id="timeUnfitMemoIssued"
                            name="timeUnfitMemoIssued"
                            autoComplete="timeUnfitMemoIssued"
                            onChange={evt=>handleTrainDataChange(evt)}
                            className={classes.boxes}
                            autoFocus
                            style={{maxWidth:'30ch', width:'150px'}}
                            /> 
                        </div>
                        
                        <div>
                            <TextField
                            type= 'time'
                            variant="outlined"
                            margin="normal"
                            value={TrainData.timeReplacementProvided}
                            label= 'Time Replacement Provided'
                            fullWidth
                            id="timeReplacementProvided"
                            name="timeReplacementProvided"
                            autoComplete="timeReplacementProvided"
                            onChange={evt=>handleTrainDataChange(evt)}
                            className={classes.boxes}
                            autoFocus
                            style={{maxWidth:'30ch', width:'150px'}}
                            /> 
                        </div>

                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={TrainData.remarks}
                                // fullWidth
                                label= 'Remarks'
                                id="remarks"
                                name="remarks"
                                autoComplete="remarks"
                                onChange={evt=>handleTrainDataChange(evt)}
                                className={classes.boxes}
                                style={{maxWidth:'30ch', width:'150px'}}
                                />
                        </div>
                    </span>
                </div>
                
                <div className={classes.pressure}>
                    <span className={classes.boxLabels}>Pressure</span>
                    <span>
                        <span className={classes.boxGroup}>
                            <span>Feed Pipe</span>
                            <span>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            value={pressure.FPfront}
                            // fullWidth
                            label= 'Front'
                            id="FPfront"
                            name="FPfront"
                            autoComplete="FPfront"
                            onChange={evt=>handlePressureChange(evt)}
                            className={classes.boxes}
                            />
                            <TextField
                            variant="outlined"
                            margin="normal"
                            value={pressure.FPrear}
                            // fullWidth
                            label= 'Rear'
                            id="FPrear"
                            name="FPrear"
                            autoComplete="FPrear"
                            onChange={evt=>handlePressureChange(evt)}
                            className={classes.boxes}
                            />
                            </span>
                        </span>
                        <span className={classes.boxGroup}>
                        <span>Brake Pipe</span>
                        <span>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            value={pressure.BPfront}
                            // fullWidth
                            label= 'Front'
                            id="BPfront"
                            name="BPfront"
                            autoComplete="BPfront"
                            onChange={evt=>handlePressureChange(evt)}
                            className={classes.boxes}
                            />
                            <TextField
                            variant="outlined"
                            margin="normal"
                            value={pressure.FPrear}
                            // fullWidth
                            label= 'Rear'
                            id="BPrear"
                            name="BPrear"
                            autoComplete="BPrear"
                            onChange={evt=>handlePressureChange(evt)}
                            className={classes.boxes}
                            />
                        </span>
                    </span>
                    </span>
                </div>
                <div className={classes.washing}>
                    <div>
                    <span className={classes.boxLabels}>{`Washing And Cleaning `}</span>
                    <span>
                        <Checkbox
                            checked={toggleWashing}
                            label = 'asas'
                            name= 'checkWash'
                            onChange={handleToggleWashing}
                            // onChange={handleWashingAndCleaning}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </span>
                    </div>
                    {
                        displayWashing()
                    }
                </div>
                
            </div>
                <Button type='submit' onClick={handleClick()} className={classes.submit}>Save</Button>
            </form>
              <Snackbar 
                anchorOrigin={{ vertical, horizontal }}
                open={snackBarOpen} 
                autoHideDuration={2000} 
                onClose={handleClose}
                // style={{width: '350px', marginTop: '55px'}}
                key={vertical + horizontal}
                >
                <Alert onClose={handleClose} severity="success">
                  New Train Created. You can now add Coaches to it.
                </Alert>
              </Snackbar>
        </Paper>
        <div className={classes.AllTrains} style={{}}>
            { IsAllTrainDataFound ? displayTrains() : <></> }
            <div className={classes.fetchingIcon} style={{display: toggleFetchIcon}}>
                {/* <span>Fetching Train</span> */}
                <LinearProgress />
            </div>
        </div>
        </div>
    // </Container>
    )
}

export default Trains
