var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Para efectos de prueba definimos un diccionario de usuaros, posteriormente podemos susutituirlo con una conexion a BD
users={
	"Serch":{
		userName:"Serch",
		password: "Serch1234"
	},
	"OtroUser":{
		userName:"OtroUser",
		password: "xx223344"
	}
}
module.exports ={
	
	findOne:function(userObject,callback){ //userObject:{user}
		//console.log("QUIEREN USAR ESTE USUARIO " + userObject.userName );
		callback(users[userObject.userName]);
	}
	
}