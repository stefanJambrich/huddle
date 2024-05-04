import { useParams } from "react-router-dom";
import GeneralLayout from "../../layouts/general.layout";
import axios from "axios";
import { useEffect, useState } from "react";

const Group = () => {
    const { id } = useParams();
    const [group, setGroup] = useState();

    const fetchGroup = async () => {
        const group = await axios.get(`http://localhost:8000/api/v1/group/find/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        });
        setGroup(group.data.name);
    };

    useEffect(() => {
        fetchGroup();
    }, [id]);

    return (
        <GeneralLayout>
            <div>
                <h1>Name: {group}</h1>
            </div>
        </GeneralLayout>
    );
}

export default Group;