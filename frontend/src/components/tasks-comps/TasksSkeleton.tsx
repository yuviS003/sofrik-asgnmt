const TasksSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 p-7 animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg"
        >
          <div className="collapse-title flex items-center gap-2">
            <div className="h-5 w-40 bg-base-300 rounded"></div>
            <div className="h-5 w-8 bg-base-300 rounded"></div>
          </div>
          <div className="collapse-content grid grid-cols-4 gap-4">
            {Array.from({ length: 3 }).map((_, col) => (
              <div
                key={col}
                className="w-full border border-base-300 rounded-lg h-80 p-2 flex flex-col gap-2"
              >
                <div className="h-4 w-20 bg-base-300 rounded mb-2"></div>
                {Array.from({ length: 3 }).map((_, task) => (
                  <div
                    key={task}
                    className="w-full bg-base-200 border border-base-300 rounded-lg p-3 flex flex-col gap-1"
                  >
                    <div className="h-4 w-24 bg-base-300 rounded"></div>
                    <div className="h-3 w-32 bg-base-300 rounded"></div>
                    <div className="h-3 w-20 bg-base-300 rounded"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksSkeleton;
