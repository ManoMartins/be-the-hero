const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to new Incident', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('authorization', 'e2443f41')
      .send({
        title: "Caso test",
        description: "detalhes do caso",
        value: 120
      })

      expect(response.body).toHaveProperty('id');
  })
})