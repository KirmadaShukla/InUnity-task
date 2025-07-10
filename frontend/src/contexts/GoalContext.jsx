import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { getGoals, addGoal } from '../api/request';
import { updateGoal } from '../api/request';

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const { token } = useAuth();
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await getGoals(token);
    setGoals(res.goals);
  };

  const handleAddGoal = async (goalData) => {
    const res = await addGoal(goalData, token);
    fetchGoals();
    return res;
  };

  const handleUpdateGoal = async (goalId, goalData) => {
    const res = await updateGoal(goalId, goalData, token);
    fetchGoals();
    return res;
  };

  return (
    <GoalContext.Provider value={{ goals, fetchGoals, handleAddGoal, handleUpdateGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoal = () => useContext(GoalContext); 