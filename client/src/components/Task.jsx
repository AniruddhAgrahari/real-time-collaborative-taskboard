import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ task, index, onDelete }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: 'none',
                        padding: '16px',
                        margin: '0 0 8px 0',
                        minHeight: '50px',
                        backgroundColor: snapshot.isDragging ? '#475569' : 'var(--card-bg)',
                        color: 'var(--text-primary)',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                        transition: 'background-color 0.2s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...provided.draggableProps.style,
                    }}
                >
                    <div>
                        <div style={{ fontWeight: '600' }}>{task.title}</div>
                        {task.description && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                {task.description}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onDelete(task._id)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            padding: '4px',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                        }}
                        title="Delete"
                    >
                        &times;
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
