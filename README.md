# Whale watch
Simple browser based Docker GUI. It can be used to connect to remote Docker instances.

## Setup the Docker daemon 🐳

### Requirements
- [docker](https://www.docker.com/)

### Steps

#### HTTP - Simple but unsecure
The simplest way to make the Docker daemon listen for remote connections is with the following command:
```bash
dockerd --api-cors-header=$BROWSER_ADDRESS -H unix:///var/run/docker.sock -H tcp://0.0.0.0:$PORT
```
Where 
- $BROWSER_ADDRESS is the github page address or the address of the machine you are using this program on
- $PORT is the port you want to expose. The default one is port 2375
You may need to stop the docker.service if it is already running with
```bash
sudo systemctl stop docker.service
```

#### HTTPS - Complex but secure
To make the connection secure, you could use TLS (HTTPS) to protect the Docker daemon socket.  
The term _host_ refers to the machine running the Docker deamon, while _client_ refers to the machine running _Whale watch_.  
See the **Larn Mode** session for more details. In short:
```bash
# Generate a pair of keys for the Certificate Authority
openssl genrsa -aes256 -out ca-key.pem 4096

# Create a Certificate Authority. When asked for a "Common Name", you should provide the host name of the remote machine
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem

# Generate another pair of keys for the server's certificate
openssl genrsa -out server-key.pem 4096

# Create a certificate request. $HOST should be the same "Common Name" provided before
openssl req -subj "/CN=$HOST" -sha256 -new -key server-key.pem -out server.csr

# Additional connection settings. You may want to add the ip of the host. $HOST should be the same "Common Name" provided before
echo subjectAltName = DNS:$HOST,IP:10.10.10.20,IP:127.0.0.1 >> extfile.cnf
echo extendedKeyUsage = serverAuth >> extfile.cnf

# Generate the signed certificate
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem \
  -CAcreateserial -out server-cert.pem -extfile extfile.cnf

# Generate the key pair for the client
openssl genrsa -out key.pem 4096

# Create the client's certificate request
openssl req -subj '/CN=client' -new -key key.pem -out client.csr

# To make the key suitable for client authentication, create a new extensions config file
echo extendedKeyUsage = clientAuth > extfile-client.cnf

# Finally, generate the client's certificate
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem \
  -CAcreateserial -out cert.pem -extfile extfile-client.cnf
```
To make the Docker daemon listen for remote connections with the certificates use the following command:
```bash
dockerd \
     --api-cors-header=$BROWSER_ADDRESS \
    --tlsverify \
    --tlscacert=ca.pem \
    --tlscert=server-cert.pem \
    --tlskey=server-key.pem \
    -H=0.0.0.0:$PORT
```
Where 
- $BROWSER_ADDRESS is the github page address or the address of the machine you are using _Whale watch_ on
- $PORT is the port you want to expose. The default one is port 2375
You will need the contents of the _ca.pem_, _cert.pem_ and _key.pem_ files to connect to the host from the client.
You may need to stop the docker.service if it is already running with
```
sudo systemctl stop docker.service
```

### Learn More
The complete documentation can be found [here](https://docs.docker.com/engine/install/linux-postinstall/#configure-where-the-docker-daemon-listens-for-connections).  
Additionally, to make the connection secure, you may want to read [this](https://docs.docker.com/engine/security/protect-access/#use-tls-https-to-protect-the-docker-daemon-socket).

## Starting in local 💻

### Requirements
- [node 16.2.0](https://nodejs.org/)

### Available Scripts
In the project directory, you can run:

#### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).  
To learn React, check out the [React documentation](https://reactjs.org/).
