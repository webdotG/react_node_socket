const express = require('express')
const cors = require('cors')
const {request, response} = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}})


app.use(express.json())

const rooms = new Map()

app.get('/rooms', (req, res) => {
		console.log('get query done')
		res.json(rooms)
		console.log(rooms)
})

app.post('/rooms', (req, res) => {
		console.log('получение с post', req.body)
		const {roomId, userName} = req.body
		if (!rooms.has(roomId)) {
				rooms.set(
						roomId,
						{
								users: [],
								messages: [],
						}
				)
		}
		res.json([...rooms.values()])
		//res.json([...rooms.keys()])
		//res.json(rooms)
		//res.send()
		console.log('app post done')
		console.log('json rooms list :', rooms)
})

io.on('connection', (socket) => {
		console.log('user connected socket id :', socket.id)
		socket.on('ROOM:JOIN', ({roomId, userName}) => {
				console.log(`пришёл сокет запрос ROOM:JOIN, с клиента получены дынные : ${roomId}  ${userName}`)
				const room = rooms.get(roomId)
				if (room) {
						socket.join(roomId, userName)
						console.log(`проверка на подключение и получение roomId = ${roomId}, userName = ${JSON.stringify(room)}`)
						rooms.in(roomId).in('users').socket(socket.id, userName)
				}
		});
})

app.use(cors())

const testData = {
		user: '',
		data: [
				{
						data: 'some data',
						data2: 'some data',
				},],
		time: '00:00'
}


server.listen(1111, (error) => {
		if (error) {
				throw Error(error)
		}
		console.log('server working')
})
