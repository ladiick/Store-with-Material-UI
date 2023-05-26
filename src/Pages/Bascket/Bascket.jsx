import {useNavigate} from "react-router-dom";
import {ContextItems} from "../../components/Main/Main";
import {useCallback, useContext, useMemo, useState} from "react";
import BascketItem from "./BascketItem/BascketItem";
import {HOST} from "../../components/actions/HOST";
import {
	Box,
	Card,
	Grid,
	IconButton,
	Stack,
	Typography,
	Button,
	CardContent,
	CardActions,
	useMediaQuery
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import BasketEmpty from "./BasketEmpty/BasketEmpty";
function Bascket() {
	const navigate = useNavigate();
	const {selectedItems, setSelectedItems} = useContext(ContextItems);
	const matches = useMediaQuery('(max-width:900px)');

	const [submitArray, setSubmitArray] = useState([]);


	const arrItems = useMemo(() => {
		// let array = JSON.parse(localStorage.getItem("items"));
		let newArray = [];
		let arraySubmit = [];
		let tmpArray = [];

		const uniqueItems = selectedItems?.filter((item) => {
			if (tmpArray.indexOf(item.id) === -1) {
				tmpArray.push(item.id);
				return true;
			}
			return false;
		});

		for (let index = 0; index < uniqueItems?.length; index++) {
			let count = 0;
			for (let indexJ = 0; indexJ < selectedItems.length; indexJ++) {
				if (uniqueItems[index].id === selectedItems[indexJ].id) {
					count += 1;
				}
			}
			newArray.push({
				item: uniqueItems[index],
				count: count,
			});
			arraySubmit.push({id: uniqueItems[index].id, count});
			count = 0;
		}

		setSubmitArray(arraySubmit.sort((a, b) => a.id - b.id));

		return newArray

	}, [localStorage.getItem("items")]);


	const productPlus = useCallback((obj) => {
		const tmpArray = JSON.parse(localStorage.getItem("items"));
		setSelectedItems([...selectedItems, obj.item]);
		localStorage.setItem("items", JSON.stringify([...tmpArray, obj.item]));
	}, [selectedItems, setSelectedItems, arrItems])

	const productMinus = useCallback((obj) => {
		const tmpArray = JSON.parse(localStorage.getItem("items"));
		for (let i = 0; i < tmpArray.length; i++) {
			if(tmpArray[i].id === obj.item.id){
				tmpArray.splice(i,1)
				break
			}
		}
		setSelectedItems(tmpArray);
		localStorage.setItem("items", JSON.stringify(tmpArray));

	}, [arrItems])



	return (
		<Stack sx={!matches ? {mt: 2}: {height:'100vh'}}>
			<Stack direction={'row'} alignItems={'center'}>
				<IconButton onClick={() => navigate("/")} color={'inherit'}>
					<KeyboardBackspaceIcon/>
				</IconButton>
				<Typography sx={{ml: 1}} variant={'h5'} component={'h2'}>Корзина</Typography>
			</Stack>
			{
				arrItems.length !== 0 ?
				<Stack direction={{xs: 'column', md: 'row'}} sx={{mt: 2}} spacing={2}>
				<Grid container spacing={2} sx={{mb: 2}}>
					{arrItems?.map((item) => (
						<BascketItem
							productPlus={productPlus}
							productMinus={productMinus}
							key={item.item.id}
							item={item}/>
					))}
				</Grid>
				<PlaceOrder submitArray={submitArray} arrItems={arrItems}/>
			</Stack>
			:
					<BasketEmpty/>
			}
		</Stack>
	);
}

export default Bascket;
