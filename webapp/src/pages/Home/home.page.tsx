import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Home = () => {
    const [groups, setGroups] = useState([]);
    const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);

    const fetchGroups = async () => {
        const groups = await axios.get("http://localhost:8000/api/v1/group/all", {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setGroups(groups.data);
        console.log(groups.data);
    };

    const createGroup = async (e: any) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/group/", {
            name: e.target[0].value,
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        fetchGroups();
        setGroupModalIsOpen(false);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <div>
                {groups.map((group: any) => (
                    <Link key={group.id} to={`${group.id}`}>
                        <h2>{group.name}</h2>
                    </Link>
                ))}
            </div>
            <div>
                <div>
                    <button onClick={() => setGroupModalIsOpen(true)}>Create a new Group</button>
                    <Modal isOpen={groupModalIsOpen}>
                        <h2>Create a new Group</h2>
                        <form onSubmit={(event) => createGroup(event)}>
                            <input type="text" placeholder="Group Name"/>
                            <button type="submit">Create</button>
                        </form>
                    </Modal>
                </div>
                <button>Join a Group</button>
            </div>
        </div>
    );
}

export default Home;