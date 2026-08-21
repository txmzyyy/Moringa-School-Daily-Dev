import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deactivateUser } from '../../features/moderation/moderationSlice';

export default function UserManagementPage() {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.moderation);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {status === 'loading' && <p className="text-gray-500">Loading users...</p>}

      <div className="flex flex-col gap-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{u.name}</h2>
              <p className="text-xs text-gray-500 mt-1">
                {u.email} · <span className="capitalize">{u.role}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  u.active
                    ? 'bg-lime-400/20 text-lime-400'
                    : 'bg-red-400/20 text-red-400'
                }`}
              >
                {u.active ? 'Active' : 'Deactivated'}
              </span>
              {u.active && (
                <button
                  onClick={() => dispatch(deactivateUser(u.id))}
                  className="text-xs border border-red-800 text-red-400 px-3 py-1.5 rounded-md"
                >
                  Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}