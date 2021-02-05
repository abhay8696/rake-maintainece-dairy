import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: { 
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    paper: {
        fontSize: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        // flexDirection:'column',
        justifyContent: 'space-between',
        '& > *': {
          margin: theme.spacing(1),
          // width: theme.spacing(16),
          display: 'flex',
          height: 'auto',
          alignItems: 'baseline',
        },
    },
    value: {
        fontSize: '25px',
        marginLeft: theme.spacing(1), 
        borderRadius: '5px',
        backgroundColor: '#b5b5b5',
        padding: theme.spacing(1)
    },
    AccordionSummary: {
        display: 'flex',
        justifyContent: 'space-around',
        // backgroundColor: 'red'
    }
  }));


const Coach = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const { data } = props;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
      
    return (
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Coach No <span className={classes.value}>{data.coachNo}</span></Typography>
                    <Typography className={classes.secondaryHeading}>Coach Code <span className={classes.value}>{data.coachCode}</span></Typography>
                    <Typography className={classes.secondaryHeading}>Owning Railway<span className={classes.value}>{data.owningRailway}</span></Typography>
                    <Typography className={classes.secondaryHeading}>
                        IOH
                        <span className={classes.value}>{data.ioh.date}</span>
                        <span className={classes.value}>{data.ioh.station}</span>
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        POH
                        <span className={classes.value}>{data.poh.date}</span>
                        <span className={classes.value}>{data.poh.station}</span>
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Return
                        <span className={classes.value}>{data.returnDate}</span>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} className={classes.paper}>
                            <div>
                                Angle Cock
                                <span className={classes.value}>{props.data.angleCock}</span>
                            </div>
                            <div>
                                Mechanical Code
                                <span className={classes.value}>{props.data.mechCode}</span>
                            </div>
                            <div>
                                Undergear Works
                                <span className={classes.value}>{props.data.underGearWorks}</span>
                            </div>
                            <div>
                                Air Brake Testing Works
                                <span className={classes.value}>{props.data.airBrakeWorks}</span>
                            </div>
                            <div>
                                Pipe Line Works
                                <span className={classes.value}>{props.data.pipeLineWorks}</span>
                            </div>
                            <div>
                                Carpentry Works
                                <span className={classes.value}>{props.data.carpentryWorks}</span>
                            </div>
                            
                    </Paper>
                </AccordionDetails>
            </Accordion>
    )
}

export default Coach
