import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const { id } = useParams();
    const params = useParams();

    const fetchMembers = async () => {
        const members = await axios.get(`http://localhost:8000/api/v1/group/find/${params.id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setMembers(members.data.users);
    };

    useEffect(() => {
        fetchMembers();
    }, [id])

    return (
        <div>
            <h2>Members:</h2>
            <div>
                {members.map((member: any) => (
                    <div key={member.id}>
                        <h2>{member.firstname + member.surname}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MemberList;