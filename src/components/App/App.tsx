import React from 'react';
import { useState } from 'react';
import { DockerRemoteFormData } from '../../types/DockerTypes'
import Spinner from 'react-bootstrap/Spinner';
import MainNavbar from '../MainNavbar/MainNavbar';
import DockerRemote from '../DockerRemote/DockerRemote'
import './App.css';



const mock = ``;
function App() {
  const [resp, setResp] = useState("");
  const [dockerRemotes, setDockerRemotes] = useState<Map<string, DockerRemoteFormData>>(new Map());
  const [loading, setLoading] = useState(false);


  const fetchData = async (data: DockerRemoteFormData) => {
    setLoading(true);
    let result = null;
    try {
      result = await fetch("http://192.168.1.18:2375/images/json");
      const resp = await result.text();
      localStorage.setItem("dockerImages", JSON.stringify(resp));
      setDockerRemotes(dockerRemotes.set(`${data.host}:${data.port}`, data));
      setResp(resp);
    } catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <MainNavbar onFetch={fetchData}></MainNavbar>
      <div className="App-main">
        {loading && (
          <Spinner animation="border" variant="light" />
        )}
        {resp && !loading && (<p>{resp}</p>)}
        {!resp && !loading && (<p>No data yet :(</p>)}
        <DockerRemote data={dockerRemotes}></DockerRemote>
      </div>
    </div>
  );
}

export default App;
