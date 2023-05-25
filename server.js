const express = require('express')

const app = express();

app.get('/test', function (request, response){
		console.log('get query done')
		response.send('ответ получен')
})

app.listen(2525)
