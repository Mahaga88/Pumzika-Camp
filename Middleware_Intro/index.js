const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    //res.send("PASSWORD NEEDED!")
    res.status(401)
    // throw new AppError(401, 'Password required!');
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE');
})


app.get('/error', (req, res) => {
    chicken.fly();
})
app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('WOOF WOOF');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Sometimes I wear headphones in public, so that I do not have to talk to anyone');
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!');
})

app.use((err, req, res, next) => {
    console.log('*********************************');
    console.log('************** ERROR ************');
    console.log('*********************************');
    res.status(500).send('WE HAVE AN ERROR!!!');
})

app.listen(3000, () => {
    console.log('APP IS RUNNING FROM LOCALHOST:3000');
})