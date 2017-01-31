/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;*/

var assert=require('assert');

var authMongo = {
    doLogin: function (db, username, password, cb) {
        var user = db.collection('users');
        user.find({ username: username, password: password }).toArray(function (err, users) {
            if (err) {
                console.log(err);
                cb(false, users);
            }
            else {

                console.log("found it");
            }


            cb(true, users);
        });



    },
    doMenu: function (db, Livello, cb) {
        var menu = db.collection('menu');
        menu.find({ livello: Livello }).toArray(function (err, Menu) {
            if (err) {
                Menu.err = err;
                console.log(err);
                cb(false, Menu);
            }
            else if (Menu) {
                console.log(Menu);
                cb(true, Menu);
            }
            else {
                Menu = { error: 'nessuna voce trovata' };
                cb(false, Menu);

            }
        });
    },

    doRichiesta: function (db, data, cb) {
        var req = db.collection('richiesta');
        var stato = data.status;
        stato = "opened";
        var idstato = 1;

        var richiesta = {
            "_id": data._id,
            "id": data.id,
            "username": data.username,
            "categoria": data.categoria,
            "createDate": data.createDate,
            "createData": data.createData,
            "messaggio": data.messaggio,
            "status": stato,
            "idstatus": idstato,
            "risposta": data.risposta
        };


        var newData = richiesta;
        newData.createDate = new Date().toLocaleString();
        var result = req.insert(newData);

        if (result == "writeError") {
            console.log("Errore");
            cb(false);
        }
        else {
            console.log("Ok");
        }
        cb(true);
    },


    getDatiTicket:
    function (db, user, cb) {
        var dati = db.collection('richiesta');
        dati.find({ username: user }).toArray(function (err, ric) {
            if (err) {
                console.log(err);
                cb(false, ric);
            }
            else {
                console.log("found it");
            }
            cb(true, ric);
        });
    },

    getDatiUser:
    function (db, username, cb) {
        var datiUser = db.collection('richiesta');
        datiUser.find({ username: { $exists: true } }).toArray(function (err, doc) {
            if (err) {
                console.log(err);
                cb(false, doc);
            }

            else {
                console.log("found it");
            }

            cb(true, doc);
            console.log(doc);

        });

    },

    updateStatus:
    function (db, object, cb) {

        var req = db.collection('richiesta');
       
        var stato = object.status;
        stato = "pending";

        var idstato = 2;
        var changeStatus = {
          //  "id":id,
            "status": stato,
            "idstatus": idstato,
            "risposta": object.risposta,

        };
        var newD = changeStatus;
        newD.datanuova = new Date().toLocaleString();

     
        var result = req.update({ status: "opened" },
            { $set: newD });
    
        if (result == "writeError") {
            console.log("Errore");
            cb(false);
        }
        else {
            console.log("Ok");
        }
        cb(true);

    },

    doRisposta:
    function (db, item, cb) {
        var req = db.collection('richiesta');

        var stato = item.status;
        stato = "closed";

        var idstato = 3;

        var modifica = {
          //  "id":id.risposta,
            "status": stato,
            "idstatus": idstato,
            "risposta": item.risposta,
            "dataRisposta": item.dataRisposta
        };

        var newData = modifica;
        newData.datanuova = new Date().toLocaleString();

        var result = req.update({ status: "pending" },
            { $set: newData });

      
        if (result == "writeError") {
            console.log("Errore");
            cb(false);
        }
        else {
            console.log("Ok");
        }
        cb(true);
    },


    /* getRispostaModal:
       function (db,_id, cb) {
           var datiUser = db.collection('richiesta');
           datiUser.find({ _id: { $exists: true }}).toArray(function (err, doc) {
               if (err) {
                   console.log(err);
                   cb(false, doc);
               }
   
               else {
                   console.log("found it");
               }
   
               cb(true, doc);
               console.log(doc);
   
           });
   
       }
    */


};

module.exports = authMongo;

























   /*  doLogin: function (username, password, cb) {
         var userSchema = new Schema({
             nome: String,
             cognome: String,
             username: String,
             password: String,
             skills: Array,
             description: String,
             role: Array,
             immagine: String,
             livello: Number
         });
 
 
 
         var user = mongoose.model('users', userSchema);
 
         user.find({ username: username, password: password }, function (err, users) {
             if (err) {
                 console.log(err);
                 cb(false, users);
             }
             else {
                 users.Risultato = err;
                 console.log(users);
                 cb(true, users);
             }
 
 
 
         });
 
 
 
     },
 
     doMenu: function (Livello, cb) {
         var menuSchema = new Schema({
             label: String,
             value: String,
             route: String,
             parent: String,
             livello: Number
         });
 
         var menu = mongoose.model('menu', menuSchema);
 
         menu.find({livello:1}, function (err, Menu) {
             if (err) {
                 Menu.error = err;
                 console.log(err);
                 cb(false, Menu);
             }
             else if(Menu){                 
                 console.log(Menu);
                 cb(true, Menu);
             }
             else {
                 Menu={error:'nessuna voce trovata'};
                 cb(false, Menu);
                
             }
         });
     }
 

}
module.exports = authMongo;







module.exports = function (app, config) {
    var userSchema = new Schema({
    nome:  String,
    cognome: String,
    username: String,
    password: String,
    skills: Array,
    description: String,
    role:Array,
    immagine:String
    });

    var user = mongoose.model('users', userSchema);

    user.find({username:'stefy', password:'1235'}, function(err, users){
        if(err){
            console.log(err);
        }
       console.log(users);
       
    });

   
}*/






















   /*  doLogin: function (username, password, cb) {
         var userSchema = new Schema({
             nome: String,
             cognome: String,
             username: String,
             password: String,
             skills: Array,
             description: String,
             role: Array,
             immagine: String,
             livello: Number
         });
 
 
 
         var user = mongoose.model('users', userSchema);
 
         user.find({ username: username, password: password }, function (err, users) {
             if (err) {
                 console.log(err);
                 cb(false, users);
             }
             else {
                 users.Risultato = err;
                 console.log(users);
                 cb(true, users);
             }
 
 
 
         });
 
 
 
     },
 
     doMenu: function (Livello, cb) {
         var menuSchema = new Schema({
             label: String,
             value: String,
             route: String,
             parent: String,
             livello: Number
         });
 
         var menu = mongoose.model('menu', menuSchema);
 
         menu.find({livello:1}, function (err, Menu) {
             if (err) {
                 Menu.error = err;
                 console.log(err);
                 cb(false, Menu);
             }
             else if(Menu){                 
                 console.log(Menu);
                 cb(true, Menu);
             }
             else {
                 Menu={error:'nessuna voce trovata'};
                 cb(false, Menu);
                
             }
         });
     }
 

}
module.exports = authMongo;







module.exports = function (app, config) {
    var userSchema = new Schema({
    nome:  String,
    cognome: String,
    username: String,
    password: String,
    skills: Array,
    description: String,
    role:Array,
    immagine:String
    });

    var user = mongoose.model('users', userSchema);

    user.find({username:'stefy', password:'1235'}, function(err, users){
        if(err){
            console.log(err);
        }
       console.log(users);
       
    });

   
}*/




