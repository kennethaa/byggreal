import express from 'express';
// import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import User from '../models/User';
import { log, logError } from '../utils/logger';
import router from './router';

const app = express();

app.set('port', process.env.PORT || 8080);

// Express middlewares
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Express middlewares in production
// if (process.env.NODE_ENV === 'production') {
//
// }

// Express middlewares in development
if (process.env.NODE_ENV === 'development') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../config/dev.config');
    const compiler = require('../config/compiler');

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        historyApiFallback: true,
        noInfo: false,
        quiet: false,
        lazy: false,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        reporter: null,
        serverSideRender: false
    }));

    app.use(webpackHotMiddleware(compiler));
}

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/byggreal');

// passport config
passport.use(User.createStrategy());

// Set /public as our static content dir
// app.use(express.static(path.join(process.cwd(), 'public')));
app.use(router);

// Finally, start the express server
app.listen(app.get('port'), (err) => {
    if (err) logError(err);
    log(`Express ${app.get('env')} server listening on ${app.get('port')}`);
});
