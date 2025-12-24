module.exports = (io) => {
    const Task = require('../models/Task');
    const jwt = require('jsonwebtoken');

    // Socket.io authentication middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key-change-in-production'
            );
            socket.userId = decoded.userId;
            next();
        } catch (error) {
            next(new Error('Authentication error: Invalid token'));
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id, 'User:', socket.userId);

        // Broadcast user count on connection (count unique connections)
        const connectedSockets = io.sockets.sockets.size;
        io.emit('onlineUsers', connectedSockets);

        // Initial load - get tasks for this user only
        socket.on('getTasks', async () => {
            try {
                const tasks = await Task.find({ user: socket.userId }).sort({ order: 1 });
                socket.emit('tasks', tasks);
            } catch (err) {
                console.error(err);
                socket.emit('error', { message: 'Failed to fetch tasks' });
            }
        });

        // Create Task - associate with user
        socket.on('createTask', async (taskData) => {
            try {
                const newTask = await Task.create({
                    ...taskData,
                    user: socket.userId
                });
                // Only emit to this user's sockets
                io.to(socket.userId).emit('taskCreated', newTask);
                // Also emit to the sender
                socket.emit('taskCreated', newTask);
            } catch (err) {
                console.error(err);
                socket.emit('error', { message: 'Failed to create task' });
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
