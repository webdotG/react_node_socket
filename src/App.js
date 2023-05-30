import './App.css';
import React from "react";
import io from "socket.io-client"

const socket = io('http://localhost:1111')

function App() {
		return (
				<>
						<h1>websocket</h1>
				</>
		);
}

export default App;
