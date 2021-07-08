import React from 'react';
import DockerRemoteContextProvider from '../../context/DockerRemoteContext';
import DockerRemote from '../DockerRemote/DockerRemote';
import MainNavbar from '../MainNavbar/MainNavbar';
import './App.css';

function App() {

  return (
    <div className="App">
      <DockerRemoteContextProvider>
        <MainNavbar></MainNavbar>
        <div className="App-main">
          <DockerRemote></DockerRemote>
        </div>
      </DockerRemoteContextProvider>
    </div>
  );
}

export default App;
