import GroupList from "../components/groupList.component";
import MemberList from "../components/memberList.component";

interface Props {
    children: React.ReactNode
}

const GeneralLayout: React.FC<Props> = (props: Props) => {
    return (
        <div id="layout-wrapper">
            <GroupList />
            <div id="content-wrapper">
                {props.children}
            </div>
            <MemberList />
        </div>
    );
}

export default GeneralLayout;