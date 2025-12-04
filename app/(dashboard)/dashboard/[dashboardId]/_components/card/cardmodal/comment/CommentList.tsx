import { Comment } from './Comment';
import { useCommentStore } from './UseCommentStore';

export function CommentList() {
  const { comments } = useCommentStore();

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
}
