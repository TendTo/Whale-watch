import { render, screen } from '@testing-library/react';
import { Accordion, AccordionContext } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import DockerVolumes from './DockerVolumes';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('DockerVolumes shows default value', () => {
    render(
        <AccordionContext.Provider value="0">
            <DockerVolumes layout="horizontal" data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
        </AccordionContext.Provider >)
    expect(screen.getByText(/Volumes/)).toBeInTheDocument();
    expect(screen.getByText(/No volumes found/)).toBeInTheDocument();
})

test('DockerVolumes shows volumes', async () => {
    const response = '{"Volumes":[{"CreatedAt":"2021-07-28T17:50:36Z","Driver":"local","Labels":null,"Mountpoint":"/var/lib/docker/volumes/1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe/_data","Name":"1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe","Options":null,"Scope":"local"},{"CreatedAt":"2021-07-28T17:50:36Z","Driver":"local","Labels":null,"Mountpoint":"/var/lib/docker/volumes/23cb4371cfb4932097b3a8dc02834436862c025bd0b46fa4d354f1a026dd2dff/_data","Name":"23cb4371cfb4932097b3a8dc02834436862c025bd0b46fa4d354f1a026dd2dff","Options":null,"Scope":"local"},{"CreatedAt":"2021-07-28T17:50:36Z","Driver":"local","Labels":null,"Mountpoint":"/var/lib/docker/volumes/0fd23cc4bd560a9f4a04bad64c453b65554440f42d4d1d0b0d91a8e1c1423d25/_data","Name":"0fd23cc4bd560a9f4a04bad64c453b65554440f42d4d1d0b0d91a8e1c1423d25","Options":null,"Scope":"local"}],"Warnings":null}';
    fetchMock.mockResponseOnce(response);
    act(() => {
        render(
            <AccordionContext.Provider value="0">
                <Accordion >
                    <DockerVolumes layout="horizontal" data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
                </Accordion>
            </AccordionContext.Provider >);
        screen.getByText(/Volumes/).click();
    });

    expect(await screen.findByText(/^1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe$/i)).toBeInTheDocument();
    expect(await screen.findByText(/^1ab64afc2403197b7192e83fb38e4fe8a4cbfabea2db8e0076d44c05e0345ffe$/i)).toBeInTheDocument();
})
