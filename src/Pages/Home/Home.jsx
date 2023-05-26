import {useEffect, useState} from "react";
import ProductItem from "../../components/ProductItem/ProductItem";

import s from "./Home.module.scss";
import {HOST} from "../../components/actions/HOST";
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Skeleton,
	Input,
	TextField, Box, Stack, Divider, useMediaQuery
} from "@mui/material";
import Snack from "../../components/Snack/Snack";

function Home() {
	const [items, setItems] = useState([]);
	const [search, setsearch] = useState("");
	const [sort, setSort] = useState("");
	const matches = useMediaQuery('(max-width:900px)');

	const [category, setCategory] = useState("");

	const [listCategory, setListCategory] = useState([]);

	const [loading, setLoading] = useState(true);

	const [alertVisible, setAlertVisible] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getItem = async () => {
			const data = await fetch(`${HOST}/api/v1/product/`);
			const res = await data.json();
			setItems(res);
		};

		const getListCategories = async () => {
			const data = await fetch(`${HOST}/api/v1/category/`);
			const res = await data.json();

			setListCategory(res);
		};

		const getItemsCategory = async () => {
			const data = await fetch(`${HOST}/api/v1/product/${category}/category/`);
			const res = await data.json();

			setItems(res);
		};
		if (category) {
			getItemsCategory();
		}
		if (!category) {
			getItem();
		}

		getListCategories();
		setLoading(false);
	}, [category]);

	const sortItems = items?.sort((a, b) =>
		sort === "expensive"
			? b.price - a.price
			: sort === "cheap"
				? a.price - b.price
				: sort === "new"
					? b.id - a.id
					: sort === ""
						? a.id - b.id
						: ""
	);



	return (
		<>
			<Box sx={{mt: 2}}>
				<Stack direction="row"
				       justifyContent="space-between"
				       divider={!matches && <Divider orientation="vertical" flexItem/>}
				       sx={{mb: 2}}>
					<FormControl fullWidth sx={{maxWidth: 200}}>
						<InputLabel id={'selectCategory'}>
							Категория
						</InputLabel>

						<Select
							id={'selectCategory'}
							label={'Категории'}
							onChange={(e) => setCategory(e.target.value)}>
							<MenuItem value="">Все</MenuItem>
							{listCategory?.map((category) => (
								<MenuItem key={category.id} value={category.id}>
									{category.title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth sx={{maxWidth: 300}}>

						<TextField
							type="text"
							label="Поиск..."
							value={search}
							onChange={(e) => setsearch(e.target.value)}
						/>

					</FormControl>
					<FormControl fullWidth sx={{maxWidth: 200}}>
						<InputLabel id={'selectSort'}>
							Сортировать по:
						</InputLabel>
						<Select
							id={'selectSort'}
							label="Сортировать по:"
							onChange={(e) => setSort(e.target.value)}
						>
							<MenuItem value="">По умолчанию</MenuItem>
							<MenuItem value="new">Сначала новые</MenuItem>
							<MenuItem value="cheap">Сначала дешевые</MenuItem>
							<MenuItem value="expensive">Сначала дорогие</MenuItem>
						</Select>
					</FormControl>
				</Stack>
				<Grid container spacing={2} sx={{mb: 4}}>
					{loading ? (
						<Skeleton variant="rounded" width={210} height={118}/>
					) : (
						sortItems
							?.filter((item) =>
								item?.title?.toLowerCase().includes(search.toLowerCase())
							)
							?.map((item) => <ProductItem
								key={item.id}
								item={item}
								setAlertVisible={setAlertVisible}
							/>)
					)}
				</Grid>
			</Box>
			<Snack
				severity={'success'}
				text={'Товар добавлен в корзину!'}
				isOpen={alertVisible}
				handleClose={() => setAlertVisible(false)}/>
		</>
	);
}

export default Home;
