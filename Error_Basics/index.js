const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');


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
    throw new AppError('password required', 401);
    //res.send("PASSWORD NEEDED!")
    // throw new AppError('Password required!', 401);
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

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
})


app.use((req, res) => {
    res.status(404).send('NOT FOUND!');
})

// app.use((err, req, res, next) => {
//     console.log('*********************************');
//     console.log('************** ERROR ************');
//     console.log('*********************************');
//     res.status(500).send('WE HAVE AN ERROR!!!');
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Sorry something Went Wrong!' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('APP IS RUNNING FROM LOCALHOST:3000');
})