import { MessageCircle, Reply, MoreHorizontal } from "lucide-react";

const CommentThread = ({
  comments = [],
  onReply,
  onLike,
  onMenuClick,
  currentUserId,
}) => {
  const renderComment = (comment, depth = 0) => {
    const isOwner = currentUserId === comment.userId;

    return (
      <div key={comment.id} className="w-full">
        <div
          className={`flex gap-3 ${
            depth > 0 ? "ml-6 border-l border-gray-200 pl-4" : ""
          }`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            {comment.avatar ? (
              <img
                src={comment.avatar}
                alt={comment.username}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                {comment.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Comment content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {comment.username}
              </span>

              {isOwner && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                  You
                </span>
              )}
            </div>

            {comment.createdAt && (
              <p className="text-xs text-gray-400">
                {comment.createdAt}
              </p>
            )}

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {comment.text}
            </p>

            {/* Actions */}
            <div className="mt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onLike?.(comment)}
                className={`flex items-center gap-1 text-xs transition ${
                  comment.liked
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <MessageCircle size={15} />
                {comment.likes ?? 0}
              </button>

              <button
                type="button"
                onClick={() => onReply?.(comment)}
                className="flex items-center gap-1 text-xs text-gray-500 transition hover:text-blue-600"
              >
                <Reply size={15} />
                Reply
              </button>

              <button
                type="button"
                onClick={() => onMenuClick?.(comment)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label={`More options for ${comment.username}`}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Nested replies */}
            {comment.replies?.length > 0 && (
              <div className="mt-4 space-y-4">
                {comment.replies.map((reply) =>
                  renderComment(reply, depth + 1)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!comments.length) {
    return (
      <div className="py-8 text-center">
        <MessageCircle
          size={32}
          className="mx-auto mb-2 text-gray-300"
        />

        <p className="text-sm text-gray-500">
          No comments yet.
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Be the first to join the discussion.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {comments.map((comment) => renderComment(comment))}
    </div>
  );
};

export default CommentThread;