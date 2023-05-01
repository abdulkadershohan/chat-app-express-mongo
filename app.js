const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');


// intarnal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const inboxRouter = require('./router/inboxRouter');
const usersRouter = require('./router/usersRouter');

const app = express();
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
    }).catch((err) => {
        console.log(err);
    });

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setview engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// routes
app.use("/", loginRouter);
app.use("/users", usersRouter)
app.use("/inbox", inboxRouter)

//404 handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
