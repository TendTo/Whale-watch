import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DockerApi from "../../api/DockerApi";
import { ImageInfo, ImageInspectInfo } from '../../types/DockerApiTypes';
import { DockerRemoteData } from '../../types/DockerTypes';
import toast, { requestErrorToast } from "../Toast/Toast";

interface Props {
    key: number
    data: DockerRemoteData
    image: ImageInfo
    fetchImageLs: (force?: boolean) => void
    setImageDetails: (image: ImageInspectInfo) => void
}

function sizeConverter(size: number) {
    const dimensions = ['B', 'KB', 'MB', 'GB', 'TB'];
    for (let dimension of dimensions) {
        if (size / 1000 < 1)
            return `${size.toFixed(2)} ${dimension}`;
        else
            size /= 1000;
    }
    return `${size.toFixed(2)} TB`;
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

function DockerImage({ data, image, fetchImageLs, setImageDetails }: Props) {
    const [loading, setLoading] = useState(false);
    const dockerApi = DockerApi.fromDockerRemoteData(data, setLoading);

    const onRun = () => {
        dockerApi.containerCreate(image)
            .then(() => toast("A new container has been created"))
            .catch(requestErrorToast);
    }
    const onInspect = () => {
        dockerApi.imageInspect(image)
            .then((details) => setImageDetails(details))
            .catch(requestErrorToast);
    }
    const onDelete = () => {
        dockerApi.imageRm(image)
            .then(() => fetchImageLs(true))
            .then(() => toast("The image has been deleted"))
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
                    <td>{image.RepoTags}</td>
                    <td className="DockerImages-image-id">{image.Id.slice(7)}</td>
                    <td>{timeConverter(image.Created)}</td>
                    <td>{sizeConverter(image.Size)}</td>
                    <td className="DockerImages-actions" >
                        <Button variant="success lg" onClick={onRun} disabled={loading}>
                            <i className="fa fa-play"></i>
                        </Button>
                        <Button variant="info lg" onClick={onInspect} disabled={loading}>
                            <i className="fa fa-eye"></i>
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

export default DockerImage;