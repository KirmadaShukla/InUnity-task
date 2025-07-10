import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { getGroups, createGroup, joinGroup, getMyGroups } from '../api/request';
import { getGroupMembers as apiGetGroupMembers } from '../api/request';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);

  const fetchMyGroups = async () => {
    const res = await getMyGroups(token);
    setMyGroups(res.groups);
  };

  useEffect(() => {
    fetchMyGroups();
  }, [token]);

  const fetchGroups = async () => {
    const res = await getGroups(token);
    
    setGroups(res.groups);

  };

  const handleCreateGroup = async (groupData) => {
    const res = await createGroup(groupData, token);
    fetchGroups();
    return res;
  };

  const handleJoinGroup = async (groupId) => {
    const res = await joinGroup(groupId, token);
    fetchGroups();
    fetchMyGroups();
    return res;
  };

  const getGroupMembers = async (groupId) => {
    const res = await apiGetGroupMembers(groupId, token);
    return res.members || [];
  };

  return (
    <GroupContext.Provider value={{ groups, myGroups, fetchGroups, fetchMyGroups, handleCreateGroup, handleJoinGroup, getGroupMembers }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext); 