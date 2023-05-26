import React, {useContext, useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, Stack, Typography, useMediaQuery} from "@mui/material";
import {HOST} from "../../../components/actions/HOST";
import {ContextItems} from "../../../components/Main/Main";
import Snack from "../../../components/Snack/Snack";

const PlaceOrder = ({submitArray, arrItems}) => {
	const {selectedItems} = useContext(ContextItems);
	const [alertVisible, setAlertVisible] = useState(false);
	const matches = useMediaQuery('(max-width:900px)');
	const onSubmit = async () => {
		try {
			await fetch(`${HOST}/api/v1/order/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: submitArray,
				}),
			});
			setAlertVisible(true)
		} catch (err) {
			alert("Произошла ошибка");
		}
	};

	return (
		<>
			<Box sx={!matches ? {width: 500} :
				{
					width: '100%',
					borderTop: '1px solid',
					borderColor: 'divider',
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0
				}
			}>
				<Card>
					<CardContent>
						<Typography variant={'h5'} component={'h2'} sx={{mb: 4}}>Сумма заказа</Typography>
						<Stack direction={'row'} justifyContent={'space-between'}>
							<Typography variant={'body1'} sx={{mb: 2}}>
								{arrItems.reduce((acc, next) => {
									return (acc += next.count);
								}, 0)} товаров на сумму
							</Typography>
							<Typography>
								{selectedItems.reduce((acc, next) => {
									return (acc += next.price);
								}, 0)} Руб.
							</Typography>
						</Stack>
						<Stack direction={'row'} justifyContent={'space-between'}>
							<Typography component={'h3'} variant={'h5'}>
								Итого:
							</Typography>
							<Typography component={'h3'} variant={'h5'}>
								{selectedItems.reduce((acc, next) => {
									return (acc += next.price);
								}, 0)} Руб.
							</Typography>
						</Stack>
					</CardContent>
					<CardActions>
						<Button onClick={onSubmit} fullWidth variant={'contained'}>
							Оформить
						</Button>
					</CardActions>
				</Card>
			</Box>
			<Snack
				isOpen={alertVisible}
				handleClose={() => setAlertVisible(false)}
				severity={'success'}
				text={'Заказ сформирован'}
			></Snack>
		</>
	);
};

export default PlaceOrder;
