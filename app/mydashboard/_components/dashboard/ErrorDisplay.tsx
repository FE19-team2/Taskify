interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className="text-red-500 p-4 border border-red-500 rounded-md text-center">
      <h3 className="font-bold">⚠️ 에러 발생</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
