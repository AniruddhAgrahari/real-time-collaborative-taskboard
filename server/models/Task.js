const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    columnId: {
        type: String,
        required: true,
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo'
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
