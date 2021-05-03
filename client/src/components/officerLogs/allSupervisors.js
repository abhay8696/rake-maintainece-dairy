import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ForwardIcon from '@material-ui/icons/Forward';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOffIcon from '@material-ui/icons/GridOff';
import AppsIcon from '@material-ui/icons/Apps';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles2 = makeStyles((theme) => ({
    root:{
        // backgroundColor: 'red',
        // width: '100%',
    },
    allLogs: {
      width: '100%',
      display: 'flex',
      left: 'auto',
      right: 'auto',
      flexWrap: 'wrap',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]:{
        justifyContent: 'space-between',
      },
    },
    card: {
      maxWidth: '1125px',
      margin: '4px',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        margin:'4px 0px',
      },
      boxShadow: '2px 2px 6px 0px rgba(50, 50, 50, 0.83)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px !important',
    },
    cardRoot:{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > *':{
        minWidth: '40%',
        textAlign: 'left'
      },
      flexGrow: '1',
      padding: '0px',
      // backgroundColor: 'red'
    },
    supName:{
      // width: '30%',
      fontWeight: 'bold'
    },
    supID:{
      // width: '20%'
    },
    supDesignation:{
      // maxWidth: '30%'
    },
    button:{
      width: '66px',
      height: '100%',
      display: 'flex', alignItems: 'center',
      marginLeft: '4px',
      '& > *':{
        color: '#cc5577',
        border: '1px solid #cc5577',
        borderRadius: '5px'
      },
    },
    searchNfilter:{
      [theme.breakpoints.down('sm')]:{
        width: '100%',
      },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '16px auto'
    },
    filter: {
      width: '45%',
      margin: '0px'
    },
    searchBox: {
      width: '45%'
    },
  }));

const AllSupervisors = (props) => {
    const classes = useStyles2();
    const { supervisorList, officerData } = props
    const [noLogsAlert, setNoLogsAlert] = useState(false)
    const [noLogMsg, setNoLogMsg] = useState('')

    const [filteredList, setFilteredList] = useState([])
    const [filterMsg, setFilterMsg] = useState('')
    const [toggleError, setToggleError] = useState(false)

    
    const displaySupervisors = (listType)=> {
        let divArray = [], list;

        //decide if all supersvisors to show or only filtered supervisors to show
        listType === "filteredSups" ? list = filteredList : list = supervisorList

        list.map(supervisor=>{
          let desg
          supervisor.designation === "Senior Section Engineer" ? desg= "SSE" : desg="JE"
          divArray.push(<Card className={classes.card}>
            <CardContent className={classes.cardRoot}>
                <span className={classes.supName}>
                  {supervisor.name}
                </span>
                <span className={classes.supDesignation}>
                  {desg}
                </span>
                <span  className={classes.supBatch}>
                  Batch: {supervisor.batch}
                </span>
                <span  className={classes.supID}>
                  ID: {supervisor.employeeId}
                </span>
            </CardContent>
                <Link 
                  to={
                    { 
                    pathname: `/officer_${officerData.employeeId}/supervisorHome_${supervisor.employeeId}`, 
                    supData:supervisor,
                    officerID: officerData.employeeId
                  }
                  }
                  style={{textDecoration:'none'}}  
                  className={classes.button} 
                >
                  <Button size="small" variant="outlined">
                    <ForwardIcon/>
                  </Button>
                </Link>
          </Card>)
        })
        return divArray;
      }
      
    const filterFunc = evt=> {
        let desg = evt.target.value
        let array = [];
        for(let i=0; i<supervisorList.length; i++){
          if(desg === supervisorList[i].designation){
            array.push(supervisorList[i])
          }
          else setFilteredList([])
        }
        setFilteredList([...array])
      }
    const handleSearch = evt=> {
        let name = evt.target.value;
        let array = [];
  
        if(evt.key === 'Enter'){
          console.log(name)
          for(let i=0; i<supervisorList.length; i++){
            if(name && supervisorList[i].name.toLowerCase().includes(name.toLowerCase())){
              array.push(supervisorList[i])
            }
          }
          if(array.length === 0) {
            setToggleError(true)
            setFilterMsg('No Match Found!')
          }
        }
        setFilteredList([...array])
        setTimeout(() => {
          setToggleError(false)
          setFilterMsg('')
        }, 5000);
      }
    return (
    <div className={classes.root}>
        <div className={classes.searchNfilter}>
            <FormControl variant="outlined" className={classes.filter}
              margin="normal">
              <InputLabel>Filter</InputLabel>
              <Select
              id="demo-simple-select"
              label="Designation"
              fullWidth
              variant="outlined" 
              margin="normal"
              onChange={(evt)=> filterFunc(evt)}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'Junior Engineer'}>Show All JEs</MenuItem>
                <MenuItem value={'Senior Section Engineer'}>Show All SSEs</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label='Search By Name' 
              variant="outlined" 
              className={classes.searchBox}
              onKeyPress = {evt=> handleSearch(evt)}
              error= {toggleError}
              helperText={filterMsg}
            />
        </div>

        <div className={classes.allLogs}> 
              {     
                //display filteredList 
                  filteredList  ? displaySupervisors('filteredSups') : <></>
              }
              
        </div>   
            
        <div className={classes.allLogs}> 
          {     
            //display all logs 
              supervisorList  ? displaySupervisors('allSups') : <h1>Loading Supervisor List</h1>
          }
        </div>
    </div>
    )
}

export default AllSupervisors
