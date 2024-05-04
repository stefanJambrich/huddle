import { useParams } from "react-router-dom";
import GeneralLayout from "../../layouts/general.layout";

const Group = () => {
    const params = useParams();

    return (
        <GeneralLayout>
            <div>
                <h1>Group</h1>
                <p>ID: {params.id}</p>
            </div>
        </GeneralLayout>
    );
}

export default Group;