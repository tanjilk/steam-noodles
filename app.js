/*
// @author tanjilk
*/
// Argument
const argum = process.argv[2];


// If the argument doesnt pass

if(!argum){
	console.log('You need to pass the username as argument!');
}

else {
	const prompt = require("prompt");
	const SteamUser = require("steam-user");
	const readlineSync = require("readline-sync");


	const client = new SteamUser();

	console.log("\x1b[33m", "Please login with the credentials: ");
	console.log("\x1b[37m", " ");

	var password = readlineSync.question("Password: ", {
		hideEchoBack: true
	});

	const login = (username, password) => {
		const logOnOptions = {
			accountName: username,
			password: password
		}

		client.logOn(logOnOptions);
		client.on('error', function(e){
			console.log('Wrong password, please try again.');
		});
		
	}

	login(argum, password);

	client.on('loggedOn', () => {
		console.log("\x1b[32m","Login successful. ✔️");
		console.log("\x1b[37m", "Define your status: ");
		console.log('\x1b[36m%s\x1b[0m', "1. Online\n2. Offline");
		
		var status = readlineSync.question("Choose the status: ");
		if(status == "1"){
			client.setPersona(SteamUser.EPersonaState.Online);
			function wait(){
				console.log("Your profile was defined as: ONLINE")	
			}
			setTimeout(wait, 3000);
			
		} else if(status == "2"){
			client.setPersona(SteamUser.EPersonaState.Offline);
			function wait1(){
				console.log("Your profile was defined as: OFFLINE")
			}
			setTimeout(wait1, 3000);
		} else {
			function waiterr(){
				console.log("\x1b[31m", "An error happened. Please try again ❗")	
			}
			setTimeout(waiterr, 2000)
			
		}
		
		console.log("\x1b[37m", "Introduce the steam app ids to farm: ");
		console.log("\x1b[37m", "Example: 730, 440, 240, 218620")
		console.log("\x1b[33m", "Max: 25 jogos ⚠️")
		var games = readlineSync.question("Type the steam IDS: ");
		var array = games.split(',');
		games = [];
		for(i = 0; i < array.length; i++){
			var game = array[i]*1;
			games.push(game);
		}
		client.gamesPlayed(games);
		if(!games){
			console.log('No games was introduced... Skipping!')
		}
		console.log("Added games to farm: " + games);
		console.log("\x1b[32m", "Games added successful. ✔️")
		console.log("\x1b[32m", "Configurations defined with success. ✔️")
		
		console.log("\x1b[37m", "Would you like to autommatic response bot? [y/n]")
		var auto = readlineSync.question(": ");
		if(auto == "y"){
			console.log("Exemple: Hi, i am a bot and i do bot stuff :D")
			console.log("Exemplo: Im sleeping! Dont send messages to me :P")
			var choice = readlineSync.question("Write an autommatic response:  ");
			console.log("The bot will reply " + choice)
			function replySuc(){
				console.log("\x1b[32m", "Configurations defined ✔️")
				}
				client.on("friendMessage", function(steamID, message){
					console.log("\x1b[35m", "Message received from " + steamID + ": " + message);
					if(message){
						client.chatMessage(steamID, choice);
					}
				})
			setTimeout(replySuc, 3000);
		} else if(auto == "n"){
			console.log("Bot will be quiet.")
		} else{
			console.log("\x1b[31m", "An error happened❗");
		}

		client.on("friendMessage", function(steamID, message){
			console.log("\x1b[35m", "Message received from " + steamID + ": " + message);
		})
			
	})
}
