const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { userOneId, userOne, setupDataBase, closeDataBase, taskThree} = require('./fixtures/db');

//links.mead.io/extratests

beforeEach(setupDataBase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);

});

test('Should get correct user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toBe(2);
});

test('Should not delete task from another user', async () => {
   await request(app)
            .delete(`/tasks(${taskThree._id}`)
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(404)
    const task = await Task.findById(taskThree._id);
    expect(task).not.toBeNull();
});

afterAll(closeDataBase);
