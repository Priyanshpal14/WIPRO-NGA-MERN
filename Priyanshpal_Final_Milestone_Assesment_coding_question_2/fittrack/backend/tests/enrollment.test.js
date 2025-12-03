const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const Enrollment = require('../models/Enrollment');
const Program = require('../models/Program');

const expect = chai.expect;

describe('Enrollment API', () => {
  before(async () => {
    await Program.deleteMany({});
    await Program.create({
      programId: 'FTP001',
      name: 'Test Program',
      category: 'Strength Training',
      level: 'Beginner',
      price: 1999
    });
  });

  beforeEach(async () => {
    await Enrollment.deleteMany({});
  });

  it('should enroll successfully', async () => {
    const res = await request(app)
      .post('/api/enroll')
      .send({ userId: 'USR101', programId: 'FTP001' });
    
    expect(res.status).to.equal(201);
    expect(res.body.success).to.be.true;
  });

  it('should not allow duplicate enrollment', async () => {
    const enrollData = { userId: 'USR101', programId: 'FTP001' };
    
    await request(app)
      .post('/api/enroll')
      .send(enrollData);
    
    const res = await request(app)
      .post('/api/enroll')
      .send(enrollData);
    
    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
  });

  after(() => {
    process.exit(0);
  });
});