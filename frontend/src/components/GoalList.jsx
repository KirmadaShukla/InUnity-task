import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useGoal } from '../contexts/GoalContext';

function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef();
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const GoalList = () => {
  const { goals, fetchGoals, handleUpdateGoal } = useGoal();
  const [editing, setEditing] = useState({}); // { [goalId]: {title, progress, deadline, saving} }

  useEffect(() => {
    fetchGoals();
  }, []);

  // Debounced update
  const debouncedUpdate = useDebouncedCallback(
    useCallback((goalId, data) => {
      setEditing((prev) => ({ ...prev, [goalId]: { ...prev[goalId], saving: true } }));
      handleUpdateGoal(goalId, data).finally(() => {
        setEditing((prev) => ({ ...prev, [goalId]: { ...prev[goalId], saving: false } }));
      });
    }, [handleUpdateGoal]),
    600
  );

  const handleEdit = useCallback((goal, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [goal._id]: {
        ...prev[goal._id],
        [field]: value,
        saving: prev[goal._id]?.saving || false,
      },
    }));
    debouncedUpdate(goal._id, {
      title: field === 'title' ? value : editing[goal._id]?.title ?? goal.title,
      deadline: field === 'deadline' ? value : editing[goal._id]?.deadline ?? goal.deadline,
      progress: field === 'progress' ? value : editing[goal._id]?.progress ?? goal.progress,
    });
  }, [debouncedUpdate, editing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">My Learning Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {goals?.map((goal) => {
            const edit = editing[goal._id] || {};
            return (
              <div
                key={goal._id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <input
                  className="text-xl font-semibold text-gray-800 mb-2 w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500"
                  value={edit.title !== undefined ? edit.title : goal.title}
                  onChange={e => handleEdit(goal, 'title', e.target.value)}
                  disabled={edit.saving}
                />
                <div className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                  Deadline:
                  <input
                    type="date"
                    className="ml-2 px-2 py-1 border rounded focus:outline-none focus:border-green-500"
                    value={edit.deadline !== undefined ? edit.deadline : goal.deadline?.slice(0,10)}
                    onChange={e => handleEdit(goal, 'deadline', e.target.value)}
                    disabled={edit.saving}
                  />
                </div>
                <div className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  Progress:
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={edit.progress !== undefined ? edit.progress : goal.progress}
                    onChange={e => handleEdit(goal, 'progress', Number(e.target.value))}
                    disabled={edit.saving}
                    className="mx-2"
                  />
                  <span>{edit.progress !== undefined ? edit.progress : goal.progress}%</span>
                  {edit.saving && <span className="ml-2 text-xs text-green-600 animate-pulse">Saving...</span>}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${edit.progress !== undefined ? edit.progress : goal.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoalList;