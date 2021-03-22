import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from './logFormContents/Header'
import Staff from './logFormContents/Staff'
import scrollToElement  from 'scroll-to-element'

import Button from '@material-ui/core/Button';
import TrainIcon from '@material-ui/icons/Train';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('sm')]:{
            margin: theme.spacing(1)
        } 
    },
    staffAndTrain: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    addTrain: {
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        marginTop: '8px',
        marginLeft: 'auto',
        marginRight: 'auto',
        cursor: 'pointer',
        color: 'black',
        border: '1px solid #cc5577',
        borderRadius: '5px'
    },
    icon: {
        fontSize: '4rem'
    },
}))

 
const LogForm = () => {
    const classes= useStyles();
    const history = useHistory()
    const [disableStaffAndTrain, setdisableStaffAndTrain] = useState(true)

    const enableStaffAndTrain = ()=> {
        setdisableStaffAndTrain(false)
        console.log('clicked')
    }
const scroll = ()=> {
    console.log('Scrolled')
    scrollToElement('.staff', {
        offset: 0,
        ease: 'out-bounce',
        duration: 1500
    })
}
    return (
        <div className={classes.root}>
            <Header enableStaffAndTrain={()=>enableStaffAndTrain()} scroll={scroll}/>
            {
                disableStaffAndTrain ?  <></>    :
            <div className={classes.staffAndTrain}>
                <div id="staff">
                <Staff/>
                </div>
                <Button 
                    className={classes.addTrain} 
                    onClick={()=> {
                        if(!disableStaffAndTrain) history.push('/LogForm/train')
                    }}
                >
                    <span> Add New Train </span>
                    <TrainIcon 
                        className= {classes.icon} 
                        />
                </Button>
            </div> 
            }
        </div>
    )
}

export default LogForm
