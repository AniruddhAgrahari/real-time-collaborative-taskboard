import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index, onDelete }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="drag-handle">
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                        <div className="dots"></div>
                    </div>
                    <div className="task-title">{task.title}</div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                        className="delete-button"
                        aria-label="Delete task"
                        title="Delete task"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
