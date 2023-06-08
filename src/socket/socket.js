import io from "socket.io-client"

const socket = io( "http://localhost:1234", {autoConnect: false});

socket.on('ROOM:JOINED', (users) => {
		console.log('прыщавый пользователь :', users)
})

export default socket
