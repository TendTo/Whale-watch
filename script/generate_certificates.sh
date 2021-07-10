HOST="localhost"
HOST_IP="192.168.1.1"

# Generate a pair of keys for the Certificate Authority
openssl genrsa -aes256 -out ca-key.pem 4096

# Create a Certificate Authority. When asked for a "Common Name", you should provide the host name of the remote machine
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem

# Generate another pair of keys for the server's certificate
openssl genrsa -out server-key.pem 4096

# Create a certificate request. $HOST should be the same "Common Name" provided before
openssl req -subj "/CN=$HOST" -sha256 -new -key server-key.pem -out server.csr

# Additional connection settings. You may want to add the ip of the host. $HOST should be the same "Common Name" provided before
echo subjectAltName = DNS:$HOST,IP:10.10.10.20,IP:127.0.0.1,IP:$IP: >> extfile.cnf
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