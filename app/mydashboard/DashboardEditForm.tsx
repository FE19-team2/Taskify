'use client';
import React, { useState } from 'react';
import DashboardColorPicker from './DashboardColorPicker';
import styles from './styles.module.css';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';
import { UserAvatar } from '@/components/ui/dropdown/UserAvatar';

export default function DashboardEditForm({
  initial,
}: {
  initial?: { id?: string; name?: string; color?: string };
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [color, setColor] = useState(initial?.color ?? '#c94b3f');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Input 컴포넌트 시그니처가 불확실하면 방어적으로 처리
  const handleNameChange = (payload: unknown) => {
    if (typeof payload === 'string') {
      setName(payload);
      return;
    }
    const event = payload as React.ChangeEvent<HTMLInputElement> | undefined;
    const value = event?.target?.value ?? '';
    setName(value);
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/dashboards/${initial?.id ?? ''}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });
      if (!res.ok) throw new Error('저장 실패');
      setMsg('저장되었습니다.');
    } catch (error) {
      console.error(error);
      setMsg('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.formWrap}>
      <div style={{ marginBottom: 12 }}>
        <UserAvatar name={name || '익명'} />
      </div>

      <label className={styles.label}>이름</label>
      <Input
        value={name}
        onChange={handleNameChange}
        placeholder="대시보드 이름"
        className={styles.input}
      />

      <label className={styles.label} style={{ marginTop: 18 }}>
        색상
      </label>
      <div className={styles.colorRow}>
        <DashboardColorPicker selected={color} onSelect={setColor} />
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
            {saving ? '저장중...' : '저장'}
          </Button>
        </div>
        {msg && <div style={{ marginTop: 12 }}>{msg}</div>}
      </div>
    </div>
  );
}
