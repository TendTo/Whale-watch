import DockerApi from './DockerApi';

let dockerApi: DockerApi; 

beforeEach(() => {
    fetchMock.resetMocks();
    dockerApi = new DockerApi("http", "localhost", 2375, "ca", "cert", "key", (isLoading: boolean) => { });
});

test('DockerApi exists', () => {
    expect(DockerApi).toBeTruthy();
});

test('DockerApi instantiates', () => {
    expect(new DockerApi("http", "localhost", 2375)).toBeTruthy();
    expect(new DockerApi("http", "localhost", 2375, "ca", "cert", "key", (isLoading: boolean) => { })).toBeTruthy();
    expect(DockerApi.fromDockerRemoteData({ protocol: "http", host: "localhost", port: 2375 }, (isLoading: boolean) => { })).toBeTruthy();
});

test('DockerApi ping success', async () => {
    const resp = 'OK';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.ping();
    expect(result).toBe(true);
});

test('DockerApi ping fail', async () => {
    const resp = 'NOT OK';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.ping();
    expect(result).toBe(false);
});

test('DockerApi imageLs', async () => {
    const resp = '[{"Containers":-1,"Created":1627035123,"Id":"sha256:2e2f6a1661fd115997995c548631c1ca0f3a62121b05166879feb2ddd11754a9","Labels":null,"ParentId":"","RepoDigests":["zookeeper@sha256:d70d4bfa7e1ada5d4247ad9f482d2ed191eb01dddd8da3c14234a418a22498f8"],"RepoTags":["zookeeper:latest"],"SharedSize":-1,"Size":269693351,"VirtualSize":269693351},{"Containers":-1,"Created":1623097229,"Id":"sha256:69593048aa3acfee0f75f20b77acb549de2472063053f6730c4091b53f2dfb02","Labels":null,"ParentId":"","RepoDigests":["busybox@sha256:930490f97e5b921535c153e0e7110d251134cc4b72bbb8133c6a5065cc68580d"],"RepoTags":["busybox:latest"],"SharedSize":-1,"Size":1235821,"VirtualSize":1235821},{"Containers":-1,"Created":1614986725,"Id":"sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726","Labels":null,"ParentId":"","RepoDigests":["hello-world@sha256:df5f5184104426b65967e016ff2ac0bfcd44ad7899ca3bbcf8e44e4461491a9e"],"RepoTags":["hello-world:latest"],"SharedSize":-1,"Size":13336,"VirtualSize":13336}]';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.imageLs();
    expect(result.length).toBe(3);
});

test('DockerApi containerLs', async () => {
    const resp = '[{"Id":"6766b4ebe92d71ec90913a9aba9ce3cbc9a5c078536d8cc48607c1a2c60a8eac","Names":["/angry_cohen"],"Image":"zookeeper:latest","ImageID":"sha256:2e2f6a1661fd115997995c548631c1ca0f3a62121b05166879feb2ddd11754a9","Command":"/docker-entrypoint.sh zkServer.sh start-foreground","Created":1627494625,"Ports":[{"PrivatePort":2181,"Type":"tcp"},{"PrivatePort":2888,"Type":"tcp"},{"PrivatePort":3888,"Type":"tcp"},{"PrivatePort":8080,"Type":"tcp"}],"Labels":{},"State":"running","Status":"Up 19 hours","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","EndpointID":"ff5295d6d90380bcddad2a37a495d7ef366f980b864ccb570a660d38f972e06a","Gateway":"172.17.0.1","IPAddress":"172.17.0.2","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:02","DriverOpts":null}}},"Mounts":[{"Type":"volume","Name":"0fd23cc4bd560a9f4a04bad64c453b65554440f42d4d1d0b0d91a8e1c1423d25","Source":"","Destination":"/data","Driver":"local","Mode":"","RW":true,"Propagation":""},{"Type":"volume","Name":"1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe","Source":"","Destination":"/datalog","Driver":"local","Mode":"","RW":true,"Propagation":""},{"Type":"volume","Name":"23cb4371cfb4932097b3a8dc02834436862c025bd0b46fa4d354f1a026dd2dff","Source":"","Destination":"/logs","Driver":"local","Mode":"","RW":true,"Propagation":""}]},{"Id":"029b465cef38ff6642e21b4770f166cf9e7a9eadfe4b3d8bbaf67978a26c4e63","Names":["/quirky_rubin"],"Image":"hello-world:latest","ImageID":"sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726","Command":"/hello","Created":1626004701,"Ports":[],"Labels":{},"State":"exited","Status":"Exited (0) 19 hours ago","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","EndpointID":"","Gateway":"","IPAddress":"","IPPrefixLen":0,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"","DriverOpts":null}}},"Mounts":[]}]';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.containerLs();
    expect(result.length).toBe(2);
});

test('DockerApi volumeLs', async () => {
    const resp = '{"Volumes":[{"CreatedAt":"2021-07-28T17:50:36Z","Driver":"local","Labels":null,"Mountpoint":"/var/lib/docker/volumes/1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe/_data","Name":"1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe","Options":null,"Scope":"local"}],"Warnings":null}';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.volumeLs();
    expect(result.Volumes.length).toBe(1);
});

test('DockerApi networkLs', async () => {
    const resp = '[{"Name":"host","Id":"1ddd49be1a5b5bac64dc6572641a3ad76af4145802e2f14fe8ff04e8104134e4","Created":"2021-07-10T11:16:06.3198959Z","Scope":"local","Driver":"host","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{},"Labels":{}},{"Name":"bridge","Id":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","Created":"2021-07-27T12:31:16.783887503Z","Scope":"local","Driver":"bridge","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[{"Subnet":"172.17.0.0/16","Gateway":"172.17.0.1"}]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{"com.docker.network.bridge.default_bridge":"true","com.docker.network.bridge.enable_icc":"true","com.docker.network.bridge.enable_ip_masquerade":"true","com.docker.network.bridge.host_binding_ipv4":"0.0.0.0","com.docker.network.bridge.name":"docker0","com.docker.network.driver.mtu":"1500"},"Labels":{}},{"Name":"none","Id":"f0cf6922f44fbc32ac36d739464b31445214c7397da63717af46d37bc863ccec","Created":"2021-07-10T11:16:06.297187676Z","Scope":"local","Driver":"null","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{},"Labels":{}}]';
    fetchMock.mockResponseOnce(resp);
    const result = await dockerApi.networkLs();
    expect(result.length).toBe(3);
});
