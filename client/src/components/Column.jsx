import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

const columnColors = {
    todo: {
        header: '#ef4444', // Red
        border: '#dc2626',
        accent: '#f87171'
    },
    inprogress: {
        header: '#f59e0b', // Amber
        border: '#d97706',
        accent: '#fbbf24'
    },
    done: {
        header: '#10b981', // Emerald green
        border: '#059669',
        accent: '#34d399'
    }
};

const Column = ({ columnId, title, tasks, onDeleteTask }) => {
    const colors = columnColors[columnId] || columnColors.todo;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--column-bg)',
                borderRadius: '12px',
                width: '300px',
                minWidth: '300px',
                height: 'fit-content',
                maxHeight: '100%',
                marginRight: '24px',
                border: `2px solid ${colors.border}`,
                boxShadow: `0 0 20px ${colors.border}40`
            }}
        >
            <h3 style={{
                padding: '16px',
                margin: 0,
                borderBottom: `3px solid ${colors.header}`,
                background: `linear-gradient(135deg, ${colors.header}20, transparent)`,
                borderRadius: '12px 12px 0 0',
                position: 'relative'
            }}>
                <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    background: colors.accent,
                    borderRadius: '50%',
                    marginRight: '8px',
                    boxShadow: `0 0 8px ${colors.accent}`
                }}></span>
                {title}
                <span style={{
                    marginLeft: '8px',
                    fontSize: '0.8em',
                    background: `${colors.header}30`,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    color: colors.accent,
                    fontWeight: '600'
                }}>
                    {tasks.length}
                </span>
            </h3>
            <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            padding: '16px',
                            background: snapshot.isDraggingOver ? `${colors.header}10` : 'transparent',
                            flexGrow: 1,
                            minHeight: '100px',
                            transition: 'background-color 0.2s ease',
                            borderRadius: '0 0 12px 12px'
                        }}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task._id} task={task} index={index} onDelete={onDeleteTask} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
