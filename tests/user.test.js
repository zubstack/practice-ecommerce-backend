import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { usersInDb } from './test_helper.js';
import supertest from 'supertest';
import app from '../app.js';

const api = supertest(app);

describe('when there is initially one user in db', () => {
  //   beforeEach(async () => {
  //     await User.deleteMany({});

  //     const passwordHash = await bcrypt.hash("sekret", 10);
  //     const user = new User({ username: "root", passwordHash });

  //     await user.save();
  //   });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
});
