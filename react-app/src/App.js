import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Player from "./components/Player";
import AllSongs from "./components/AllSongs";
import OneSong from "./components/OneSong";
import SongSearch from "./components/SongSearch";
import LikedSongs from "./components/LikedSongs";
import SongUpload from "./components/SongUpload";
import SongUser from "./components/SongUser";
// import EditSongForm from "./components/EditSongForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/upload'>
            <SongUpload />
          </Route>
          <Route path='/uploads'>
            <SongUser />
          </Route>
          <Route path="/songs/search">
            <SongSearch />
          </Route>
          <Route exact path="/">
            <AllSongs />
          </Route>
          <Route exact path="/likes">
            <LikedSongs />
          </Route>
          {/* 
          <Route exact path="/songs/:songId">
            <OneSong />
          </Route>
          {/* <Route exact path="/songs/:songId/edit">
            <EditSongForm />
          </Route> */}
        </Switch>
      )}
      <Player isLoaded={isLoaded} />
    </>
  );
}

export default App;
