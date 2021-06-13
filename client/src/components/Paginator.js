import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paginator: {
		display: "flex",
		justifyContent: "center",
	    padding: "10px",
        paddingTop: "20px"
	}
}));

const Paginator = props => {
	const classes = useStyles();

	return (
        <Container>
		<Pagination
			count={props.pages}
			page={props.page}
			onChange={props.handlePageChange}
			defaultPage={1}
			color="primary"
     		size="large"
            variant="outlined"
			showFirstButton
			showLastButton
			className={classes.paginator}
		/>
        </Container>

    );
};

export default Paginator;