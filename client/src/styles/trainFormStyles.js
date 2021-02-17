import { makeStyles, } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fetchingIcon:{
    marginTop: '8px',
    color:'black',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  AllTrains:{
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    ' & > * ' : {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    // padding: '0px 16px',
    [theme.breakpoints.down('sm')]: {
      margin: '3px',
      padding: theme.spacing(0),
    }
  },
  formPaper:{
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.5),
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
      width: '50%',
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
      width: '20ch',
    },
  },
  formArea:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      '& > *': {
        // marginLeft: theme.spacing(0.1),
        margin: theme.spacing(1),
        // maxWidth: '20%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        // marginLeft: theme.spacing(0.1),
        margin: theme.spacing(1),
        // maxWidth: '45%',
      },
    },
  },
  protectionOfRake:{
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    backgroundColor: '#e6e6e6',
    padding: theme.spacing(1),
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
        width: '100%',
        '& > span':{
            display: 'flex',
            flexWrap: 'wrap',
        }
    }
  },
  formation:{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#e6e6e6',
      padding: theme.spacing(1),
      borderRadius: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
          '& > *':{
              display: 'flex',
              flexWrap: 'wrap'
          }
      }
  },
  sick:{
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e6e6e6',
    padding: theme.spacing(1),
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
        '& > *':{
            display: 'flex',
            flexWrap: 'wrap'
        }
    }
    },
  pressure:{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#e6e6e6',
      padding: theme.spacing(1),
      borderRadius: '5px',
    //   flexWrap: 'wrap',
      '& > *': {
        //   display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        }
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
          '& > *':{
              display: 'flex',
              flexWrap: 'wrap'
          }
      }
  },
  boxGroup:{
      display: 'flex',
      flexDirection: 'column',
    //   backgroundColor:'red'
  },
  boxes: {
    [theme.breakpoints.up('md')]: {
        maxWidth:'25ch',
        margin: theme.spacing(1),
        // backgroundColor: 'red'
    },
      maxWidth:'15ch',
      margin: theme.spacing(1),
  },
  submit: {
    background: '#fbe8a6',
    maxWidth: '100px',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      background: '#f4976c'
    }
  },
  boxLabels: {
    //   fontSize: '1.1rem'
    fontWeight: 'bold'
  },
  innerLabels:{
    marginBottom: '0px'
  },
  trainNdeleteButton:{
    // backgroundColor: 'red',
  },
  deleteButton:{
    height: '100% ',
    border: '1px solid black',
    borderRadius: '5px'
  },
  }));

export default useStyles;