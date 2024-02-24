import DashboardLayout from "../../components/common/layout";
import { useAuth } from "../../hooks/hooks";

const TodoPage = ()=>{
    useAuth();
    return(
        <DashboardLayout target="할일목록">

        </DashboardLayout>
    );
}

export default TodoPage;