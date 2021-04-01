/*

Repository from https://github.com/tanjilk/steam-farm
// @author tanjilk
*/


// Argument
const argum = process.argv[2];
process.env.TZ = 'Europe/Portugal';
d = new Date();

console.log("███████╗████████╗███████╗ █████╗ ███╗   ███╗      ███████╗ █████╗ ██████╗ ███╗   ███╗");
console.log("██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗ ████║      ██╔════╝██╔══██╗██╔══██╗████╗ ████║");
console.log("███████╗   ██║   █████╗  ███████║██╔████╔██║█████╗█████╗  ███████║██████╔╝██╔████╔██║");
console.log("╚════██║   ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║╚════╝██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║");
console.log("███████║   ██║   ███████╗██║  ██║██║ ╚═╝ ██║      ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║");
console.log("╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝");
                                                                                     


// If the argument doesnt pass

if(!argum){
	console.log('É necessário passar o username como um argumento.');
}

else {
	const prompt = require("prompt");
	const SteamUser = require("steam-user");
	const readlineSync = require("readline-sync");

	

	const client = new SteamUser();

	console.log("\x1b[33m", "Por favor, faça login ao digitar os seus credenciais: ");
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
			console.log('Um erro aconteceu, por favor tente de novo.');
			console.log(d.toLocaleTimeString());
		});
		
	}

	login(argum, password);

	client.on('loggedOn', () => {
		console.log("\x1b[32m","Login feito com sucesso. ✔️");
		console.log("\x1b[37m", "Define o status");
		console.log('\x1b[36m%s\x1b[0m', "1. Online\n2. Offline");
		
		var status = readlineSync.question("Escolha o status: ");
		if(status == "1"){
			client.setPersona(SteamUser.EPersonaState.Online);
			function wait(){
				console.log("O seu perfil foi definido como ONLINE")	
			}
			setTimeout(wait, 3000);
			
		} else if(status == "2"){
			client.setPersona(SteamUser.EPersonaState.Offline);
			function wait1(){
				console.log("O seu perfil foi definido como OFFLINE")
			}
			setTimeout(wait1, 3000);
		} else {
			function waiterr(){
				console.log("\x1b[31m", "Um erro inesperado aconteceu. Tente outra vez. ❗");
				d.toLocaleTimeString();	
			}
			setTimeout(waiterr, 2000)
			
		}
		
		console.log("\x1b[37m", "Introduza os App ID dos jogos que gostaria de farmar");
		console.log("\x1b[37m", "Exemplo: 730, 440, 240")
		console.log("\x1b[33m", "Máximo: 25 jogos ⚠️")
		var games = readlineSync.question("Digite os IDs: ");
		var array = games.split(',');
		games = [];
		for(i = 0; i < array.length; i++){
			var game = array[i]*1;
			games.push(game);
		}
		client.gamesPlayed(games);
		if(!games){
			console.log('Não foi introduzido nenhum jogo')
		}
		console.log("Jogos que foram adicionados: " + games);
		console.log("\x1b[32m", "Jogos recebidos com sucesso. ✔️")
		console.log("\x1b[32m", "Configurações básicas efetuada com sucesso. ✔️")
		
		console.log("\x1b[37m", "Gostaria de querer uma resposta automática? [y/n]")
		var auto = readlineSync.question(": ");
		if(auto == "y"){
			console.log("Exemplo: Olá. sou um bot do steam noodles! :D")
			console.log("Exemplo: Olá. estou ocupado! Não fale comigo agora :D")
			var choice = readlineSync.question("Escreva uma frase que responde automáticamente se alguém mandar mensagem para ti: ")
			console.log("O bot irá responder " + choice)
			function replySuc(){
				console.log("\x1b[32m", "Configurado com sucesso ✔️")
				}
				client.on("friendMessage", function(steamID, message){
					console.log("\x1b[35m", "Mensagem recebida pelo " + steamID + ": " + message);
					if(message){
						client.chatMessage(steamID, choice);
					}
				})
			setTimeout(replySuc, 3000);
		} else if(auto == "n"){
			console.log("O bot vai ficar em silencio.")
			console.log("Aceitar automaticamente os pedidos de amizade?");
			var automatic_accept_requests = readlineSync.question(": ");
			if(automatic_accept_requests == "y"){
				client.on('friendRelationship', function(steamID, relationship){
					if(relationship == SteamUser.Steam.EFriendRelationship.RequestRecipient){
						client.addFriend(steamID);
						client.chatMessage("Succesfly Accepted!");
					};
				});
			}
			else {
				console.log("Ignorando os pedidos de amizade");
			}
		} else{
			console.log("\x1b[31m", "Um erro inesperado aconteceu. Tente outra vez. ❗");
			console.log(d.toLocaleTimeString());

		}

		client.on("friendMessage", function(steamID, message){
			console.log("\x1b[35m", "Mensagem recebida pelo " + steamID + ": " + message);
		})
			
	})
}
