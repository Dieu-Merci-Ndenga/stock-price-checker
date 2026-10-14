const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(10000);

  test('Viewing one stock: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG')
      .end((err, res) => {
        assert.isNull(err);
        assert.property(res.body, 'stockData');
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        done();
      });
  });

  let likes;
  test('Viewing one stock and liking it: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG&like=true')
      .end((err, res) => {
        assert.isNull(err);
        assert.isAtLeast(res.body.stockData.likes, 1);
        likes = res.body.stockData.likes;
        done();
      });
  });

  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG&like=true')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.body.stockData.likes, likes);
        done();
      });
  });

  test('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG&stock=MSFT')
      .end((err, res) => {
        assert.isNull(err);
        assert.isArray(res.body.stockData);
        res.body.stockData.forEach((stockData) => {
          assert.property(stockData, 'stock');
          assert.property(stockData, 'price');
          assert.property(stockData, 'rel_likes');
        });
        done();
      });
  });

  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG&stock=MSFT&like=true')
      .end((err, res) => {
        assert.isNull(err);
        assert.isArray(res.body.stockData);
        done();
      });
  });
});