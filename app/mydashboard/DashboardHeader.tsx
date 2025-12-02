import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  const handleClose = () => {
    // 필요에 따라 경로 변경
    router.push('/mydashboard');
  };

  return (
    <div>
      <button className={styles.closeBtn} onClick={handleClose} aria-label="닫기">
        <span className={styles.closeIcon}>✕</span>
      </button>
    </div>
  );
}
