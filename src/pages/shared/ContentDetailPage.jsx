import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchContentById,
  addComment,
  toggleLike,
  toggleWishlist,
  clearCurrentContent,
} from '../../features/content/contentSlice';

function Comment({ comment, onReply }) {
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState('');

  const submitReply = () => {
    if (!text.trim()) return;
    onReply(comment.id, text);
    setText('');
    setReplying(false);
  };

  return (
    <div className="border-l border-gray-800 pl-4 mb-4">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">{comment.author}</span>{' '}
        {comment.text}
      </p>
      <button
        onClick={() => setReplying((r) => !r)}
        className="text-xs text-gray-500 mt-1"
      >
        Reply
      </button>
      {replying && (
        <div className="flex gap-2 mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm outline-none"
            placeholder="Write a reply..."
          />
          <button
            onClick={submitReply}
            className="text-xs bg-indigo-600 px-3 rounded-md"
          >
            Send
          </button>
        </div>
      )}
      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} onReply={onReply} />
      ))}
    </div>
  );
}

export default function ContentDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, wishlist } = useSelector((state) => state.content);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(fetchContentById(id));
    return () => dispatch(clearCurrentContent());
  }, [dispatch, id]);

  if (!current) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    dispatch(addComment({ contentId: id, text: commentText }));
    setCommentText('');
  };

  const handleReply = (parentId, text) => {
    dispatch(addComment({ contentId: id, text, parentId }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 max-w-3xl mx-auto">
      <span className="text-xs uppercase text-lime-400 font-semibold">
        {current.category}
      </span>
      <h1 className="text-3xl font-bold mt-2 mb-4">{current.title}</h1>
      <p className="text-gray-500 text-sm mb-6">by {current.author}</p>

      {current.mediaUrl && (
        <img
          src={current.mediaUrl}
          alt={current.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      <p className="text-gray-300 leading-relaxed mb-8">{current.body}</p>

      <div className="flex gap-4 mb-10">
        <button
          onClick={() => dispatch(toggleLike(current.id))}
          className={`px-4 py-2 rounded-md border ${
            current.liked
              ? 'border-lime-400 text-lime-400'
              : 'border-gray-700 text-gray-300'
          }`}
        >
          ♥ {current.likes}
        </button>
        <button
          onClick={() => dispatch(toggleWishlist(current.id))}
          className={`px-4 py-2 rounded-md border ${
            wishlist.includes(current.id)
              ? 'border-indigo-400 text-indigo-400'
              : 'border-gray-700 text-gray-300'
          }`}
        >
          {wishlist.includes(current.id) ? 'Saved' : 'Save'}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Comments ({current.comments?.length || 0})
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 outline-none"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-md"
        >
          Post
        </button>
      </div>

      {current.comments?.map((c) => (
        <Comment key={c.id} comment={c} onReply={handleReply} />
      ))}
    </div>
  );
}