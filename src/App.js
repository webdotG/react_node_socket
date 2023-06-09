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
				console.log('передаю на сервер запрос ROOM:JOIN' )
				console.log('передаю на сервер roomId userName :', roomidUsername )
				socket.open()
				socket.emit('ROOM:JOIN', roomidUsername)
				console.log('ROOM:JOIN socket.emit ВЫПОЛНЕН' )
		}



		console.log('поверка на измененение стэйта :', state)

		useEffect(() => {
				socket.on('Room:Joined', (users) => {
						console.log('новый пользователь: ', users )
				})
		}, [])

window.socket = socket

		return (
				<div>
						{!state.isAuth && <JoinBlock onLogin = {onLogin} />}
				</div>
		);
}

export default App;
