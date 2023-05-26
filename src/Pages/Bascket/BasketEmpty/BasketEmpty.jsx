import React from 'react';
import {Link, Stack, Typography,Avatar} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link as RouterLink} from "react-router-dom";

const BasketEmpty = () => {
	return (
		<Stack
			sx={{mt: 2}}
			direction={'column'}
			justifyContent={'center'}
			alignItems={'center'}>
			<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
				<ShoppingBasketIcon fontSize={'large'}/>
			</Avatar>
			<Typography variant={'h5'} component={'h1'} sx={{mt: 2}}>
				Ваша корзина пуста
			</Typography>
			<Link component={RouterLink} to={'/'}>Перейти к покупкам</Link>
		</Stack>
	);
};

export default BasketEmpty;
