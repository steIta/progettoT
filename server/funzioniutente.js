module.exports = function (app, envConfig) {

var user=require('./users');

app.get('/session', function (req, res) {
        res.json(req.session);
    });


app.post('/account', function (req, res) { 
        res.json(req.session.credentials);
    });

app.post('/info', function (req, res) { 
        res.json(req.session.credentials);
    });



app.post('/risposta', function (req, res) { 
        res.json(req.ris);
    });





};

