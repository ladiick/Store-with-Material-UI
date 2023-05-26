import './App.css';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import Main from './components/Main/Main';
import Home from './Pages/Home/Home';
import Bascket from './Pages/Bascket/Bascket';
import Authorization from './Pages/Authorization/Authorization';
import Registration from './Pages/Registration/Registration';
import AddProduct from './Pages/AddProduct/AddProduct';


const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={<Main/>}>
			<Route index element={<Home/>}/>
			<Route path='/bascket' element={<Bascket/>}/>
			<Route path='/add-product' element={<AddProduct/>}/>
		</Route>
		<Route path='/authorization' element={<Authorization/>}/>
		<Route path='/registration' element={<Registration/>}/>
	</>
))


function App() {

	return (
			<RouterProvider router={router}/>

	);
}

export default App;
