import { useState } from 'react';
import { useGoal } from '../contexts/GoalContext';
import { Link } from 'react-router-dom';

const CreateGoal = () => {
  const { handleAddGoal } = useGoal();
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !deadline) {
      setMessage('Title and deadline are required');
      return;
    }
    setLoading(true);
    try {
      await handleAddGoal({ title, progress, deadline });
      setMessage('Goal added successfully!');
      setTitle('');
      setProgress(0);
      setDeadline('');
    } catch (err) {
      setMessage('Failed to add goal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
              <span className="inline-block bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-1 rounded-lg shadow-sm mr-2">
                <svg className="inline-block w-6 h-6 mr-1 align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Goal
              </span>
              <span className="hidden sm:inline text-gray-500 font-normal text-lg ml-2">Create a new learning milestone</span>
            </h2>
          </div>
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm animate-fade-in ${
                message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter your goal title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress (%)
              </label>
              <input
                id="progress"
                type="number"
                placeholder="0-100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 bg-gray-50 text-gray-800 placeholder-gray-400"
                value={progress}
                min={0}
                max={100}
                onChange={(e) => setProgress(Number(e.target.value))}
                disabled={loading}
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 bg-gray-50 text-gray-800"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="sm:col-span-1 flex items-end">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
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
                    Adding...
                  </span>
                ) : (
                  'Add Goal'
                )}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Want to view your goals?{' '}
            <Link to="/goals" className="text-green-500 hover:underline">
              See all goals
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;