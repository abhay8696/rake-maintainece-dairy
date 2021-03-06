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
        [theme.breakpoints.up('md')]:{
            marginLeft: '128px',
        },
    },
    accordionDetails: {
        fontSize: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        
    },
    accordDivs:{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #a19f9f',
        borderBottom: '1px solid #a19f9f',
        borderRadius:'5px',
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
        display: 'flex',
        flexWrap: 'wrap',
        flexShrink: '1',
        margin: '4px 0',
        '& > *': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '4px',
            paddingRight: '4px',
        },
        [theme.breakpoints.down('sm')]:{
            '& > *': {
                width: '45%'
            },
            justifyContent: 'space-between',
        },
        [theme.breakpoints.up('md')]:{
            flexDirection: 'column',
            '& > *': {
                height:'30px',
            },
        },
    },
    property: {
        [theme.breakpoints.down('sm')]: {
            marginRight: '4px'
        }
    },
    pressureDivs:{
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]:{
            alignItems: 'flex-start',
            '& > *':{
                margin: 'auto 0px'
            },
        },
    },
    frontRear:{
        marginRight: '8px',
    },
    value: {
        borderRadius: '5px',
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
            alignItems: 'baseline',
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
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    

    const evalVariable = (stateName, val)=> {
        let object = stateName,
            dot = '.',
            method = `${val}`,
            wholeString = object + dot + method;
        return(eval(wholeString)) 
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
            <Accordion className={classes.root} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                className={classes.accordionSummary}
                >
                    <div className={classes.AccordionSummaryBody}>
                    <div className={classes.trainNo}>
                        <span className={classes.property} style={{fontWeight: 'bold'}}>Train No</span>
                        <span className={classes.value}>{trainNo}</span>
                    </div>
                    <div className={classes.trainName}>
                        <span className={classes.property} style={{fontWeight: 'bold'}}>Train Name</span>
                        <span className={classes.value}>{trainName}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property} style={{fontWeight: 'bold'}}>Pit</span>
                        <span className={classes.value}>{pitlineNo}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property} style={{fontWeight: 'bold'}}>Load</span>
                        <span className={classes.value}>{load}</span>
                    </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
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
                            </div>
                        </div>
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
    )
}

export default Train
