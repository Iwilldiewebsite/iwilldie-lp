import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'
import session from 'express-session'
import expressStatusMonitor from 'express-status-monitor'

import indexRoutes from './routes'

module.exports = () => {
	const publicPath = path.join(__dirname, '../app');
	const modulePath = path.join(__dirname, '../node_modules');
	const distPath = path.join(__dirname, '../dist');

	const app = express();

	app.use(expressStatusMonitor());
	app.use(compression());
	app.use(morgan('dev'));
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(helmet())
	app.use(cors());
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
		next();
	});
	app.use(session({
		secret: 'SECRET_GOES_HERE',
		resave: true,
		saveUnitialized: false
	}));

	app.options('*', cors())

	app.use(express.static(publicPath));
	app.use(express.static(modulePath));
	app.use(express.static(distPath));

	app.use('/', indexRoutes);

	return app;
}