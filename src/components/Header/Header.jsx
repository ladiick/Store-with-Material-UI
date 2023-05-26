import React from 'react';
import {
	AppBar,
	Toolbar,

} from "@mui/material";

import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

const Header = () => {

	return (
		<AppBar position='static'>
			<Toolbar>
				<LeftSide/>
				<RightSide/>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
