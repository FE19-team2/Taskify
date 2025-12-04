'use client';

import React, { useState } from 'react';
import DashboardColorPicker from './DashboardColorPicker';
import Button from '@/components/ui/button/Button';
import { updateDashboard } from '@/lib/api/services/dashboards.service';

export default function DashboardEditForm({
  initial,
}: {
  initial?: { id?: string; name?: string; color?: string };
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [color, setColor] = useState(initial?.color ?? '#c94b3f');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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
    if (!initial?.id) {
      setMsg('대시보드 ID가 없습니다.');
      return;
    }

    if (!name.trim()) {
      setMsg('대시보드 이름을 입력해주세요.');
      return;
    }

    setSaving(true);
    setMsg(null);

    try {
      await updateDashboard(Number(initial.id), {
        title: name.trim(),
        color: color,
      });

      // 사이드바 대시보드 목록 새로고침
      window.dispatchEvent(new CustomEvent('reloadDashboards'));

      setMsg('저장되었습니다.');
    } catch (error) {
      console.error(error);
      setMsg('저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-[740px]">
      {/* 이름 입력 */}
      <label className="block mb-2 text-[#bdbdbd] text-sm">이름</label>
      <input
        value={name}
        onChange={handleNameChange}
        placeholder="대시보드 이름"
        className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#171717] text-white text-base h-12"
      />

      {/* 색상 선택 */}
      <label className="block mt-6 mb-3 text-[#bdbdbd] text-sm">색상</label>
      <div className="mt-3">
        <DashboardColorPicker selected={color} onSelect={setColor} />
      </div>

      {/* 저장 버튼 */}
      <div className="mt-8 text-center">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="inline-block w-[260px] h-12 bg-[#09a30d] text-white rounded-full font-semibold shadow-save"
        >
          {saving ? '저장중...' : '저장'}
        </Button>

        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </div>
    </div>
  );
}
