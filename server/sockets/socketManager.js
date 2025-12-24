module.exports = (io) => {
    const Task = require('../models/Task');

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Broadcast user count on connection (count unique connections)
        const connectedSockets = io.sockets.sockets.size;
        io.emit('onlineUsers', connectedSockets);

        // Initial load
        socket.on('getTasks', async () => {
            try {
                const tasks = await Task.find().sort({ order: 1 });
                socket.emit('tasks', tasks);
            } catch (err) {
                console.error(err);
            }
        });

        // Create Task
        socket.on('createTask', async (taskData) => {
            try {
                const newTask = await Task.create(taskData);
                // Broadcast to all clients including sender
                io.emit('taskCreated', newTask);
            } catch (err) {
                console.error(err);
            }
        });

        // Update Task (Move, Edit)
        socket.on('updateTask', async (updatedTask) => {
            try {
                const task = await Task.findByIdAndUpdate(updatedTask._id, updatedTask, { new: true });
                io.emit('taskUpdated', task);
            } catch (err) {
                console.error(err);
            }
        });

        // Move logic might require re-ordering many tasks, handling simplisticly for now
        socket.on('moveTask', async ({ taskId, sourceColumn, destColumn, sourceIndex, destIndex }) => {
            try {
                console.log(`Moving task ${taskId} from ${sourceColumn} to ${destColumn}`);
                const task = await Task.findByIdAndUpdate(taskId, { columnId: destColumn }, { new: true });
                io.emit('taskMoved', { taskId, destColumn, destIndex });
            } catch (err) {
                console.error(err);
            }
        });

        // Delete Task
        socket.on('deleteTask', async (taskId) => {
            try {
                await Task.findByIdAndDelete(taskId);
                io.emit('taskDeleted', taskId);
            } catch (err) {
                console.error(err);
            }
        });

        socket.on('disconnect', (reason) => {
            console.log('Client disconnected:', socket.id, 'Reason:', reason);
            const connectedSockets = io.sockets.sockets.size;
            io.emit('onlineUsers', connectedSockets);
        });
    });
};
