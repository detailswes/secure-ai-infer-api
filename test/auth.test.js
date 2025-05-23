//test/auth.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth Middleware', () => {
  it('should fail without token', (done) => {
    chai.request(app)
      .post('/infer')
      .send({ text: 'Hello' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal('Missing token');
        done();
      });
  });
});
