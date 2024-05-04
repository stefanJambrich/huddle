import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        const groups = await axios.get("http://localhost:8000/api/v1/group/all", {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setGroups(groups.data);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <div>
            <Link to={"/"}>Home</Link>
            <h2>Groups:</h2>
            <div>
                {groups.map((group: any) => (
                    <Link key={group.id} to={`/${group.id}`}>
                        <h2>{group.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GroupList;