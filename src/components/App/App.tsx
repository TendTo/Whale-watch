import React from 'react';
import DockerRemoteContextProvider from '../../context/DockerRemoteContext';
import DockerRemoteList from '../DockerRemoteList/DockerRemoteList';
import MainNavbar from '../MainNavbar/MainNavbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
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
              <Route exact path="/:docker" children={<DockerRemoteList />} />
            </Switch>
          </div>
        </DockerRemoteContextProvider>
      </Router>
    </div>
  );
}

export default App;
