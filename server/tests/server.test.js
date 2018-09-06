var request = require('supertest')
var expect  = require('expect')

const {app} = require('../server.js')
const {Todo} = require('../models/todo')

const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should crete a new todo', (done) => {
        

        request(app)
        .post("/todos")
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err)
            }
          Todo.find().then((todos) => {
              expect(todos.length).toBe(2);
              expect(todos[0].text).toBe(text)
              done()
          }).catch((e) => done(e))
        })
    })
})

it('should not create todo with invalid body data', (done) => {
    request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err)
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0)
                done()
            }).catch((e) => done(e))
        })
})

