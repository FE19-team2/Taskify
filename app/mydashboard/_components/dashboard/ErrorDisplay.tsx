// ErrorDisplay.tsx (수정)

// 💡 1. Props 인터페이스 정의
interface ErrorDisplayProps {
  message: string;
}

// 💡 2. 컴포넌트 함수에 Props 적용
const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className="text-red-500 p-4 border border-red-500 rounded-md text-center">
      <h3 className="font-bold">⚠️ 에러 발생</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
