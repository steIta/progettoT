
module.exports = function (app, sql, db, config, dbMongo) {
    var auth = require('./auth');
    var authMongo = require('./users');

    app.get('/', function (req, res) {
        res.sendFile(global.dirClient + '/views/index.html');
    });

    app.get('/login', function (req, res) {
        res.sendFile(global.dirClient + '/views/login.html');
    });




    app.post('/login', function (request, response) {
        authMongo.doLogin(dbMongo, request.body.username, request.body.password, function (isOk, credentials) {
            if (isOk) {
                console.log('Authenticated!');
                //MEMORIZZA NELLA SESSIONE TUTTA LA VARIABILE CREDENTIALS                
                var sess = request.session;
                sess.username = request.body.username;
                sess.password = request.body.password;
                sess.credentials = credentials[0];
                sess.isLoggedIn = true;
                response.redirect('/');
            } else {
                response.redirect('/login?err=true?msg=' + credentials.Risultato);

            }
        });
    });


    //elimina la sessione dell'utente 
    app.get('/logout', function (request, response) {
        request.session.destroy();
        response.redirect('/');
    });


    app.get('/profile', function (req, res) {
        res.sendFile(global.dirClient + '/views/partials/profile.html');
    });

    app.post('/menu', function (req, res) {
        // res.json(req.session.user);
        authMongo.doMenu(dbMongo, req.body.Livello, function (isOk, menu) {
            if (isOk) {
                res.json(menu);
            }
            else {
                res.status(500).json(menu.error);
            }

        });

    });

    app.post('/form', function (req, res) {
        authMongo.doRichiesta(dbMongo, req.body, function (isOk, richiesta) {
            if (isOk) {
                res.json(richiesta);
            }
            else {
                res.status(500).json(richiesta.error);
            }

        });

    });


    app.post('/ticket', function (req, res) {
        authMongo.getDatiTicket(dbMongo, req.body.user, function (isOk, dati) {
            if (isOk) {
                res.json(dati);
            }
            else {
                res.status(500).json(dati.error);
            }

        });

    });




    app.get('/assistenza', function (req, res) {
        authMongo.getDatiUser(dbMongo, req.body.username, function (isOk, tabella) {
            if (isOk) {
                res.json(tabella);
            }
            else {
                res.status(500).json(tabella.error);
            }

        });

    });



    app.put('/risposta', function (req, res) {
        authMongo.updateStatus(dbMongo, req.body, function (isOk, update) {
            if (isOk) {
                res.json(update);
            }
            else {
                res.status(500).json(update.error);
            }

        });

    });



    app.post('/risposta', function (req, res) {
        authMongo.doRisposta(dbMongo, req.body, function (isOk, ris) {
            if (isOk) {
                res.json(ris);
            }
            else {
                res.status(500).json(ris.error);
            }

        });

    });

    /* app.get('/modal', function (req,res) {
           authMongo.getRispostaModal(dbMongo, req.body._id, function (isOk, modal) {
               if (isOk) {
                   res.json(modal);
               }
               else {
                   res.status(500).json(modal.error);
               }
   
           });
   
       });*/



    //ottengo il menu in funzione a livello utente
    /* app.post('/menu', function (request, response) {
         var connection = new sql.Connection(db, function (err) {
             if (err) console.log(err);
             var sqlRequest = new sql.Request(connection);            
                                 
                 sqlRequest.input('Livello', sql.Int, request.body.Livello);                     
 
                 // request.output('', sql.VarChar(50));
                 sqlRequest.execute('dbo.get_MENU', function (err, recordsets, returnValue) {  
                     // chiudo la connessione
                     connection.close();  
                     if(returnValue==0)            
                         response.json(recordsets[0]);      
                     else
                         response.status(500).json({error:err})          
                 });
             
             
         })
     });*/

};








  


    //ottengo il menu in funzione a livello utente
    /* app.post('/menu', function (request, response) {
         var connection = new sql.Connection(db, function (err) {
             if (err) console.log(err);
             var sqlRequest = new sql.Request(connection);            
                                 
                 sqlRequest.input('Livello', sql.Int, request.body.Livello);                     
 
                 // request.output('', sql.VarChar(50));
                 sqlRequest.execute('dbo.get_MENU', function (err, recordsets, returnValue) {  
                     // chiudo la connessione
                     connection.close();  
                     if(returnValue==0)            
                         response.json(recordsets[0]);      
                     else
                         response.status(500).json({error:err})          
                 });
             
             
         })
     });*/









