import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext' 


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Coach from './Coach'
import SickCoachTable from '../logFormContents/SickCoach'
import DeleteButton from '../DeleteButton'

const useStyles = makeStyles((theme) => ({
    root: { 
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        height: '100%'
    },
    accordionSummary:{
        display: 'flex',
        paddingLeft: '16px',
        paddingRight: '16px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '4px',
            paddingRight: '4px',
        },
        // backgroundColor: 'red',
    },
    deleteButton:{
        display: 'flex',
        alignItems: 'center',
        // marginLeft: '16px',
        [theme.breakpoints.up('md')]:{
            marginLeft: '128px',
        },
        [theme.breakpoints.down('sm')]:{
            marginRight: '16px',
            backgroundColor: 'red'
        },
    },
    accordionDetails: {
        fontSize: '15px',
        display: 'flex',
        // width: '100%',
        flexWrap: 'wrap',
        // flexDirection:'column',
        justifyContent: 'space-between',
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
        borderRadius:'5px',
        backgroundColor: '#e6e6e6',
        margin: '4px 0px',
        padding: '4px',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        maxWidth: '500px'
    },
    accordDivTitles:{
        fontWeight: 'bold'
    },
    accordDivDetails:{
        // backgroundColor: 'blue',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]:{
            justifyContent: 'space-between',
        },
        flexShrink: '1',
        margin: '4px 0',
        '& > *': {
            display: 'flex',
            alignItems: 'baseline',
            margin: '4px',
        },
    },
    accordDivDetailsObjects:{
        // backgroundColor: 'teal',
        [theme.breakpoints.down('sm')]:{
            width: '45%',
            display: 'flex',
            justifyContent: 'space-between',
            '& > :nth-child(2)': {
                marginRight: '16px',
            },
        },
    },
    sickDivObject:{
        [theme.breakpoints.down('sm')]:{
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between'
        },
    },
    pressureDivs:{
        display: 'flex',
        flexDirection: 'column',
        // height: '100px',
        [theme.breakpoints.down('sm')]:{
            // backgroundColor: 'teal',
            alignItems: 'flex-start',
            '& > *':{
                margin: 'auto 0px'
            },
            '& > :nth-child(1)': {
                marginBottom: '4px',
            },
        },
    },
    property: {
        // backgroundColor: 'red'
        color: '#636363',
        [theme.breakpoints.down('sm')]: {
            marginRight: '4px'
        },
        fontWeight: 'bold',
    },
    frontRear:{
        // backgroundColor: 'red',
        marginRight: '8px'
    },
    value: {
        borderRadius: '5px',
        // backgroundColor: '#b5b5b5',
        padding: theme.spacing(0),
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(1), 
            fontSize: '25px',
            padding: theme.spacing(1),
        },
    },
    AccordionSummaryBody: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        '& > *': {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            [theme.breakpoints.down('sm')]:{
                // maxWidth: '100px',
                marginRight: '8px'
            },
        },
        [theme.breakpoints.up('md')]:{
            width: '90%',
        },
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
    sickCoaches:{
        width: '100%',
    },
    addSickCoach:{
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-between',
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
    pitNloadSM:{
        [theme.breakpoints.down('sm')]:{
            display: 'none'
        }
    },
  }));

const Train = (props) => {
    // const {testing, carpentry, oiling, otherWorks, 
    //     pipeFitting, strength, underGear} = props;
    const { data, collection, itemID, changeCollectionSate, currentLog } = props;
    console.log(data.washingAndCleaning.checkBox)
    const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext);
    const [expanded, setExpanded] = React.useState(false);
    const [CoachData, setCoachData] = useState(data.coaches)
    const [CoachTableOn, setCoachTableOn] = useState('false');
    const token = userData.token;
    const { brakeType, remarks, timeReplacementProvided, 
            timeUnfitMemoIssued, trainName, trainNo, 
            load } = data
    const { memoNo, timeRecieved, pitlineNo } = data.formation
    const { lineBlockingTime, lineReleaseTime } = data.protectionOfRake
    const trainId = itemID;
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
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
                        <div className={classes.accordDivDetailsObjects}>
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
                    <div>
                        <span className={classes.property}>Train No </span>
                        <span className={classes.value}>{trainNo}</span>
                    </div>
                    <div>
                        <span className={classes.property}>Train Name</span>
                        <span className={classes.value}>{trainName}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property}>Pit No</span>
                        <span className={classes.value}>{pitlineNo}</span>
                    </div>
                    <div className={classes.pitNloadSM}>
                        <span className={classes.property}>Load</span>
                        <span className={classes.value}>{load}</span>
                    </div>
                    </div>
                    <div className={classes.deleteButton}>
                    <DeleteButton 
                        collection={collection} itemID={itemID} 
                        changeCollectionSate={changeCollectionSate} token={token}/>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    {/* <div className={classes.paper}> */}
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Formation</span>
                            <div className={classes.accordDivDetails}>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Memo No</span>
                                    <span className={classes.value}>{memoNo}</span></div>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Brake Type</span>
                                    <span className={classes.value}>{brakeType}</span>
                                </div>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Pit No</span>
                                    <span className={classes.value}>{pitlineNo}</span></div>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Load</span>
                                    <span className={classes.value}>{load}</span></div>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Time Received</span>
                                    <span className={classes.value}>{timeRecieved}</span></div>
                                {/* className={classes.property} <div>Pit No<span className={classes.value}>{pitlineNo}</span></div> */}
                            </div>
                        </div>
                        {/* className={classes.property} <div>Load<span className={classes.value}>{load}</span></div> */}
                        <div className={classes.accordDivs}> 
                            <span className={classes.accordDivTitles}>Protection Of Rake</span>
                            <div className={classes.accordDivDetails}>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Line Blocking Time</span>
                                    <span className={classes.value}>{lineBlockingTime}</span>
                                </div>
                                <div className={classes.accordDivDetailsObjects}>
                                    <span className={classes.property}>Line Release Time</span>
                                    <span className={classes.value}>{lineReleaseTime}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Pressure</span>
                            <div className={classes.accordDivDetails}>
                                <div className={classes.pressureDivs}>
                                    <span className={classes.property}>Brake Pipe</span>
                                    <div>
                                        <span className={classes.frontRear}>Front:</span>
                                        <span className={classes.value}>{data.pressure.bp.front}</span>
                                    </div>
                                    <div>
                                        <span className={classes.frontRear}>Rear:</span>
                                        <span className={classes.value}>{data.pressure.bp.rear}</span>
                                    </div>
                                </div>
                                <div className={classes.pressureDivs}>
                                    <span className={classes.property}>Feed Pipe</span>
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
                        
                        <div className={classes.accordDivs}>
                            <span className={classes.accordDivTitles}>Sick Data</span>
                            <div className={classes.accordDivDetails}>
                                <div className={classes.sickDivObject}>
                                    <span className={classes.property}>Time Unfit Memo Issued</span>
                                    <span className={classes.value}>{timeUnfitMemoIssued}</span>
                                </div>
                                <div className={classes.sickDivObject}>
                                    <span className={classes.property}>Time Replacement Provided</span>
                                    <span className={classes.value}>{timeReplacementProvided}</span>
                                </div>
                                <div className={classes.sickDivObject}>
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
                        <Coach load={load}  currentLog={currentLog} trainId={trainId}/> : <></>
                    </div>
                    {/* <div className={classes.sickCoaches}>
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
                    </div> */}

                    <SickCoachTable currentLog={currentLog} trainId={trainId}/>
                </AccordionDetails>
            </Accordion>
        // </div>
    )
}

export default Train
