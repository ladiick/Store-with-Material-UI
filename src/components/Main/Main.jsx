import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import s from "./Main.module.scss";
import {SlBasket} from "react-icons/sl";
import {createContext, useState, useMemo, useEffect} from "react";
import {HOST} from "../../components/actions/HOST";
import Header from "../Header/Header";
import {Box, Container, createTheme, ThemeProvider, useMediaQuery} from "@mui/material";

export const ContextItems = createContext("");

function Main() {

	const [user, setUser] = useState({});
	const [selectedItems, setSelectedItems] = useState(
		JSON.parse(localStorage.getItem("items")) || []
	);
	const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	);


	useEffect(() => {
		const getUser = async () => {
			const data = await fetch(`${HOST}/api/v1/auth/users/me/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("token")}`,
				},
			});
			const res = await data.json();
			setUser(res);
		};

		getUser();
	}, []);

	return (
		<ContextItems.Provider value={{user, selectedItems, setSelectedItems,colorMode}}>
			<ThemeProvider theme={theme}>
				<Box>
					<Header/>
					<Container>
						<Outlet/>
					</Container>
				</Box>
			</ThemeProvider>
		</ContextItems.Provider>
	);
}

export default Main;
