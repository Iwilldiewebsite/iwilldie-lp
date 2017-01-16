import cluster from 'cluster'
import http from 'http'
import expressConfig from './backend/express'

const appConfig = require('./backend/config/env/' + (process.env.NODE_ENV || 'development'));

if (cluster.isMaster) {
	let cpuCount = require('os').cpus().length;
	let i;

	for (i = 0; i <cpuCount; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log('worker %d died', worker.id);
		cluster.fork();
	});
} else {
	let app = expressConfig();
	let server = http.Server(app);

	server.listen(appConfig.server.port, () => {
		console.log(`Application is up and running at ${appConfig.server.host}${appConfig.server.port}`);
	});

	console.log('Worker %d running!', cluster.worker.id);

	global.config = appConfig;

	module.exports = app;
}