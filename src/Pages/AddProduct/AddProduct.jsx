import React, {useEffect, useState} from "react";
import s from "./AddProduct.module.scss";

import {HOST} from "../../components/actions/HOST";
import {useNavigate} from "react-router-dom";
import {
	InputLabel,
	TextareaAutosize,
	TextField,
	Button,
	FormControl,
	Select,
	Box,
	MenuItem,
	FormGroup, Stack, Divider
} from "@mui/material";


const styleBoxAbsolute = {
	border: '1px solid',
	borderColor: 'divider',
	padding: 2,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)',
	width: 500
}

const AddProduct = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState();
	const [category, setCategory] = useState(1);

	const [listCategory, setListCategory] = useState([]);

	const navigate = useNavigate();


	if (!localStorage.getItem("token")) {
		navigate("/authorization");
	}

	useEffect(() => {
		const getListCategories = async () => {
			const data = await fetch(`${HOST}/api/v1/category/`);
			const res = await data.json();

			setListCategory(res);
		};
		getListCategories();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("image", image);
		formData.append("title", title);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("category", category);

		try {
			await fetch(`${HOST}/api/v1/product/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
					// "Content-Type": "multipart/form-data",
					// "Content-Type": "application/json",
					// "Content-Type": "multipart/form-data",
				},
				body: formData,
			});

			navigate("/");
		} catch (err) {
			alert("Возникла ошибка");
		}
	};

	return (
		<Box sx={{mt: 2, width: '100%', height: 'calc(100vh - 100px)',position:'relative'}}>
			<FormGroup onSubmit={onSubmit}>
				<Stack
					sx={styleBoxAbsolute}
					divider={<Divider orientation="horizontal"/>}
					spacing={2}
					direction={'column'}
					alignContent={'space-between'}>
					<FormControl>
						<TextField
							required
							label={"Название товара"}
							id={'inputName'}
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<TextField
							required
							label={'Описание:'}
							id={'inputDescription'}
							multiline
							maxRows={8}
							minRows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<TextField
							required
							label={'Цена:'}
							id={"inputPrice"}
							value={price}
							onChange={(e) => setPrice(e.target.value)}/>
					</FormControl>
					<FormControl>
						<Button
							component="label"
							variant="outlined"
						>
							<input
								required
								hidden
								type="file"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							Загрузить фотографию
						</Button>
					</FormControl>
					<FormControl>
						<InputLabel id={'inputCategory'}>
							Категория:
						</InputLabel>
						<Select
							required
							id={'inputCategory'}
							label={'Категория:'}
							onChange={(e) => setCategory(e.target.value)}
						>
							{listCategory?.map((category) => (
								<MenuItem key={category.id} value={category.id}>
									{category.title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button variant={'contained'}>Добавить</Button>
				</Stack>
			</FormGroup>
		</Box>
	);
};

export default AddProduct;
