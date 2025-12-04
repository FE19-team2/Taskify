const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      <span className="ml-3 text-gray-400">로딩 중...</span>
    </div>
  );
};

export default LoadingSpinner;
