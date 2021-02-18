import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{
            width: '32px',
            // display: 'none !important'
        }
    },
    deleteButt: {
        color: 'black',
        // border: '1px solid black',
        '& :hover': {
            color: 'red',
        },
        [theme.breakpoints.down('sm')]:{
            padding:'0px',
        }
    }
}))

const DeleteButton = (props) => {
    const classes = useStyles();
    const {collection, itemID, changeCollectionSate, token} = props;
    const 
    [open, setOpen] = React.useState(false),

    handleOpen = (evt) => {
        evt.stopPropagation();
        setOpen(true);
    },

    handleClose = () => {
        setOpen(false);
    },
    handleDelete = async (evt)=> {
        evt.stopPropagation();
        //find that train and delete from state array
        const newArray = []
        collection.map(item=> {
            if(item._id !== itemID)   return newArray.push(item) ;

        })
        console.log(newArray)
        changeCollectionSate(newArray)
        await axios
        .delete(`/api/log/train/${itemID}`,{ headers: { "x-auth-token": token}})
        .then(response=> {
          console.log(response)
        })
        .catch(error=> {
          console.log(error)
        })
        console.log(collection)
        console.log(itemID)
    };

    return (
        <div className={classes.root}>
            <Button onClick={evt=> handleOpen(evt)} className={classes.deleteButt}>
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Are You Sure?
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Permenantly Delete This Entry.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant="outlined" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={(evt)=> {
                        handleDelete(evt)
                        handleClose()
                    }}
                    color="secondary"
                >
                    Delete!
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteButton
