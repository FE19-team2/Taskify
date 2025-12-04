import { Tag } from '../Tag';

export function CardModalTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
}
