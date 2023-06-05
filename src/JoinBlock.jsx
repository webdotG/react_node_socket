import React, {useState} from "react";
import socket from "./socket/socket";
import axios from "axios";


function JoinBlock({onLogin}) {

		const [roomId, setRoomId] = useState('')
		const [userName, setUserName] = useState('')
		const [isLoading, setLoading] = useState(false)

		const onEnter = async () => {
				if (!roomId || !userName) {
						alert('поля не должны быть пустыми')
				}

				const roomidUsername = {
						roomId,
						userName,
				}

				setLoading(true)
				await axios.post('/rooms', roomidUsername)
				onLogin(roomidUsername)
		}

		return (
				<div className={'join-block'}>
						<input value={roomId}
									 onChange={event => setRoomId(event.target.value)}
									 type={"text"}
									 placeholder={'room id'}/>
						<input value={userName}
									 onChange={event => setUserName(event.target.value)}
									 type={"text"}
									 placeholder={'nick name'}/>
						<button
								disabled={isLoading}
								onClick={onEnter}
								className={'btn-success'}>
								{isLoading ? 'вход...' : 'войти'}
						</button>

				</div>
		)
}

export default JoinBlock
