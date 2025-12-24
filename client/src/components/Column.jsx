import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import './Column.css';

const columnConfig = {
    todo: {
        icon: '🔴',
        title: 'To Do'
    },
    inprogress: {
        icon: '🟡',
        title: 'In Progress'
    },
    done: {
        icon: '🟢',
        title: 'Done'
    }
};

const Column = ({ columnId, title, tasks, onDeleteTask }) => {
    const config = columnConfig[columnId] || columnConfig.todo;

    return (
        <div className="column">
            <div className="column-header">
                <span className="column-icon">{config.icon}</span>
                <h3 className="column-title">{title}</h3>
                <span className="column-count">{tasks.length}</span>
            </div>

            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="tasks-list"
                        style={{
                            background: snapshot.isDraggingOver
                                ? 'rgba(56, 189, 248, 0.05)'
                                : 'transparent'
                        }}
                    >
                        {tasks.length === 0 ? (
                            <div className="empty-state">
                                No tasks yet
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <Task
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    onDelete={onDeleteTask}
                                />
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
