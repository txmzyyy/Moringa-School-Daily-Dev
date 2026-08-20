import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  markNotificationRead,
} from '../../features/notifications/notificationSlice';

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'succeeded' && items.length === 0 && (
        <p className="text-gray-500">You&apos;re all caught up.</p>
      )}

      <div className="flex flex-col gap-2">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.read && dispatch(markNotificationRead(n.id))}
            className={`text-left p-4 rounded-lg border ${
              n.read
                ? 'border-gray-800 bg-gray-900 text-gray-500'
                : 'border-indigo-700 bg-indigo-950/40 text-white'
            }`}
          >
            <p className="text-sm">{n.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}