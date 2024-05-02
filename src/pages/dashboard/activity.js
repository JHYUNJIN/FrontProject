import ActivityCard from "../../components/activity/activityCard";
import ActivitySection from "../../components/activity/activitySection";
import DashboardLayout from "../../components/common/layout";
import { useAuth } from "../../hooks/hooks";

const ActivityPage = ()=>{
  useAuth();
  return(
    <DashboardLayout target="활동게시판">
      <h1>활동 게시판 페이지 입니다</h1>
      <p>사람들의 다양한 활동들을 경험해 보세요~</p>
      <ActivitySection />
    </DashboardLayout>
  );
}

export default ActivityPage;