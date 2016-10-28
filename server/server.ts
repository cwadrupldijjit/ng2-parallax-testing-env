import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as chalk from 'chalk';

const port = 8888;
const pathToPublic = __dirname + '/../dist/';
let app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	console.log(chalk.green.bold(`"${req.method}"`), chalk.magenta(req.originalUrl));
	
	if (req.method == 'GET' || req.baseUrl.match(/\.[a-z]+$/i)) {
		let filePath = __dirname;
		
		if (req.originalUrl.indexOf('/node_modules') !== -1)
			filePath += '/..' + req.originalUrl;
		
		/* tslint:disable */
		else 
		/* tslint:enable */
		if (req.originalUrl.indexOf('/bower_components') !== -1)
			filePath += '/..' + req.originalUrl;
		
		/* tslint:disable */
		else 
		/* tslint:enable */
			filePath += '/../dist' + req.originalUrl;
		
		try {
			fs.accessSync(filePath, (<any> fs).F_OK);
			console.log(chalk.bold.cyan(filePath + '\n'));
		} catch (e) {
			console.log(chalk.bold.red('Error! Could not find file at path', req.originalUrl));
			console.log(chalk.bold.red('Tried to pull from ', filePath), '\n');
			
			return res.status(404);
		}
	}
	
	next();
});

app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/*', express.static(pathToPublic));

// app.use('/system.config.js', (req, res) => { res.sendFile('system.config.js', {root: pathToPublic}) });
app.all(/^\/$/, (req, res) => {
    res.sendFile('index.html', {root: pathToPublic});
});

app.listen(port, () => {
    console.log('Server running and listening on port %s', port);
});