import React from 'react';
import { Modal, Paper, Container, Transition, Fade, Backdrop, makeStyles, Grow } from '@material-ui/core';
import CatDetails from './CatDetails';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow:'scroll',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

const CatDetailsModal = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Modal className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}>
            <Grow in={open} className={classes.paper}>
                <CatDetails {...props} ref={ref} />
            </Grow>
        </Modal>
        
        
    );
});

export default CatDetailsModal;