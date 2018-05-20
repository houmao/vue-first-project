/**
 * @description:
 * @author: yitian.mao<yitian.mao@hand-china.com>
 * @date: 2018/4/9
 */
const express = require('express');
const config = require('./config/index');

const port = process.env.PORT || config.dev.port;

const app = express();
const router = express.Router();

router.get('/', function (req, res, next) {
    req.url = 'index.html';
    next();
});

app.use(router);

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

app.get('/api/seller', (req, res) => {
    res.json({
        errno: 0,
        data: seller
    })
});
app.get('/api/goods', (req, res) => {
    res.json({
        errno: 0,
        data: goods
    })
});
app.get('/api/ratings', (req, res) => {
    res.json({
        errno: 0,
        data: ratings
    })
});

app.use('/api', router);
app.use(express.static('./dist'));
module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
})
