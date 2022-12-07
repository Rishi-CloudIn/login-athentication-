import './App.css';
import Register from './Components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Users from './Components/User_list';


function App ()
{
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/user_list" element={<Users />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

		</div>
	);
}

export default App;
