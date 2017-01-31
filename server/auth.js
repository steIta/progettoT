
var auth = {
    
    checklogin: function (req, res, next) {
        var sess = req.session;
        if (sess.isLoggedIn === true || req.url.indexOf('/login') != -1) {
       next();
        } else {
            res.redirect('/login');
        }
    }
 /*   doLogin: function (username, password, cb) {
        var users=require('./users');
     
        console.log('Username', username);
        console.log('Password', password);

        var found = false;

        var foundCredentials = {};
       

        var credentials= [
            { nome: "Stefania", cognome: "Ditta", id: "1", username: "stefy", password: "1234", skills: "nodejs,angular, css3" },
            { nome: "Alberto", cognome: "Ziliotto", id: "2", username: "alby", password: "1234", skills: "angular,node,java,sql" }
        ];
        
  
      
        for (var item in credentials) {
            if (credentials[item].username == username && credentials[item].password == password) {
                found = true;
                foundCredentials = credentials[item];
                console.log(credentials[item]);

            }
        }

    cb(found, foundCredentials);


        /* var connection = new sql.Connection(db, function (err) {
              if (err) console.log(err);
              var sqlRequest = new sql.Request(connection);   
  
              sqlRequest.input('Username', sql.NVarChar(250), username);
              sqlRequest.input('Password', sql.NVarChar(250), password);            
  
              // request.output('', sql.VarChar(50));
              sqlRequest.execute('dbo.do_LOGIN', function (err, recordsets, returnValue) {
                  connection.close();
                  //console.log(recordsets);
                  if(returnValue==-1)
                     cb(false,recordsets[0][0]);
                  else{
                      //splitto la stringa Skills per averla in un array
                      recordsets[1][0].SkillsArray = recordsets[1][0].Skills.split(',')
                      cb(true,recordsets[1][0]);
                  }
              });
             
          });


    }*/
};

module.exports = auth;

