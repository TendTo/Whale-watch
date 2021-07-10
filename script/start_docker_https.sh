HOST="2375"
BROWSER_ADDRESS="http://localhost:3000"
# Stop running docker daemon
systemctl stop docker.service
# Start the server
dockerd --api-cors-header=$BROWSER_ADDRESS --tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem -H=0.0.0.0:$PORT