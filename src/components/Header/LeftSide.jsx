import React, {useRef, useState,useContext} from 'react';
import {
	Box,
	ClickAwayListener,
	Grow,
	IconButton,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Button,
	ListItemIcon
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ContextItems} from "../Main/Main";
const LeftSide = () => {
	const navigate = useNavigate();
	const [menuVisible, setMenuVisible] = useState(false);
	const refMenuButton = useRef();
	const {user} = useContext(ContextItems)
	const handleClose = (event) => {
		if (refMenuButton.current && refMenuButton.current.contains(event.target)) {
			return;
		}

		setMenuVisible(false);
	};

	const logout = () => {
		localStorage.clear()
		window.location.href = '/'
	}


	return (
		<Box sx={{flexGrow: 1}}>
			<IconButton color={'inherit'}
			            ref={refMenuButton}
			            onClick={() => setMenuVisible((pre) => !pre)}>
				<AccountCircleIcon/>
			</IconButton>
			<Popper open={menuVisible}
			        anchorEl={refMenuButton.current}
			        placement="bottom-start"
			        transition>
				{({TransitionProps, placement}) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom-start' ? 'left top' : 'left bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList>
									{localStorage.getItem('token') &&
									<MenuItem component={RouterLink} to={'/'}>Главная</MenuItem>}

									{user.is_staff && <MenuItem component={RouterLink} to={'/add-product'}>Добавить товар</MenuItem>}

									{localStorage.getItem('token') ?
										<MenuItem onClick={logout}>Выйти</MenuItem>
									:
										<MenuItem onClick={()=>navigate('/authorization')}>Войти</MenuItem>
									}



								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
};

export default LeftSide;
