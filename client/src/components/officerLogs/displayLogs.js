import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useStyles from '../styles/home'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import LoopIcon from '@material-ui/icons/Loop';
import AppsIcon from '@material-ui/icons/Apps';

const DisplayLogs = (props) => {
    const {supervisor, officerID, allUsersAllLogs } = props;
    let logArray                                    = [];
    if(supervisor){
      logArray = [...supervisor.logs]
    }else{
      logArray = [...allUsersAllLogs]
    }
      

    const
        [logBucket, setLogBucket]               = useState(logArray),
        [noLogsAlert, setNoLogsAlert]           = useState(false),
        [noLogMsg, setNoLogMsg]                 = useState(''),
        [showSearchedLog, setShowSearchedLog]   = useState(false),

        classes                                 = useStyles()
      console.log(logBucket)
  

    const logList = ()=> {
        const tempArray    = []
        logBucket.map(log=> {
            let date = log.header[0].date,
                txr = undefined;
            if(log.staff[0]){
              if(log.staff[0].trainExaminer){ txr = log.staff[0].trainExaminer}
            }
            tempArray.push(<Card className={classes.card}>
                <CardContent className={classes.cardRoot}>
                  <Typography className={classes.dateDay} gutterBottom>
                    <Typography variant="" component="h2">
                      {log.header[0].date}
                    </Typography>
                    <span>{log.header[0].day}</span>
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                      {
                        txr ? 
                        <span>{txr}</span>
                        :
                        <span>{log.header[0].depot}</span>
                      }
                  </Typography>
                    {
                      log.trains[0] ?  
                        <Typography variant="body2" component="p" className={classes.title}>
                          <span style={{textAlign: 'left'}}>{"Train No: " + log.trains[0].trainNo}</span>
                          <span>{log.trains[0].trainName}</span> 
                        </Typography>
                      : 
                        <Typography variant="body2" component="p" className={classes.title}>
                              <span>No Trains</span> 
                        </Typography>
                    }
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Link to={{ 
                            pathname: `/log/${date}`,
                            prop: {logData: log}
                          }} 
                        style={{textDecoration:'none'}}>
                    <Button size="small" variant="outlined" className={classes.openLogButton}>
                      Open Log
                    </Button>
                  </Link>
                </CardActions>
              </Card>)
        })
        return tempArray.reverse();
    },
    
    searchLog = async (evt)=> {
        let foundLogs = 0
        console.log(logBucket)
        let searchDate = evt.target.value
        searchDate = searchDate.split("-").reverse().join('-')
        console.log(searchDate)
        let arr = []
  
        for(let i=0; i<logBucket.length; i++){
          if(logBucket[i].header[0].date === searchDate){
            arr.push(logBucket[i])
            foundLogs++
          }
        }
        if(foundLogs === 0){
          console.log('log not found')
          setNoLogsAlert(true)
          setNoLogMsg('No Logs found on this date!')
          setTimeout(() => {
            setNoLogsAlert(false)
          }, 5000);
          setLogBucket(logArray)
        }else{
          setNoLogsAlert(false)
          setNoLogMsg('')
          setLogBucket(arr)
          setShowSearchedLog(true)
        }
      }


    return (
    <>
        <div className={classes.buttons}>
            <form className={classes.container} noValidate>  {/*search button*/}
              <TextField
                error= {noLogsAlert}
                helperText={noLogMsg}
                id="date"
                label="Search By Date"
                type="date"
                defaultValue="yyyy-mm-dd"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(evt)=> searchLog(evt)}
              />
            </form>
        </div>

        <div className={classes.allLogs}> 
            {
            logBucket.length > 0 ?     //display all logs
                logList()
            :
                <div className={classes.noLogMsg}>
                <GridOffIcon />  
                <span>No Logs Added! </span>
                </div>
            }
            {
            showSearchedLog ?                  //if searched log is present
            <Button 
                size="small" 
                variant="outlined" 
                className={classes.showAllLogsButton}
                onClick={()=> {
                setNoLogsAlert(false)
                setShowSearchedLog(false)
                setLogBucket(logArray)
                }}
            >
                Show All Logs
                <AppsIcon />
            </Button>
            : <></>
            }
            
        </div>
    </>
    );
}

export default DisplayLogs
