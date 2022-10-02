const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String , require: true },
    info: { type: String , require: true },
    check: { type: Boolean },
    date: { type: Date }
});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;