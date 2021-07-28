import { render, screen } from '@testing-library/react';
import React from 'react';
import { Accordion, AccordionContext } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import DockerNetworks from './DockerNetworks';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('DockerNetworks shows default value', () => {
    render(
        <AccordionContext.Provider value="0">
            <DockerNetworks data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
        </AccordionContext.Provider >)
    expect(screen.getByText(/Networks/)).toBeInTheDocument();
    expect(screen.getByText(/No networks found/)).toBeInTheDocument();
})

test('DockerNetworks shows networks', async () => {
    const response = '[{"Name":"host","Id":"1ddd49be1a5b5bac64dc6572641a3ad76af4145802e2f14fe8ff04e8104134e4","Created":"2021-07-10T11:16:06.3198959Z","Scope":"local","Driver":"host","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{},"Labels":{}},{"Name":"bridge","Id":"2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332","Created":"2021-07-27T12:31:16.783887503Z","Scope":"local","Driver":"bridge","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[{"Subnet":"172.17.0.0/16","Gateway":"172.17.0.1"}]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{"com.docker.network.bridge.default_bridge":"true","com.docker.network.bridge.enable_icc":"true","com.docker.network.bridge.enable_ip_masquerade":"true","com.docker.network.bridge.host_binding_ipv4":"0.0.0.0","com.docker.network.bridge.name":"docker0","com.docker.network.driver.mtu":"1500"},"Labels":{}},{"Name":"none","Id":"f0cf6922f44fbc32ac36d739464b31445214c7397da63717af46d37bc863ccec","Created":"2021-07-10T11:16:06.297187676Z","Scope":"local","Driver":"null","EnableIPv6":false,"IPAM":{"Driver":"default","Options":null,"Config":[]},"Internal":false,"Attachable":false,"Ingress":false,"ConfigFrom":{"Network":""},"ConfigOnly":false,"Containers":{},"Options":{},"Labels":{}}]';
    fetchMock.mockResponseOnce(response);
    act(() => {
        render(
            <AccordionContext.Provider value="0">
                <Accordion >
                    <DockerNetworks data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
                </Accordion>
            </AccordionContext.Provider >);
        screen.getByText(/Networks/).click();
    });

    expect(await screen.findByText(/1ddd49be1a5b5bac64dc6572641a3ad76af4145802e2f14fe8ff04e8104134e4/i)).toBeInTheDocument();
    expect(await screen.findByText(/f0cf6922f44fbc32ac36d739464b31445214c7397da63717af46d37bc863ccec/i)).toBeInTheDocument();
    expect(await screen.findByText(/2e9662c8be499468e8a9052bd6a61b319770f9aa282d1fac6b33ec049caff332/i)).toBeInTheDocument();
})
