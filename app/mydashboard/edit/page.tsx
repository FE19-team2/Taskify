// app/mydashboard/edit/page.tsx
import React from 'react';
import DashboardEditForm from '../DashboardEditForm';
import DashboardHeader from '../DashboardHeader';
import styles from '../styles.module.css';

export default function Page() {
  return (
    <div className={styles.inner}>
      <aside className={styles.aside}>{/* 사이드바 영역: 필요하면 컴포넌트 삽입 */}</aside>

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>대시보드 편집</h1>

        <DashboardEditForm
          initial={{ id: 'local', name: '와이어프레임 만들기', color: '#c94b3f' }}
        />
      </main>

      <DashboardHeader />
    </div>
  );
}
