const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');
//require('./websocket');

const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
	origin: 'http://localhost:3000',
}));

app.get('/hello', (req, res) => {
	res.json({
		message: 'Hello World'
	});
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 6060;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

require('./websocket');
