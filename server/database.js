module.exports = function (app, sql, config) {

app.get('/menu', function (req, res) {

    //ESEGUI LA PROCEDURA GET_MENU PER OTTENERE I DATI RELATIVI ALLE VOCI DI MENU ABILITATE PER IL MIO LIVELLO UTENTE PRESENTE IN REQ.SESSION.CREDENTIALS 

    /*
    // connect 
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // Request 
        req = new sql.Request();

        req.input('Username', sql.Int, 250);
        req.input('Password', sql.Int, 250);
        req.output('');

        // request.output('', sql.VarChar(50));
        req.execute('dbo.do_LOGIN', function (err, recordsets, returnValue) {
            console.dir(recordsets);
        });
        // query 
        req.query('select * from dbo.AN_Utenti', function (err, recordset) {

            if (err) console.log(err)

            // respond
            res.send(recordset);


        });
    });
    */
});


};

