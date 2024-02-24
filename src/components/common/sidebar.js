import { AsideLogo, AsideMenuItem, DashboardAside, LogoText, Menu } from "../../styles/common/aside.styles";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useNavigate } from "react-router-dom";

const DashboardSidebar = (props)=>{
  // props.isOpen을 사용하기 위해 props를 받아온다.

  let items = [ 
    {icon : <DashboardOutlinedIcon/> , title:'Overview' , path:'/overview'},
    {icon : <AssignmentIndOutlinedIcon/> , title:'경력' , path:'/career'},
    {icon : <TopicOutlinedIcon/> , title:'활동게시판' , path:'/activity'},
    {icon : <ChecklistOutlinedIcon/> , title:'할일목록' , path:'/todo'},
  ];

  const navigate = useNavigate();

  return(
    <DashboardAside style={{transform : props.isOpen ? '' : 'translateX(-100%'}} >
      <AsideLogo>
        <img src={'/logo.svg'} alt="logo"/>
        <LogoText>Portfolio For</LogoText>
      </AsideLogo>
      <nav>
        <Menu>
          {/* map함수를 사용하면 반드시 key 값을 줘야한다. */}
          {items.map((el)=><li key={el.title} onClick={()=>{navigate(el.path)}}>
            <AsideMenuItem active={el.title === props.target}>
              {el.icon}
              <p>{el.title}</p>
              <KeyboardArrowRightOutlinedIcon/>
            </AsideMenuItem>
          </li>)}

        </Menu>
      </nav>
    </DashboardAside>
  );
}

export default DashboardSidebar;