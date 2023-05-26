import React, {useContext, useMemo} from 'react';
import {Badge, Box, Button, IconButton} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {ContextItems} from "../Main/Main";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const RightSide = () => {
	const {selectedItems, setSelectedItems,colorMode} = useContext(ContextItems)

	const lengthItems = useMemo(() => {
		// let arrItems = JSON.parse(selectedItems);

		let tmpArray = [];
		const uniqueItems = selectedItems?.filter((item) => {
			if (tmpArray.indexOf(item.id) === -1) {
				tmpArray.push(item.id);
				return true;
			}
			return false;
		});

		return uniqueItems?.length;
	}, [selectedItems]);

	return (
		<Box>
			{!localStorage.getItem('token') &&
				<Button
					component={RouterLink} to={'/authorization'}
					color={'inherit'} variant={'outlined'} sx={{mr: 2}}>
					Login
				</Button>
			}
			<IconButton sx={{mr:2}} onClick={colorMode.toggleColorMode} color={'inherit'}>
				<DarkModeIcon/>
			</IconButton>
			<IconButton component={RouterLink} to={'/bascket'} color={'inherit'}>
				<Badge badgeContent={lengthItems} color="secondary">
					<ShoppingBasketIcon/>
				</Badge>
			</IconButton>
		</Box>
	);
};

export default RightSide;
