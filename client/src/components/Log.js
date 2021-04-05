import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"

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
    
    useEffect(()=>{
        setisLogAvailable(true)
    },[])

    const paperTransition = {     //to make page transition using framer-motion library
        in: {
          opacity: 1,
          x:0,
        },
        out:{
          opacity: 0,
          x: "100vw"
        }
      }
    const display = ()=> {
        console.log(logData.trains[1])
        const {date, day, depot } = logData.header[0]
        if(logData.staff[0]){
            var {brakePower, carpentry, oiling, otherWorks, pipeFitting, underGear} = logData.staff[0];
        }
        console.log(logData.staff[0])
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
        return  <motion.div className={classes.root}
                initial="out" 
                animate="in" 
                exit="out" 
                variants={paperTransition}
                >
                    <Header 
                        date    = {date}
                        day     = {day}
                        place   = {depot}
                        from    = {logData.header[0].dutyHrs.from}
                        to      = {logData.header[0].dutyHrs.to}
                    />

                    {
                    logData.trains[0] ? 
                        <div>
                            {displayTrains()}
                        </div>
                        : <h3>Train data not available</h3>
                    }
                    
                    {
                        logData.staff[0] ?
                        <Staff
                        testing     = {brakePower}
                        carpentry   = {carpentry}
                        oiling      = {oiling}
                        otherWorks  = {otherWorks}
                        pipeFitting = {pipeFitting}
                        logData    = {logData}
                        underGear   = {underGear}
                        />
                        :
                        <h3>Staff data not available</h3>
                    }
                </motion.div >
    }
    

    return ( 
        isLogAvailable ? display() : <h2>Loading...</h2>
    )
}

export default Log
