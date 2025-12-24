import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import './Column.css';

const Column = ({ columnId, title, tasks, onDeleteTask }) => {
    return (
        <div className={`column ${columnId}`}>
            <div className="column-header">
                <span className="column-icon"></span>
                <h3 className="column-title">{title}</h3>
                <span className="column-count">{tasks.length}</span>
            </div>

            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="tasks-list"
                    >
                        {tasks.length === 0 ? (
                            <div className="empty-state">No tasks yet</div>
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
