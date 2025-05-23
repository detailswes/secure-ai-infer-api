// test/inference.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const expect = chai.expect;

const jwtSecret = process.env.JWT_SECRET || 'test-secret-for-unit-tests';
const token = jwt.sign({ user: 'test-user' }, jwtSecret, { expiresIn: '1h' });

describe('Inference Endpoint', () => {
  it('should return reversed text', (done) => {
    chai.request(app)
      .post('/infer')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Hello' })
      .end((err, res) => {
        console.log('Response:', res.body);
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal('olleH');
        done();
      });
  });
});
