import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGroup } from '../contexts/GroupContext';

const GroupDetails = () => {
  const { id } = useParams();
  const { getGroupMembers, groups } = useGroup();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const group = useMemo(() => groups.find((g) => g._id === id), [groups, id]);

  const fetchMembers = useCallback(() => {
    setLoading(true);
    getGroupMembers(id)
      .then((members) => {
        setMembers(members);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch group members:', err);
        setLoading(false);
      });
  }, [id, getGroupMembers]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {group ? `${group.name} Members` : 'Group Members'}
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          {loading ? (
            <div className="text-center text-gray-600 flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 mr-2 text-green-500"
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
              Loading members...
            </div>
          ) : members.length === 0 ? (
            <div className="text-gray-500 text-center text-lg py-6">
              No members found in this group.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {members.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center py-4 transition-all duration-200 hover:bg-gray-50"
                >
                  <span className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg mr-4 leading-[3rem]">
                    {member.username[0]?.toUpperCase() || '?'}
                  </span>
                  <div>
                    <span className="text-gray-800 text-lg font-medium">{member.username}</span>
                    <p className="text-gray-500 text-sm">Member since {new Date().toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;