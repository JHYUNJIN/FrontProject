import { useParams } from "react-router-dom"
import DashboardLayout from "../../components/common/layout"
import { useAuth } from "../../hooks/hooks";
import ActivityDetailSection from "../../components/activity/activityDetailSection";
import ActivityCommentSection from "../../components/activity/activityCommentSection";
const ActivityDetailPage = () => {
  useAuth();
  const params = useParams();
  // console.log(params);  

  return(
    <DashboardLayout target = "활동게시판">
      <h1>{params.id}번 게시글 상세 페이지</h1>
      <ActivityDetailSection activityId={params.id}/>
      <ActivityCommentSection activityId = {params.id}/>
    </DashboardLayout>
  );
}


export default ActivityDetailPage;