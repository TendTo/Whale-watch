import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DockerApi from "../../api/DockerApi";
import { ContainerInfo, ContainerInspectInfo } from "../../types/DockerApiTypes";
import { DockerRemoteData } from "../../types/DockerTypes";
import toast, { requestErrorToast } from "../Toast/Toast";

type ContainerLogs = { name: string, logs: string }

interface Props {
    key: number
    data: DockerRemoteData
    container: ContainerInfo
    fetchContainerLs: (force?: boolean) => void
    setContainerDetails: (container: ContainerInspectInfo) => void
    setContainerLogs: (logs: ContainerLogs) => void
}

function timeConverter(unixTime: number) {
    const a = new Date(unixTime * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function DockerContainer({ data, container, fetchContainerLs, setContainerDetails, setContainerLogs }: Props) {
    const [loading, setLoading] = useState(false);
    const dockerApi = useRef(DockerApi.fromDockerRemoteData(data, setLoading));

    useEffect(() => {
        DockerApi.fromDockerRemoteData(data, setLoading)
    }, [data, setLoading]);

    const onRun = () => {
        dockerApi.current.containerRun(container)
            .then(() => fetchContainerLs(true))
            .then(() => toast("A new container has started running"))
            .catch(requestErrorToast);
    }
    const onInspect = () => {
        dockerApi.current.containerInspect(container)
            .then(setContainerDetails)
            .catch(requestErrorToast);
    }
    const onLogs = () => {
        dockerApi.current.containerLogs(container)
            .then((logs) => setContainerLogs({ name: container.Names ? container.Names[0] : container.Id, logs: logs }))
            .catch(requestErrorToast);
    }
    const onRestart = () => {
        dockerApi.current.containerRestart(container)
            .then(() => fetchContainerLs(true))
            .then(() => toast("The container has been restarted"))
            .catch(requestErrorToast);
    }
    const onStop = () => {
        dockerApi.current.containerStop(container)
            .then(() => fetchContainerLs(true))
            .then(() => toast("The container has been stopped"))
            .catch(requestErrorToast);
    }
    const onDelete = () => {
        dockerApi.current.containerRm(container)
            .then(() => fetchContainerLs(true))
            .then(() => toast("The container has been deleted"))
            .catch(requestErrorToast);
    }

    return (
        <tr>
            {loading && (
                <td colSpan={5}>
                    <Spinner animation="border" size="sm" />
                </td>
            )}
            {!loading && (
                <>
                    <td>{container.Names.map(e => e.slice(1))}</td>
                    <td>{container.Image}</td>
                    <td>{timeConverter(container.Created)}</td>
                    <td>{container.Status}</td>
                    <td className="DockerContainers-actions" >
                        <Button variant="success lg" onClick={onRun} disabled={loading}>
                            <i className="fa fa-play"></i>
                        </Button>
                        <Button variant="info lg" onClick={onInspect} disabled={loading}>
                            <i className="fa fa-eye"></i>
                        </Button>
                        <Button variant="light lg" onClick={onLogs} disabled={loading}>
                            <i className="fa fa-file-text-o"></i>
                        </Button>
                        <Button variant="primary lg" onClick={onRestart} disabled={loading}>
                            <i className="fa fa-refresh"></i>
                        </Button>
                        <Button variant="warning lg" onClick={onStop} disabled={loading}>
                            <i className="fa fa-stop"></i>
                        </Button>
                        <Button variant="danger lg" onClick={onDelete} disabled={loading}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default DockerContainer;