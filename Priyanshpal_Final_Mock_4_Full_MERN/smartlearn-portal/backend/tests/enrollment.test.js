const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/course');

describe('Enrollment API', () => {
  before(async () => {
    await Course.create({
      courseId: 'TEST101',
      title: 'Test Course',
      category: 'Testing',
      price: 100
    });
  });

  afterEach(async () => {
    await Enrollment.deleteMany({});
  });

  it('should enroll successfully and return 201', async () => {
    const res = await request(app)
      .post('/api/enroll')
      .send({ userId: 'user1', courseId: 'TEST101' });

    expect(res.status).to.equal(201);
    expect(res.body.success).to.be.true;
  });

  it('should return 400 for duplicate enrollment', async () => {
    await request(app)
      .post('/api/enroll')
      .send({ userId: 'user1', courseId: 'TEST101' });

    const res = await request(app)
      .post('/api/enroll')
      .send({ userId: 'user1', courseId: 'TEST101' });

    expect(res.status).to.equal(400);
  });
});