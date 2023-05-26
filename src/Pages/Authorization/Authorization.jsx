import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {HOST} from "../../components/actions/HOST";
import {Avatar, Box, Container, FormControl, TextField, Typography, Button, ButtonGroup} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Authorization = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorAuth, setErrorAuth] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault()
		const token = await fetch(`${HOST}/auth/token/login/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		if (!token.ok) {
			setErrorAuth("Неверный логин или пароль");
		} else {
			const auth_token = await token.json();
			localStorage.setItem("token", auth_token.auth_token);
			window.location.href = "/";
		}
	};

	return (
		<Container component={'main'} maxWidth={'xs'}>
			<Box sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
				<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography variant={'h5'} component={'h1'} align="center">
					Войти
				</Typography>
				<Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
					<TextField
						required
						fullWidth
						error={!!errorAuth}
						helperText={!!errorAuth && 'Неверный логин или пароль'}
						type="text"
						label={'Почта'}
						sx={{mb:2}}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						required
						fullWidth
						error={!!errorAuth}
						type="password"
						label="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						type="submit"
						fullWidth
						variant={'contained'}
						sx={{mb:2,mt:2}}>Войти</Button>
					<Button
						fullWidth
						variant={'contained'}
						onClick={() => navigate("/registration")}>
						Зарегистрироваться
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Authorization;
