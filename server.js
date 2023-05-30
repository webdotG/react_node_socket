const express = require('express')
var cors = require('cors')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: '*'}})

app.use(cors())

const testData = {
		user: '',
		data : [
				{
						data: 'some data',
						data2: 'some data',
				},],
		time : '00:00'
}

const departmens = new Map ()

app.get('/test',  (request, response) => {
		console.log('get query done')
		response.json(testData)
		console.log(testData)
})

io.on('connection', (socket) =>{
		console.log('user connected socket id :', socket.id)
})

server.listen(1111, (error) => {
		if (error) {
				throw Error(error)
		}
		console.log('server working')
})
