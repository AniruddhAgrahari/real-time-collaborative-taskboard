import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { socket } from '../services/socket';
import './Board.css';

const INITIAL_COLUMNS = {
    todo: { title: 'To Do', items: [] },
    inprogress: { title: 'In Progress', items: [] },
    done: { title: 'Done', items: [] },
};

const Board = () => {
    const [columns, setColumns] = useState(INITIAL_COLUMNS);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        // Initial fetch
        socket.emit('getTasks');

        // Listeners
        socket.on('tasks', (tasks) => {
            const newColumns = { ...INITIAL_COLUMNS };
            // Reset items to avoid duplication on re-fetch or re-connect issues
            // though typically we'd merge. For MVP, simple reset.
            Object.keys(newColumns).forEach(key => newColumns[key].items = []);

            tasks.forEach(task => {
                if (newColumns[task.columnId]) {
                    newColumns[task.columnId].items.push(task);
                }
            });
            // Sort by order if implemented, currently relying on array order
            setColumns({ ...newColumns });
        });

        socket.on('taskCreated', (task) => {
            setColumns(prev => {
                const column = prev[task.columnId];
                return {
                    ...prev,
                    [task.columnId]: {
                        ...column,
                        items: [...column.items, task]
                    }
                };
            });
        });

        socket.on('taskMoved', ({ taskId, destColumn, destIndex }) => {
            // This is tricky without full state sync. 
            // Best approach for MVP: Request full Refresh or perform local operation if possible.
            // To keep it simple and correct: Refetch all tasks.
            socket.emit('getTasks');
        });

        socket.on('taskDeleted', (taskId) => {
            setColumns(prev => {
                const newColumns = { ...prev };
                for (const colId in newColumns) {
                    newColumns[colId].items = newColumns[colId].items.filter(t => t._id !== taskId);
                }
                return newColumns;
            });
        });

        return () => {
            socket.off('tasks');
            socket.off('taskCreated');
            socket.off('taskMoved');
            socket.off('taskDeleted');
        };
    }, []);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Optimistic UI Update
        const sourceCol = columns[source.droppableId];
        const destCol = columns[destination.droppableId];
        const sourceItems = [...sourceCol.items];
        const destItems = source.droppableId === destination.droppableId ? sourceItems : [...destCol.items];

        const [removed] = sourceItems.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceCol, items: sourceItems }
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceCol, items: sourceItems },
                [destination.droppableId]: { ...destCol, items: destItems }
            });
        }

        // Emit event
        socket.emit('moveTask', {
            taskId: draggableId,
            sourceColumn: source.droppableId,
            destColumn: destination.droppableId,
            sourceIndex: source.index,
            destIndex: destination.index
        });
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        socket.emit('createTask', { title: newTaskTitle, columnId: 'todo' });
        setNewTaskTitle('');
    };

    const handleDeleteTask = (taskId) => {
        socket.emit('deleteTask', taskId);
    };

    return (
        <div className="board-container">
            <form onSubmit={handleCreateTask} className="task-input-form">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="task-input"
                />
                <button type="submit" className="add-task-button">Add Task</button>
            </form>

            <div className="columns-container">
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.entries(columns).map(([id, col]) => (
                        <Column key={id} columnId={id} title={col.title} tasks={col.items} onDeleteTask={handleDeleteTask} />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Board;
