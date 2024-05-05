import { useParams } from "react-router-dom";
import GeneralLayout from "../../layouts/general.layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Role } from "../../types/role.type";

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [announcements, setAnnouncements] = useState([]);
    const [annModalIsOpen, setAnnModalIsOpen] = useState(false);
    const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
    const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);
    const [inviteCode, setInviteCode] = useState();
    const [role, setRole] = useState<Role>("MEMBER");

    const fetchGroup = async () => {
        const group = await axios.get(`http://localhost:8000/api/v1/group/find/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setRole(group.data.role);
        setGroup(group.data.group.name);
    };

    const fetchAnnouncements = async () => {
        const announcements = await axios.get(`http://localhost:8000/api/v1/announcement/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setAnnouncements(announcements.data);
    };

    const createAnnouncement = async (e: any) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/announcement/", {
            title: e.target[0].value,
            content: e.target[1].value,
            groupId: id,
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        fetchAnnouncements();
        setAnnModalIsOpen(false);
    };

    const createComment = async (e: any, announcementId: number) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/comment/", {
            content: e.target[0].value,
            announcementId: announcementId,
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        fetchAnnouncements();
        setCommentModalIsOpen(false);
    }

    const generateInviteCode = async () => {
        const inviteCode = await axios.get(`http://localhost:8000/api/v1/inviteCode/generate/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        console.log(inviteCode.data);
        setInviteCode(inviteCode.data.code);
    }

    const deleteGroup = async () => {
        await axios.delete(`http://localhost:8000/api/v1/group/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        window.location.href = "/";
    }

    const deleteAnnouncement = async (announcementId: number) => {
        await axios.delete(`http://localhost:8000/api/v1/announcement/?announcementId=${announcementId}&groupId=${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        fetchAnnouncements();
    }

    useEffect(() => {
        fetchGroup();
        fetchAnnouncements();
    }, [id]);

    return (
        <GeneralLayout>
            <div>
                <div id="group-top-wrapper">
                    <h1>{group}</h1>
                    <div>
                        <button onClick={() => setAnnModalIsOpen(true)}>New Post</button>
                        <button id="invite-code-btn" onClick={() => setInviteModalIsOpen(true)}>Generate Invite Code</button>
                        <Modal isOpen={inviteModalIsOpen} className={"modal"}>
                            <div>
                                <h2>Generate Invite code</h2>
                                <p><span>Invite Code: </span>{inviteCode}</p>
                                <button type="submit" onClick={() => generateInviteCode()}>Generate</button>
                                <button onClick={() => setInviteModalIsOpen(false)}>Close</button>
                            </div>
                        </Modal>
                        {role === "ADMIN" ? <button onClick={() => deleteGroup()}>Delete Group</button> : null}
                    </div>
                </div>
                <Modal isOpen={annModalIsOpen} className={"modal"}>
                    <div>
                        <h2>New Post</h2>
                        <form onSubmit={(event) => createAnnouncement(event)}>
                            <input type="text" placeholder="Title" />
                            <textarea placeholder="Content" />
                            <button type="submit">Post</button>
                        </form>
                        <button onClick={() => setAnnModalIsOpen(false)}>Close</button>
                    </div>
                </Modal>
                {announcements.map((announcement: any) => (
                    <div key={announcement.id} id="post-wrapper">
                        <div id="title-wrapper">
                            <h2>{announcement.title}</h2>
                            {role === "ADMIN" ? <button onClick={() => deleteAnnouncement(announcement.id)}>Delete</button> : null}
                        </div>
                        <p>{announcement.content}</p>
                        <button id="new-comment-btn" onClick={() => setCommentModalIsOpen(true)}>Add comment</button>
                        <Modal isOpen={commentModalIsOpen} className={"modal"}>
                            <div>
                                <h2>New Post</h2>
                                <form onSubmit={(event) => createComment(event, announcement.id)}>
                                    <textarea placeholder="Content" />
                                    <button type="submit">Post</button>
                                </form>
                                <button onClick={() => setCommentModalIsOpen(false)}>Close</button>
                            </div>
                        </Modal>
                        <div id="comment-wrapper">
                            <h2>Comments:</h2>
                            {announcement.comments.map((comment: any) => (
                                <div key={comment.id}>
                                    <h3>{comment.username}:</h3>
                                    <p>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </GeneralLayout>
    );
}

export default Group;