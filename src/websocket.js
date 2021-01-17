const http = require('http');
const websocket = require('websocket'); 
const websocketServer = websocket.server;

const httpServer = http.createServer();

const port = process.env.PORT || 6061;
httpServer.listen(port, () => console.log(`Listening at http://localhost:${port}`));

const wsServer = new websocketServer({
	'httpServer': httpServer,
});

wsServer.on('request', request => {
  //connect
  const connection = request.accept(null, request.origin);
	
  connection.on('open', () => console.log('opened!'));
  connection.on('close', () => console.log('closed!'));
  connection.on('message', message => {
    const result = JSON.parse(message.utf8Data);
		
		if (result.wsType.type === 'chat') {
			
			chatWebsocket(result);

    } else if (result.wsType.type === 'liveLoc') {
			
			liveLocWebsocket(result);

    }
		connection.send(JSON.stringify(result));
  });	
});

function chatWebsocket(result) {
	switch(result.wsType.method) {
  	case 'isOnline':
			console.log('i am online...');
    	break;
		case 'send':
			console.log(`Message is send : ${result.wsType.message}`);
			break;
  	case 'isTyping':
			console.log('i am typing...');
    	break;
		case 'isLeft':
			console.log('i am left');
    	break;
  	default:
    	// code block
			break;
	}	
}

function liveLocWebsocket(result) {
	switch(result.wsType.method) {
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

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + 
	t4() + S4() + S4()).toLowerCase();


