const EmptyState = () => {
  return (
    <div className="relative flex flex-col h-full transition-all duration-500 hover:scale-105 rounded-lg overflow-hidden animate-pulse shadow-md">
      {/* Image skeleton */}
      <div className="w-full h-60 bg-gray-300"></div>
      <div className="p-4 flex-grow flex flex-col">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        {/* Category skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
        {/* Destinations skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/5 mb-3"></div>
        {/* Description skeleton */}
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
        {/* Price and Duration skeleton */}
        <div className="mt-4 flex justify-between items-end">
          <div className="h-5 bg-gray-300 rounded w-2/5"></div>
          <div className="h-3 bg-gray-300 rounded w-2/5"></div>
        </div>
      </div>
      {/* Details Button skeleton */}
      <div className="px-5 pb-3">
        <div className="h-9 bg-gray-300 rounded-md"></div>
      </div>
      {/* Footer skeleton */}
      <div className="bg-gray-100 text-center py-2">
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
};

export default EmptyState;
