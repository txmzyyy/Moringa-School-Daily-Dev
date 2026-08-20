import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Play,
} from "lucide-react";

const ContentCard = ({
  id,
  title,
  excerpt,
  author,
  thumbnail,
  category,
  contentType = "article",
  likes = 0,
  comments = 0,
  views = 0,
  publishedAt,
  isLiked = false,
  isSaved = false,
  onClick,
  onLike,
  onSave,
  onComment,
  onMenuClick,
  className = "",
}) => {
  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "?";
  };

  return (
    <article
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <button
          type="button"
          onClick={() => onClick?.(id)}
          className="relative block w-full overflow-hidden bg-gray-100"
        >
          <img
            src={thumbnail}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Content type indicator */}
          {contentType !== "article" && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              {contentType === "video" && <Play size={12} />}
              {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
            </span>
          )}
        </button>
      )}

      <div className="p-4">
        {/* Category + menu */}
        <div className="mb-3 flex items-center justify-between">
          {category && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              {category}
            </span>
          )}

          {onMenuClick && (
            <button
              type="button"
              onClick={() => onMenuClick(id)}
              className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="More options"
            >
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>

        {/* Title */}
        <button
          type="button"
          onClick={() => onClick?.(id)}
          className="block text-left"
        >
          <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600">
            {title}
          </h2>
        </button>

        {/* Excerpt */}
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
            {excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="mt-4 flex items-center gap-2">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                {getInitial(author.name)}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">
                {author.name}
              </p>

              {publishedAt && (
                <p className="text-xs text-gray-400">
                  {publishedAt}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-4">
            {/* Like */}
            <button
              type="button"
              onClick={() => onLike?.(id)}
              className={`flex items-center gap-1.5 text-sm transition ${
                isLiked
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
              aria-label={isLiked ? "Unlike content" : "Like content"}
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>{likes}</span>
            </button>

            {/* Comments */}
            <button
              type="button"
              onClick={() => onComment?.(id)}
              className="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-blue-600"
              aria-label="View comments"
            >
              <MessageCircle size={18} />
              <span>{comments}</span>
            </button>

            {/* Views */}
            {views > 0 && (
              <span className="text-xs text-gray-400">
                {views} views
              </span>
            )}
          </div>

          {/* Save */}
          <button
            type="button"
            onClick={() => onSave?.(id)}
            className={`rounded-full p-2 transition ${
              isSaved
                ? "bg-blue-50 text-blue-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
            aria-label={isSaved ? "Remove from wishlist" : "Save content"}
          >
            <Bookmark
              size={18}
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ContentCard;