import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        height: 'auto'
      },
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down('sm')]:{
          margin: theme.spacing(1)
      } 
    },
    profilePaper:{
      maxWidth: '1125px',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    paperObject:{
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius:'5px',
      [theme.breakpoints.between('sm','md')]: {
        maxWidth: '50%'
      },
      padding: '8px 0px',
      [theme.breakpoints.down('sm')]: {
          width: '45%'
      },
      maxWidth: '500px'
    },
    paperProperty:{
      fontWeight: 'bold'
    },
    paperValue: {
      fontSize: '1.3rem',
      '& > *': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          margin: '4px',
      }
    },
    logPaper: {
      width: '80%',
      height: '60px',
      backgroundColor:'blue',
      display: 'flex',
      justifyContent: 'space-between',
    },
    createLog:{
      width: '100%',
      maxWidth: '500px',
      marginTop:'16px',
      padding: '4px',
      '& > *': {
        textDecoration: 'none',
        color: 'black',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        '& > *': {
          margin: '4px'
        }
      },
      '&:hover': {
        backgroundColor: '#f4976c'
      },
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
      maxWidth: '500px',
      margin: '4px',
      [theme.breakpoints.up('sm')]: {
        minWidth: 275,
      },
      [theme.breakpoints.down('xs')]: {
        width: '49%',
        margin:'4px 0px',
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '2px 2px 6px 0px rgba(50, 50, 50, 0.83)',
    },
    addIcon:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      height: '80%',
      width: '100%',
    },
    cardRoot:{
      padding: '0px 0px',
    },
    iconCardRoot:{
      height: '100%',
      padding: '0px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '0px 4px',
      [theme.breakpoints.down('xs')]:{
        flexDirection: 'column'
      },
    },
    dateDay:{
      fontSize: 14,
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '4px 4px',
      [theme.breakpoints.down('xs')]:{
        fontSize: 13,
      },
    },
    cardActions:{
      display: 'flex', 
      justifyContent: 'center'
    },
    buttons:{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      margin: '16px auto'
    },
    openLogButton:{
      color: '#cc5577',
      border: '1px solid #cc5577',
      borderRadius: '5px'
    },
    createNewLogButton:{
      border: '1px soild grey',
      borderRadius: '5px',
    },
    showAllLogsButton:{
      border: '1px soild grey',
      borderRadius: '5px',
      [theme.breakpoints.down('xs')]: {
        width: '49%',
        margin:'4px 0px',
      },
    },
    pos: {
      marginBottom: 12,
      padding: '0px 4px'
    },
    noLogMsg:{
      width: '50%',
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '32px',
      border: '1px solid black',
      borderRadius: '5px',
      padding: '8px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '45%'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    loadingIcon:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
      "& :nth-child(1) " : {
        fontSize: '5rem',
      }
    },
  }));

  export default useStyles;