var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
const {ObjectID} = require('mongodb')


var app = express()
// const port = process.env.PORT || 3000

app.use(bodyParser.json())


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    },
     (e) => {
         res.status(400).send(e)
     })
})

app.get('/todos', (req, res) => { 
    Todo.find()
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
    Todo.findById(id).then((doc) => {
        doc ? res.status(200).send(doc) : null
    }, (e) => {
        res.status(404).send()
    })

})



app.listen(port, () => {
    console.log('started on port ', port)
    // console.log(process.env.MONGOLAB_URI)
}).then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e)
    })
})


module.exports.app = app