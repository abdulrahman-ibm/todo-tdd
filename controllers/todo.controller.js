const TodoModel = require('../model/todo.model')

exports.createTodo = async (req, res, next) => {
    try {
        const createModel = await TodoModel.create(req.body)

        res.status(201).json(createModel)
    } catch (err) {
        next(err)
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({})

        res.status(200).json(allTodos)
    } catch (err) {
        next(err);
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        const foundTodo = await TodoModel.findById(req.params.todoId)
        if (foundTodo) {
            res.status(200).json(foundTodo)
        } else {
            res.status(404).send()
        }
    } catch (err) {
        next(err)
    }
}

exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            {
                new: true,
                useFindAndModify: false
            })
        
        if (updatedTodo) {
            res.status(200).json(updatedTodo)
        } else {
            res.status(404).send()
        }
    } catch (err) {
        next(err)
    }



}