import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index, onDelete }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                >
                    <div className="task-title">
                        {task.title}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                        className="delete-button"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        ×
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
