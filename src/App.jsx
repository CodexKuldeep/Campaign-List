import Search from "./components/Search";
import List from "./components/List";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/usersSlice";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import './App.css'
import AddCampaign from "./components/AddCampaign";

export default function App() {
  const dispatch = useDispatch();
  const usersStatus = useSelector(state => state.users.status);
  const usersError = useSelector(state => state.users.error);
  const [openCamp,setOpenCamp] = useState(false);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);
console.log(openCamp)

  return (
    <>
    {openCamp && <AddCampaign isOpen={openCamp} onClose={()=>setOpenCamp(false)} />}
      {/* {!openCamp && */}
    <div>
      <div>
        <h1>
          Campaign List
        </h1>
        {/* <Link to="/add"> */}
          <Button
          id="btn"
            variant="contained"
            onClick={()=> setOpenCamp(true)}
          >
            Add Campaign
          </Button>
         
        {/* </Link> */}
      </div>
      <Search />
      {usersStatus === 'loadig' && (
        <p className="">Loading user data....</p>
      )}
      {usersStatus === 'failed' && (
        <p className="">Failed to load user data: {usersError}</p>
      )}
      <List />
    </div>

    </>
  )
}