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
                    <div className="task-title">{task.title}</div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task._id);
                        }}
                        className="delete-button"
                    >
                        ×
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
