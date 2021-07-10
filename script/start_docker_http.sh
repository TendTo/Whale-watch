HOST="2375"
BROWSER_ADDRESS="http://localhost:3000"
# Stop running docker daemon
systemctl stop docker.service
# Start the server
dockerd --api-cors-header=$BROWSER_ADDRESS -H unix:///var/run/docker.sock -H tcp://0.0.0.0:$HOST