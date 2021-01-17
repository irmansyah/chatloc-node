const http = require('http');
const websocket = require('websocket'); 
const websocketServer = websocket.server;

const httpServer = http.createServer();

const port = process.env.PORT || 6061;
httpServer.listen(port, () => console.log(`Listening at http://localhost:${port}`));

const wsServer = new websocketServer({
	'httpServer': httpServer,
});

const chatWebsocketServer = wsServer.on('request', request => {
  //connect
  const connection = request.accept(null, request.origin);
  connection.on('open', () => console.log('opened!'));
  connection.on('close', () => console.log('closed!'));
  connection.on('message', message => {
    const result = JSON.parse(message.utf8Data);
		
		if (result.wsType.type === 'chat') {
			
			chatWebsocket(result.wsType.method);

    } else if (result.wsType.type === 'liveLoc') {
			
			liveLocWebsocket();

    }
  });
});

function chatWebsocket(method) {
	switch(method) {
  case 'isOnline':
		console.log('i am online...');
    break;
  case 'isTyping':
		console.log('i am typing...');
    break;
	case 'isLeft':
		console.log('i am left');
    break;
  default:
    // code block
	} 
}

function liveLocWebsocket(method) {
	switch(method) {
  	case 'location':
    	console.log('my location is...');
    	break;
  	//case 'isTyping':
    //	console.log('i am typing...');
    //	break;
  	//case 'isLeft':
    //	console.log('i am left');
    //	break;
  	default:
    	// code block
  }
}

