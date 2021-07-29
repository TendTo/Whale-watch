import { render, screen } from '@testing-library/react';
import { Accordion, AccordionContext } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import DockerImages from './DockerImages';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('DockerImages shows default value', () => {
    render(
        <AccordionContext.Provider value="0">
            <DockerImages data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
        </AccordionContext.Provider >)
    expect(screen.getByText(/Images/)).toBeInTheDocument();
    expect(screen.getByText(/No images found/)).toBeInTheDocument();
})

test('DockerImages shows images', async () => {
    const response = '[{"Containers":-1,"Created":1627035123,"Id":"sha256:2e2f6a1661fd115997995c548631c1ca0f3a62121b05166879feb2ddd11754a9","Labels":null,"ParentId":"","RepoDigests":["zookeeper@sha256:d70d4bfa7e1ada5d4247ad9f482d2ed191eb01dddd8da3c14234a418a22498f8"],"RepoTags":["zookeeper:latest"],"SharedSize":-1,"Size":269693351,"VirtualSize":269693351},{"Containers":-1,"Created":1623097229,"Id":"sha256:69593048aa3acfee0f75f20b77acb549de2472063053f6730c4091b53f2dfb02","Labels":null,"ParentId":"","RepoDigests":["busybox@sha256:930490f97e5b921535c153e0e7110d251134cc4b72bbb8133c6a5065cc68580d"],"RepoTags":["busybox:latest"],"SharedSize":-1,"Size":1235821,"VirtualSize":1235821},{"Containers":-1,"Created":1614986725,"Id":"sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726","Labels":null,"ParentId":"","RepoDigests":["hello-world@sha256:df5f5184104426b65967e016ff2ac0bfcd44ad7899ca3bbcf8e44e4461491a9e"],"RepoTags":["hello-world:latest"],"SharedSize":-1,"Size":13336,"VirtualSize":13336}]';
    fetchMock.mockResponseOnce(response);
    act(() => {
        render(
            <AccordionContext.Provider value="0">
                <Accordion >
                    <DockerImages data={{ protocol: "http", host: "localhost", port: 2375 }} eventKey="0" />
                </Accordion>
            </AccordionContext.Provider >);
        screen.getByText(/Images/).click();
    });

    expect(await screen.findByText(/zookeeper:latest/i)).toBeInTheDocument();
    expect(await screen.findByText(/busybox:latest/i)).toBeInTheDocument();
    expect(await screen.findByText(/hello-world:latest/i)).toBeInTheDocument();
})
