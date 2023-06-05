import './App.css';
import React, {useEffect, useReducer} from "react";
import JoinBlock from "./JoinBlock";
import reducer from "./reducer";
import socket from "./socket/socket";

function App() {

		const [state, dispatch] = useReducer(reducer, {
				joined: false,
				roomId: null,
				userName: null,
		});

		const onLogin = (roomidUsername) => {
				dispatch({
						type: 'JOINED',
						payload: roomidUsername
				})
				console.log('передаю на сервер roomId userName :' + roomidUsername )
				socket.emit('ROOM:JOIN', roomidUsername)
		}

		useEffect(() => {
				socket.on('Room:Joined', (users) => {
						console.log('новый пользователь: ', users )
				})
		}, [])


		return (
				<div>
						{!state.isAuth && <JoinBlock onLogin = {onLogin} />}
				</div>
		);
}

export default App;
