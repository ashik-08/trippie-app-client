const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-52 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        {/* Languages skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        {/* Expertise skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/5 mb-3"></div>
        {/* Bio skeleton */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
        {/* View Profile Button skeleton */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="h-10 bg-gray-300 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
