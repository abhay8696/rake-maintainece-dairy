import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext' 


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CoachTable from './CoachTable'
import SickCoachTable from '../logContents/SickCoach'

const useStyles = makeStyles((theme) => ({
    root: { 
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        height: '100%'
    },
    accordionSummary:{
        display: 'flex',
    },
    deleteButton:{
        display: 'flex',
        alignItems: 'center',
        // marginLeft: '16px',
        [theme.breakpoints.up('md')]:{
            marginLeft: '128px',
        },
        [theme.breakpoints.down('sm')]:{
            // marginLeft: '16px',
        },
    },
    accordionDetails: {
        fontSize: '15px',
        display: 'flex',
        // width: '100%',
        flexWrap: 'wrap',
        // flexDirection:'column',
        justifyContent: 'space-around',
        // padding: '0px',
        '& > *': {
        //   margin: theme.spacing(1),
        //   // width: theme.spacing(16),
        //   display: 'flex',
        //   height: 'auto',
        //   alignItems: 'baseline',
        },
        
    },
    accordDivs:{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #a19f9f',
        borderBottom: '1px solid #a19f9f',
        borderRadius:'5px',
        // backgroundColor: '#e6e6e6',
        margin: '4px 0px',
        padding: '4px',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: '49%'
        },
        maxWidth: '100%',
    },
    accordDivTitles:{
        fontWeight: 'bold'
    },
    accordDivDetails:{
        // backgroundColor: 'blue',
        display: 'flex',
        // flexDirection: 'column',
        flexShrink: '1',
        margin: '4px 0',
        '& > *': {
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            margin: '4px',
            // backgroundColor: 'blue'
        },
        [theme.breakpoints.down('sm')]:{
            '& > *': {
                flexDirection: 'column',
            },
            justifyContent: 'space-around'
        },
        [theme.breakpoints.up('md')]:{
            flexDirection: 'column',
            '& > *': {
                height:'30px',
            },
        },
    },
    property: {
        // backgroundColor: 'red',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            marginRight: '4px'
        }
    },
    pressureDivs:{
        display: 'flex',
        flexDirection: 'column',
        height: '100px'
    },
    frontRear:{
        // backgroundColor: 'red',
        // marginRight: '8px'
        marginLeft: theme.spacing(1), 
    },
    value: {
        borderRadius: '5px',
        // backgroundColor: '#b5b5b5',
        padding: theme.spacing(0),
        [theme.breakpoints.up('md')]: {
            fontSize: '25px',
            padding: theme.spacing(1),
        },
    },
    AccordionSummaryBody: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        '& > *': {
            display: 'flex',
            // flexWrap: 'wrap',
            alignItems: 'baseline',
            [theme.breakpoints.down('sm')]:{
                // maxWidth: '100px',
            },
        },
        [theme.breakpoints.up('md')]:{
            width: '90%',
        },
    },
    pitNloadSM:{
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    },
    coachIcon:{
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        backgroundColor: '#808080',
        },
    addCoach:{
        width: '100%',
        margin: '8px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperTitle:{
      fontSize: '1.5rem',
      marginTop: theme.spacing(2),
      borderBottom: '1px solid #d4d4d4',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        alignSelf: 'center',
        width: '75%',
      },
    },
    trainName:{
        [theme.breakpoints.down('sm')]:{
            width: '60%',   
        },
    },
    trainNo:{
        [theme.breakpoints.down('sm')]:{
            width: '40%',   
        },
    },
  }));

const Train = (props) => {
    // const {testing, carpentry, oiling, otherWorks, 
    //     pipeFitting, strength, underGear} = props;
    const { data, currentLog } = props;
    console.log(data.sickCoaches)
    const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext);
    const [expanded, setExpanded] = React.useState(false);
    const [CoachData, setCoachData] = useState(data.coaches)
    const [CoachTableOn, setCoachTableOn] = useState('false');
    const { brakeType, remarks, timeReplacementProvided, 
            timeUnfitMemoIssued, trainName, trainNo, 
            load } = data
    const { memoNo, timeRecieved, pitlineNo } = data.formation
    const { lineBlockingTime, lineReleaseTime } = data.protectionOfRake
    // const trainId = collection[0]._id;
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
    const toggleCoach = ()=> {
        setCoachTableOn(!CoachTableOn);
    }

    const evalVariable = (stateName, val)=> {
        let object = stateName,
            dot = '.',
            method = `${val}`,
            wholeString = object + dot + method;
        return(eval(wholeString)) 
        // console.log(eval(wholeString))
    } 

    const displayWashing = ()=> {
        const works = ['internalCleaning', 'externalCleaning', 
                        'lavatoryFloorCleaning', 'disinfectionOfLavatory', 'pestControl']
        const worksNames = ['Internal Cleaning', 'External Cleaning', 
                        'Lavatory Floor Cleaning', 'Disinfection Of Lavatory', 'Pest Control']
        let array = []
            for(let i = 0; i < works.length; i++){
                if(evalVariable('data.washingAndCleaning', works[i])){
                    array.push(
                        <div>
                            <span>{worksNames[i]}</span>
                            <Checkbox
                                checked={evalVariable('data.washingAndCleaning', works[i])}
                                name= {works[i]}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                    )
                }// console.log(array);
            }
            return array
    }

    return (
        // <div className={classes.root}>
            <Accordion className={classes.root} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                className={classes.accordionSummary}
                >
                    <div className={classes.AccordionSummaryBody}>
                    <div className={classes.trainNo}>
                        <span className={classes.property}>Train No</span>
                        <span className={classes.value}>{trainNo}</span>
                    </div>
                    <div className={classes.trainName}>
                        <span className={classes.property}>Train Name</span>
                        <span className={classes.value}>{trainName}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property}>Pit</span>
                        <span className={classes.value}>{pitlineNo}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property}>Load</span>
                        <span className={classes.value}>{load}</span>
                    </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    {/* <div className={classes.paper}> */}
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Formation</span>
                            <div className={classes.accordDivDetails}>
                                <div>
                                    <span className={classes.property}>Memo No</span>
                                    <span className={classes.value}>{memoNo}</span></div>
                                <div>
                                    <span className={classes.property}>Time Received</span>
                                    <span className={classes.value}>{timeRecieved}</span></div>
                                <div>
                                    <span className={classes.property}>Brake Type</span>
                                    <span className={classes.value}>{brakeType}</span>
                                </div>
                                <div>
                                    <span className={classes.property}>Pit No</span>
                                    <span className={classes.value}>{pitlineNo}</span></div>
                                <div>
                                    <span className={classes.property}>Load</span>
                                    <span className={classes.value}>{load}</span></div>
                                {/* className={classes.property} <div>Pit No<span className={classes.value}>{pitlineNo}</span></div> */}
                            </div>
                        </div>
                        {/* className={classes.property} <div>Load<span className={classes.value}>{load}</span></div> */}
                        <div className={classes.accordDivs}> 
                            <span className={classes.accordDivTitles}>Protection Of Rake</span>
                            <div className={classes.accordDivDetails}>
                                <div>
                                    <span className={classes.property}>Line Blocking Time</span>
                                    <span className={classes.value}>{lineBlockingTime}</span>
                                </div>
                                <div>
                                    <span className={classes.property}>Line Release Time</span>
                                    <span className={classes.value}>{lineReleaseTime}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Pressure</span>
                            <div className={classes.accordDivDetails} style={{flexDirection: 'row'}}>
                                <div className={classes.pressureDivs}>
                                    <span className={classes.property}>Brake Pipe</span>
                                    <div>
                                        <div>
                                            <span className={classes.frontRear}>Front:</span>
                                            <span className={classes.value}>{data.pressure.bp.front}</span>
                                        </div>
                                        <div>
                                            <span className={classes.frontRear}>Rear:</span>
                                            <span className={classes.value}>{data.pressure.bp.rear}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.pressureDivs}>
                                    <span className={classes.property}>Feed Pipe</span>
                                    <div>
                                        <div>
                                            <span className={classes.frontRear}>Front:</span>
                                            <span className={classes.value}>{data.pressure.fp.front}</span>
                                        </div>
                                        <div>
                                            <span className={classes.frontRear}>Rear:</span>
                                            <span className={classes.value}>{data.pressure.fp.rear}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Sick Data</span>
                            <div className={classes.accordDivDetails}>
                                <div>
                                    <span className={classes.property}>Time Unfit Memo Issued</span>
                                    <span className={classes.value}>{timeUnfitMemoIssued}</span>
                                </div>
                                <div>
                                    <span className={classes.property}>Time Replacement Provided</span>
                                    <span className={classes.value}>{timeReplacementProvided}</span>
                                </div>
                                <div>
                                    <span className={classes.property}>Remarks</span>
                                    <span className={classes.value}>{remarks}</span>
                                </div>
                            </div>
                        </div>
                        
                        {
                            data.washingAndCleaning.checkBox ? (
                                <div className={classes.accordDivs}>
                                    <span className={classes.accordDivTitles}>Washing And Cleaning</span>
                                    <div className={classes.accordDivDetails}>
                                    {
                                        displayWashing()
                                    }
                                    </div>    
                                </div>
                            )
                                    :
                                    <></>
                        }

                        
                    <div className={classes.addCoach}>
                        <span className={classes.paperTitle}>Coaches</span>
                    {
                        data.coaches.length > 0  ?
                        <>
                            <CoachTable load={load} coaches={data.coaches} currentLog={currentLog} trainId={data._id}/> : <></>
                        </>
                        : <span>No Coaches Added</span>
                    }
                    </div>

                    <div className={classes.addCoach}>
                        <span className={classes.paperTitle}>Sick Coaches</span>
                    {
                        data.sickCoaches.length > 0 ?
                        <>
                            <SickCoachTable data={data.sickCoaches}/> : <></>
                        </>
                        : <span>No Sick Coaches Added</span>
                    }
                    </div>
                </AccordionDetails>
            </Accordion>
        // </div>
    )
}

export default Train
