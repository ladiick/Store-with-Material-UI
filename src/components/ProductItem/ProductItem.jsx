import {useContext} from "react";
import {ContextItems} from "../Main/Main";
import {Card, CardActions, CardContent, CardMedia, Grid, Typography,Button} from "@mui/material";


function ProductItem({item,setAlertVisible}) {
	const {selectedItems, setSelectedItems} = useContext(ContextItems);

	const addItem = (product) => {
		let arrItems = [];

		if (localStorage.getItem("items")) {
			arrItems = JSON.parse(localStorage.getItem("items"));
			setSelectedItems(arrItems);
		}
		arrItems.push(product);
		setSelectedItems([...selectedItems, product]);
		localStorage.setItem("items", JSON.stringify(arrItems));
		setAlertVisible(true)
	};

	return (
		<Grid item xs={12} md={3} title={item.title} sx={{cursor: 'pointer'}}>
			<Card sx={{height: '100%',display: "flex",
				flexDirection: "column"}} >
				<CardMedia
					component={'img'}
					sx={{height: 350}} image={item.image} alt={item.title} title={item.title}/>
				<CardContent>
					<Typography variant={'h6'} component={'h3'}>{item.title}</Typography>
					<Typography variant={'body1'}>Описание: {item.description}</Typography>
					<Typography variant={'body1'}>Цена: {item.price}</Typography>
				</CardContent>

				<CardActions disableSpacing sx={{ mt: "auto" }}>
					<Button variant="outlined" onClick={() => addItem(item)}>
						В корзину
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default ProductItem;
