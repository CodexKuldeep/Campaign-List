import Search from "./components/Search";
import List from "./components/List";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/usersSlice";
import AddCampaign from "./components/AddCampaign";

export default function App(){
  const dispatch = useDispatch();
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() =>{
    if(usersStatus === 'idle'){
      dispatch(fetchUsers());
    }
  },[dispatch,usersStatus]);


  return (
    <div>
      <div>
    <h1>
      Campaign List
    </h1>
    <button onClick={() => setIsModalOpen(true)}>Add Campaign</button>
    </div>
    <Search />
    {usersStatus === 'loadig' && (
      <p className="">Loading user data....</p>
    )}
    {usersStatus === 'failed' && (
      <p className="">Failed to load user data: {usersError}</p>
    )}
    <List />
    {isModalOpen && (
      <AddCampaign onClose={() => setIsModalOpen(false)} />
    )}
    </div>
  )
}