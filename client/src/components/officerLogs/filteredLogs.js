import React, { useEffect } from 'react'
import axios from 'axios'
import DisplayLogs from './displayLogs'
import useStyles from '../styles/home'

const FilteredLogs = (props) => {
    const 
    { supervisorList, token, allUsersAllLogs, officerID, depotType }  = props,
    classes = useStyles(),
    { root } = classes

    let arr =[] 
    
    //collect all logs in arr
    allUsersAllLogs.map(obj=> {
        arr.push(...obj.logs)
    })
    
    //filter ows logs from all logs
    let filteredLogs = []
    arr.map(obj=> {
        if(obj.header[0].depot === depotType) filteredLogs.push(obj) //depotType= 'OWS' or 'NWS' or 'GCMC'
    })
    
    return (
        <div style={{marginTop: '8px'}}>
        <DisplayLogs allUsersAllLogs= {filteredLogs} officerID={officerID} />
        </div>
    )
}

export default FilteredLogs
