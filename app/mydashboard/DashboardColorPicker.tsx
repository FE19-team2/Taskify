import React from 'react';
import styles from './styles.module.css';

const COLORS = ['#c94b3f', '#b75a00', '#e0b500', '#2a8a5b', '#2f77ff', '#6c4bc9'];

export default function DashboardColorPicker({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (color: string) => void;
}) {
  return (
    <>
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`${styles.colorSwatch} ${selected === color ? styles.selected : ''}`}
          style={{ background: color }}
          onClick={() => onSelect(color)}
          aria-label={`색상 ${color}`}
        />
      ))}
    </>
  );
}
