import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight : '0px',
        marginLeft : '0px',
        margin: theme.spacing(0.1),
        padding: theme.spacing(1),
        // paddingRight: theme.spacing(1),
      },
    },
    staffRoot:{
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0.1),
        padding: theme.spacing(1),
        // paddingRight: theme.spacing(1),
      },
    },
    formTitle:{
      fontSize: '1.5rem',
      borderBottom: '1px solid #d4d4d4',
      width: '25%',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
      },
    },
    form: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'space-around', 
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    headerInputs:{
      marginTop: '4px'
    },
    formArea:{
      '& > *': {
        marginTop: '16px',
      },
      [theme.breakpoints.up('md')]: {
        // backgroundColor: 'red',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
        '& > *:not(:last-child):not(:nth-child(3))': {
          // marginLeft: theme.spacing(0.1),
          // margin: theme.spacing(1),
          maxWidth: '45%',
        },
        '& > *:nth-child(3)': {
          width: '25%',
        },
        '& > *:nth-child(4)': {
          maxWidth: '65%',
        },
      },
    },
    submit: {
      // background: '#cc5577',
      color: '#cc5577',
      border: '1px solid #cc5577',
      maxWidth: '100px',
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(1),
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        // background: 'red'
      }
    },
    dutyHours:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around', 
      '& > *': {
        paddingLeft: '4px',
        paddingRight: '4px',
        margingLeft: '4px',
        margingRight: '4px',
      }
    },
    datePicker: {
        width: '10ch',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        border: '1px solid grey',
        borderRadius: '5px',
    },
    names: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        '& > *': {
          // maxWidth: '80%',
          margin: '8px',
          '& > *': {
            marginBottom: '2px',
            marginTop: '8px'
          },
        },
        [theme.breakpoints.down('md')]: {
          display: 'flex',
          flexWrap: 'wrap',
        },
    },
    hr:{
      marginTop: '16px',
      marginBottom: '16px'
    },
    staffFormArea:{
      width: '100%',
      [theme.breakpoints.up('md')]: {
      },
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        '& > *': {
          '& > *': {
            maxWidth: '45%',
          },
        },
      },
    },
    strength: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      '& > *': {
        maxWidth: '10%',
        marginTop: '16px',
      },
      [theme.breakpoints.down('md')]: {
        '& > *': {
          maxWidth: '25%',
          marginLeft: theme.spacing(1),
        },
      },
    },
    strengthProperty:{
    },
    AllTrains:{
      color: 'red',
      width: '100%',
      padding: '0px 16px'
    }
  }))

export default useStyles;