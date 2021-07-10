HOST="2375"
# Use the local or the remote application address
BROWSER_ADDRESS="http://localhost:3000"
# BROWSER_ADDRESS="https://tendto.github.io"


# Stop running docker daemon
systemctl stop docker.service
# Start the server
dockerd --api-cors-header=$BROWSER_ADDRESS -H unix:///var/run/docker.sock -H tcp://0.0.0.0:$HOST