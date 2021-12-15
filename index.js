#!/usr/bin/env node

const cc = require('node-console-colors');
const fs = require('fs');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();

fs.readFile('./config.json', 'utf8', function(err, contents) {
	var config = JSON.parse(contents);
	ssh.connect({
		host: config.remote_server.host,
		username: config.remote_server.username,
		password: atob(config.remote_server.password),
		port: config.remote_server.port || 22
		
	}).then(function() {
		console.log(cc.set('fg_green', 'Im in!'));
		const today = new Date();
		config.games.forEach(function(game, index) {
			console.log(cc.set('fg_green', 'Saving '+ "'"+game.name+"'"));
			
			ssh.putDirectory(decodeFolder(game.folder), config.remote_server.remote_folder + game.name+ '_' + today.toISOString() + '/', {
				recursive:true,
			}).then(function() {
				if (index == config.games.length - 1) { // Last save
					console.log(cc.set('fg_green', 'All Done'));
					ssh.dispose();
				}
			})
		});
	});
});

function decodeFolder(folder) {
	var variables = folder.match(/%\w+%/g); // search words encapsulated by % character
	
	if (variables != null) {
		// Run each word and replace with appropriate environment variable 
		variables.forEach(function(variable) {
			folder = folder.replace(variable, process.env[variable.replace(/%/g, '')]);
		});
	}
	
	return folder;
}

