import React from 'react';
import './Skeleton.css';

export const SkeletonTask = () => (
    <div className="skeleton-task">
        <div className="skeleton-handle"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
    </div>
);

export const SkeletonColumn = ({ taskCount = 3 }) => (
    <div className="skeleton-column">
        <div className="skeleton-header">
            <div className="skeleton-dot"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-count"></div>
        </div>
        <div className="skeleton-tasks">
            {Array.from({ length: taskCount }).map((_, i) => (
                <SkeletonTask key={i} />
            ))}
        </div>
    </div>
);

const Skeleton = ({ columns = 3 }) => (
    <div className="skeleton-board">
        <SkeletonColumn taskCount={2} />
        <SkeletonColumn taskCount={3} />
        <SkeletonColumn taskCount={1} />
    </div>
);

export default Skeleton;
