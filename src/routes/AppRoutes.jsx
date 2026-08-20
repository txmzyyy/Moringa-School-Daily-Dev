import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchPendingContent,
  approveContent,
  flagContent,
} from '../../features/moderation/moderationSlice';

export default function ContentModerationPage() {
  const dispatch = useDispatch();
  const { pendingContent, status } = useSelector((state) => state.moderation);
  const [flagReasonFor, setFlagReasonFor] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    dispatch(fetchPendingContent());
  }, [dispatch]);

  const submitFlag = (id) => {
    if (!reason.trim()) return;
    dispatch(flagContent({ contentId: id, reason }));
    setFlagReasonFor(null);
    setReason('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">Content Moderation</h1>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'succeeded' && pendingContent.length === 0 && (
        <p className="text-gray-500">Nothing pending review. All caught up.</p>
      )}

      <div className="flex flex-col gap-3">
        {pendingContent.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4"
          >
            <Link to={`/content/${item.id}`} className="block mb-3">
              <span className="text-xs uppercase text-lime-400 font-semibold">
                {item.category}
              </span>
              <h2 className="font-semibold mt-1">{item.title}</h2>
              <p className="text-xs text-gray-500 mt-1">by {item.author}</p>
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => dispatch(approveContent(item.id))}
                className="flex-1 bg-lime-400 text-black rounded-md py-2 text-sm font-semibold"
              >
                Approve
              </button>
              <button
                onClick={() => setFlagReasonFor(item.id)}
                className="flex-1 border border-red-800 text-red-400 rounded-md py-2 text-sm font-semibold"
              >
                Flag
              </button>
            </div>

            {flagReasonFor === item.id && (
              <div className="flex gap-2 mt-3">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for flagging..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm outline-none"
                />
                <button
                  onClick={() => submitFlag(item.id)}
                  className="bg-red-700 px-3 rounded-md text-sm"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}