import React from 'react';
import {
  HashRouter as Router, Route, Switch
} from 'react-router-dom';
import DockerRemoteContextProvider from '../../context/DockerRemoteContext';
import DockerRemoteDetails from '../DockerRemoteDetails/DockerRemoteDetails';
import DockerRemoteList from '../DockerRemoteList/DockerRemoteList';
import MainNavbar from '../MainNavbar/MainNavbar';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <DockerRemoteContextProvider>
          <MainNavbar></MainNavbar>
          <div className="App-main">
            <Switch>
              <Route exact path="/" children={<DockerRemoteList />} />
              <Route exact path="/:dockerRemoteKey" children={<DockerRemoteDetails />} />
            </Switch>
          </div>
        </DockerRemoteContextProvider>
      </Router>
    </div>
  );
}

export default App;
