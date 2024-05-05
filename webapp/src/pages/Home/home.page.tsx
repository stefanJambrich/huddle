import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Home = () => {
    const [groups, setGroups] = useState([]);
    const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);
    const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);

    const fetchGroups = async () => {
        const groups = await axios.get("http://localhost:8000/api/v1/group/all", {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setGroups(groups.data);
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

    const joinGroup = async (e: any) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/v1/group/addUser", {
            inviteCode: e.target[0].value,
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        fetchGroups();
        setInviteModalIsOpen(false);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <div id="home-wrapper">
            <div id="groups-wrapper">
                <h1 id="home-title">Home</h1>
                {groups.map((group: any) => (
                    <Link key={group.id} to={`/${group.id}`} id="group-name">
                        <h2>{group.name}</h2>
                    </Link>
                ))}
            </div>
            <div id="home-buttons-wrapper">
                <h1>Welcome to Huddle :)</h1>
                <div>
                    <button onClick={() => setGroupModalIsOpen(true)}>Create a new Group</button>
                    <Modal isOpen={groupModalIsOpen} className={"modal"}>
                        <div>
                            <h1>Create a new Group</h1>
                            <form onSubmit={(event) => createGroup(event)}>
                                <input type="text" placeholder="Group Name"/>
                                <button type="submit">Create</button>
                            </form>
                            <button onClick={() => setGroupModalIsOpen(false)}>Close</button>
                        </div>
                    </Modal>
                </div>
                <div>
                <button onClick={() => setInviteModalIsOpen(true)}>Join a Group</button>
                    <Modal isOpen={inviteModalIsOpen} className={"modal"}>
                        <div>
                            <h2>Join a Group</h2>
                            <form onSubmit={(event) => joinGroup(event)}>
                                <input type="text" placeholder="Invite code"/>
                                <button type="submit">Join</button>
                            </form>
                            <button onClick={() => setInviteModalIsOpen(false)}>Close</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Home;