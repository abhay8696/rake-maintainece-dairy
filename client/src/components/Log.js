import React, { useState, useEffect } from 'react'

import Header from './logContents/Header'
import Staff from './logContents/Staff' 
import Trains from './logContents/Trains'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        maxWidth: '1100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        margin: theme.spacing(1),
        [theme.breakpoints.between('sm', 'md')]:{
            maxWidth: '900px',
        },
        [theme.breakpoints.down('sm')]:{
            margin: theme.spacing(0.5),
        }, 
    },
}));

const Log = (props) => {
    const classes = useStyles()
    const logData = props.location.state
    console.log(logData)

    const [isLogAvailable, setisLogAvailable] = useState(false)




    // const fetchLogData = async ()=> {
    //     let response = await axios.get(`api/log/${CurrentLog}`,{ headers: { "x-auth-token": token}})
    //     console.log('response')
    //     console.log(response)
    //     console.log('response')
    //     // setLogData(response.data)
    // }
    
    useEffect(()=>{
        setisLogAvailable(true)
    },[])

    const display = ()=> {
        console.log(logData.trains[1])
        const {date, day, depot } = logData.header[0]
        const {brakePower, carpentry, oiling, otherWorks, pipeFitting, underGear} = logData.staff[0];
        
        const displayTrains = ()=> {
            const trainArray =[]
            logData.trains.map(train=> {
                console.log(train)
                trainArray.push(
                    <Trains data = {train} />
                )
            })
            return trainArray;
        }
        return  <div className={classes.root}>
                    <Header 
                        date    = {date}
                        day     = {day}
                        place   = {depot}
                        from    = {logData.header[0].dutyHrs.from}
                        to      = {logData.header[0].dutyHrs.to}
                    />

                    <Staff
                        testing     = {brakePower}
                        carpentry   = {carpentry}
                        oiling      = {oiling}
                        otherWorks  = {otherWorks}
                        pipeFitting = {pipeFitting}
                        logData    = {logData}
                        underGear   = {underGear}
                    />
                    {
                        displayTrains()
                    }
                </div >
        // return <h1>asdad</h1>
    }

    return ( 
        isLogAvailable ? display() : <h2>Loading...</h2>
        // <h1></h1>
    )
}

export default Log
