import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Role } from "../types/role.type";

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [role, setRole] = useState<Role>("MEMBER");
    const [userId, setUserId] = useState(0);
    const { id } = useParams();
    const params = useParams();

    const fetchMembers = async () => {
        const members = await axios.get(`http://localhost:8000/api/v1/group/find/${params.id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setUserId(members.data.userId);
        setMembers(members.data.group.users);
        setRole(members.data.role);
    };

    const kickUser = async (userId: number) => {
        await axios.delete(`http://localhost:8000/api/v1/group/kick`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
            data: {
                groupId: id,
                userToKickId: userId
            },
        });
        fetchMembers();
    }

    useEffect(() => {
        fetchMembers();
    }, [id])

    return (
        <div id="member-wrapper">
            <div id="member">
                {members.map((member: any) => (
                    <div key={member.id}>
                        <h2>{member.firstname + ' ' + member.surname}</h2>
                        {role === "ADMIN" && member.id != userId ? <button onClick={() => kickUser(member.id)}>Kick</button> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MemberList;