import { useEffect, useState, useCallback, useMemo } from 'react';
import { useGroup } from '../contexts/GroupContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const GroupList = () => {
  const { groups, myGroups, fetchGroups, handleJoinGroup } = useGroup();
  const { user } = useAuth();
  const [joining, setJoining] = useState({});
  const navigate=useNavigate()
  // Create a Set of joined group ids for fast lookup
  const myGroupIds = useMemo(() => new Set(myGroups?.map(group => group._id)), [myGroups]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleJoin = useCallback(async (groupId) => {
    setJoining((prev) => ({ ...prev, [groupId]: true }));
    try {
      await handleJoinGroup(groupId);
    } catch (err) {
      console.error('Failed to join group:', err);
    } finally {
      setJoining((prev) => ({ ...prev, [groupId]: false }));
    }
  }, [handleJoinGroup]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Available Learning Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {groups?.map((group) => {
            const isJoined = myGroupIds.has(group._id);
            return (
              <div
                key={group._id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/groups/${group._id}`)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {group.description || 'No description available'}
                </p>
                <button
                  onClick={() => !isJoined && handleJoin(group._id)}
                  className={`w-full py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isJoined
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700'
                  } ${joining[group._id] ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isJoined || joining[group._id]}
                >
                  {joining[group._id] ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Joining...
                    </span>
                  ) : isJoined ? (
                    'Joined'
                  ) : (
                    'Join Group'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupList;