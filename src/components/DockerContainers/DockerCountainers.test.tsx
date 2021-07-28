import { render, screen } from '@testing-library/react';
import React from 'react';
import { Accordion, AccordionContext } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import DockerContainers from './DockerContainers';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('DockerContainers shows default value', () => {
    render(
        <AccordionContext.Provider value="0">
            <DockerContainers data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
        </AccordionContext.Provider >)
    expect(screen.getByText(/Containers/)).toBeInTheDocument();
    expect(screen.getByText(/No containers found/)).toBeInTheDocument();
})

test('DockerContainers shows containers', async () => {
    const response = '[{"Id":"6766b4ebe92d71ec90913a9aba9ce3cbc9a5c078536d8cc48607c1a2c60a8eac","Names":["/angry_cohen"],"Image":"zookeeper:latest","ImageID":"sha256:2e2f6a1661fd115997995c548631c1ca0f3a62121b05166879feb2ddd11754a9","Command":"/docker-entrypoint.sh zkServer.sh start-foreground","Created":1627494625,"Ports":[{"PrivatePort":8080,"Type":"tcp"},{"PrivatePort":2181,"Type":"tcp"},{"PrivatePort":2888,"Type":"tcp"},{"PrivatePort":3888,"Type":"tcp"}],"Labels":{},"State":"running","Status":"Up 4 hours","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","EndpointID":"ff5295d6d90380bcddad2a37a495d7ef366f980b864ccb570a660d38f972e06a","Gateway":"172.17.0.1","IPAddress":"172.17.0.2","IPPrefixLen":16,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"02:42:ac:11:00:02","DriverOpts":null}}},"Mounts":[{"Type":"volume","Name":"0fd23cc4bd560a9f4a04bad64c453b65554440f42d4d1d0b0d91a8e1c1423d25","Source":"","Destination":"/data","Driver":"local","Mode":"","RW":true,"Propagation":""},{"Type":"volume","Name":"1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe","Source":"","Destination":"/datalog","Driver":"local","Mode":"","RW":true,"Propagation":""},{"Type":"volume","Name":"23cb4371cfb4932097b3a8dc02834436862c025bd0b46fa4d354f1a026dd2dff","Source":"","Destination":"/logs","Driver":"local","Mode":"","RW":true,"Propagation":""}]},{"Id":"029b465cef38ff6642e21b4770f166cf9e7a9eadfe4b3d8bbaf67978a26c4e63","Names":["/quirky_rubin"],"Image":"hello-world:latest","ImageID":"sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726","Command":"/hello","Created":1626004701,"Ports":[],"Labels":{},"State":"exited","Status":"Exited (0) 4 hours ago","HostConfig":{"NetworkMode":"default"},"NetworkSettings":{"Networks":{"bridge":{"IPAMConfig":null,"Links":null,"Aliases":null,"NetworkID":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","EndpointID":"","Gateway":"","IPAddress":"","IPPrefixLen":0,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"","DriverOpts":null}}},"Mounts":[]}]';
    fetchMock.mockResponseOnce(response);
    act(() => {
        render(
            <AccordionContext.Provider value="0">
                <Accordion >
                    <DockerContainers data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
                </Accordion>
            </AccordionContext.Provider >);
        screen.getByText(/Containers/).click();
    });

    expect(await screen.findByText(/angry_cohen/i)).toBeInTheDocument();
    expect(await screen.findByText(/quirky_rubin/i)).toBeInTheDocument();
})
