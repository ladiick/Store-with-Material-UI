import React from 'react';
import {Alert, Snackbar} from "@mui/material";

const Snack = ({isOpen,handleClose,text,severity}) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top',
				horizontal: 'center', }}
			autoHideDuration={2000}
			open={isOpen}
			onClose={handleClose}>
			<Alert severity={severity}>{text}</Alert>
		</Snackbar>
	);
};

export default Snack;
