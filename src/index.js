require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const debug = require('debug')('node-server:index');
const util = require('util');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const appRoot = require('app-root-path');
const { ErrorHandler, handleError } = require('./util/error');
const appRouter = require('./router');
const morgan = require('morgan');
const winston = require('./util/winston.logger');
/// new commit
// main app
const app = express();

const PORT = process.env.PORT;

// mongoose
mongoose.connect(process.env.MONGO_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: Promise,
});

mongoose.connection.on('error', () => {
    throw new ErrorHandler(400, `Unable to connect to database: ${process.env.MONGO_HOST}`);
});

// print mongoose logs in dev env
if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

// Logger
app.use(morgan('combined', { stream: winston.stream }));

// security setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// 

app.use('/api/users', express.static(appRoot + '/public/users'));
app.use('/api/product', express.static(appRoot + '/public/product'));   
app.use('/public/product', express.static('public/product'))
app.use('/public/users', express.static('public/users'))

// route handler 
app.use('/api', appRouter);

// error handler
app.use((err, req, res, next) => {
    handleError(err, res);
}); 

// 
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
    console.log(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
    debug(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
});

module.exports = app;