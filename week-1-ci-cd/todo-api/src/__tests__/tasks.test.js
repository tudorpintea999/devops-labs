const request = require('supertest');
const app = require('../app');

jest.mock('../db', () => ({
  query: jest.fn(),
  initDB: jest.fn()
}));
const db = require('../db');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /tasks', () => {

  test('returns 200 with list of tasks', async () => {
    db.query.mockResolvedValue({
      rows: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true }
      ]
    });

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.tasks).toHaveLength(2);        // ✅ Fixed: added 2
    expect(response.body.tasks[0].title).toBe('Task 1');
  });

  test('returns 500 when database fails', async () => {
    db.query.mockRejectedValue(new Error('DB connection lost'));

    const response = await request(app).get('/tasks');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to fetch tasks'); // ✅ Fixed: capital F
  });
});

describe('POST /tasks', () => {

  test('returns 400 if title is empty', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: '' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is required');  // ✅ Fixed: exact match
    expect(db.query).not.toHaveBeenCalled();                // ✅ Fixed: correct syntax
  });

  test('returns 400 if title is missing', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({});

    expect(response.status).toBe(400);
  });

  test('returns 201 with created task', async () => {
    db.query.mockResolvedValue({
      rows: [{ id: 1, title: 'Learn Jest', completed: false }]
    });

    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Learn Jest' });

    expect(response.status).toBe(201);
    expect(response.body.task.title).toBe('Learn Jest');
    expect(db.query).toHaveBeenCalledTimes(1);              // ✅ Called exactly once
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      ['Learn Jest']
    );
  });
});

describe('GET /health', () => {

  test('returns 200 when database is connected', async () => {
    db.query.mockResolvedValue({
      rows: [{ now: new Date() }]
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');      // ✅ Fixed: matches app.js
    expect(response.body.database).toBe('connected');  // ✅ Fixed: matches app.js
  });

  test('returns 503 when database is down', async () => {
    db.query.mockRejectedValue(new Error('Connection refused'));

    const response = await request(app).get('/health');

    expect(response.status).toBe(503);
    expect(response.body.status).toBe('unhealthy');    // ✅ Fixed: matches app.js
  });
});