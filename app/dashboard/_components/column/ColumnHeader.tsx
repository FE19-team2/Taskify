type ColumnHeaderProps = {
  title: string;
};

export function ColumnHeader({ title }: ColumnHeaderProps) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
