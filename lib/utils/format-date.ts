export function formatKoreanDate(isoString: string): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

export function formatKoreanDateTime(isoString: string): string {
  const date = new Date(isoString); // ISO 문자열 -> Date 객체

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0부터 시작하니까 +1
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 항상 2자리

  const ampm = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12; // 0, 12 -> 12로 보정

  // 최종 문자열
  return `${year}년 ${month}월 ${day}일 ${ampm} ${hour12}:${minutes}`;
}
