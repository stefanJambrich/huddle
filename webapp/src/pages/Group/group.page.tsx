import { useParams } from "react-router-dom";
import GeneralLayout from "../../layouts/general.layout";
import axios from "axios";
import { useEffect, useState } from "react";

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState();
    const [announcements, setAnnouncements] = useState([]);

    const fetchGroup = async () => {
        const group = await axios.get(`http://localhost:8000/api/v1/group/find/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setGroup(group.data.name);
    };

    const fetchAnnouncements = async () => {
        const announcements = await axios.get(`http://localhost:8000/api/v1/announcement/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setAnnouncements(announcements.data);
    };

    useEffect(() => {
        fetchGroup();
        fetchAnnouncements();
    }, [id]);

    return (
        <GeneralLayout>
            <div>
                <h1>Name: {group}</h1>
                <button>Create announcement</button>
                {announcements.map((announcement: any) => (
                    <div key={announcement.id}>
                        <h2>{announcement.title}</h2>
                        <p>{announcement.content}</p>
                        <button>Add comment</button>
                        <div>
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