import React from "react";

const ProjectsGridSkeleton: React.FC = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <div
          key={`skeleton-${_ + index}`}
          className="flex w-full flex-col gap-4"
        >
          <div className="skeleton h-56 w-full" />
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
        </div>
      ))}
    </>
  );
};

export default ProjectsGridSkeleton;
