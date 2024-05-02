import { Pagination } from "@mui/material";
import { ActivityBody, ActivityFooter, ActivityInput, ActivitySectionHeader, ActivitySelect, ActivityWriteBtn } from "../../styles/dashboard/activity.styles";
import ActivityCard from "./activityCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {debounce} from "lodash";
import { UserContext } from "../../App";

const ActivitySection = ()=>{
    const cntPerPage = 4;
    const [activityList, setActivityList] = useState([]);
    const [totalPage , setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [order,setOrder] = useState('dateDesc');
    const [searchText, setSearchText] = useState('');
    const {accessToken} = useContext(UserContext);

    useEffect( ()=>{
        let tmp = async ()=>{
            try{
                if(accessToken === null){
                    return; // 토큰이 유효하지 않으면 종료
                }
                let res = await axios.get(`/api/activities?order=${order}&limit=${cntPerPage}&page=${currentPage}&q=${searchText}`,
                {headers : {Authorization : `Bearer ${accessToken}`}}
                );
                // let res = await axios.get('/api/activities?order=like&limit=4&page=1');
                // res.data.toatal_cnt --> 전체 게시물 개수 --> 계산 총 필요한 페이지 개수
                // 전체게시물개수   페이지당게시물개수    총페이지
                //  10                  3                 4
                //  10                  2                 5
                // 총페이지 개수 = 올림(전체게시물개수 / 페이지당게시물개수)
                // console.log(res.data)
                setTotalPage(Math.ceil(res.data.total_cnt / cntPerPage));
                setActivityList(res.data.activityList);

            }catch(err){
                // console.log(err);
                alert('게시글을 가져오던 중 오류가 발생했습니다.');
            }
        }

        tmp();
    }, [currentPage, order, searchText, accessToken]);
    // []안에 아무것도 넣지 않으면 최초 실행 될 때 
    // 한번만 렌더링 된다.
    // currentPage가 바뀔 때 마다 랜더링 된다.

    const onPageChange = (e, value)=>{
        setCurrentPage(value);
    }

    const onOrderChange = (e)=>{
        // console.log(e.target.value);
        setOrder(e.target.value);
        setCurrentPage(1);
    }

    const onSearchChange = debounce( (e)=>{
        setSearchText(e.target.value);
        setCurrentPage(1); 
        //좋아요순이나 최신순 같은 조건으로 바꿀 때 현재 페이지를 1로 바꿔주는 함수
    }, 500);


    return( 
        <section>
            <ActivitySectionHeader>
                <ActivityInput 
                    onChange={onSearchChange} 
                    placeholder="제목으로 검색"
                />
                <ActivitySelect value={order} onChange={onOrderChange}>
                    <option value="dateDesc">최신순</option>
                    <option value="dateAsc">오래된순</option>
                    <option value="like">좋아요순</option>
                    <option value="view">조회수순</option>
                </ActivitySelect>
                <ActivityWriteBtn>글 쓰기</ActivityWriteBtn>
            </ActivitySectionHeader>
            <ActivityBody>
                {
                    activityList.map((el) => <ActivityCard key={el.id} activity={el}/>)
                }
            </ActivityBody>
            <ActivityFooter >
                <Pagination onChange={onPageChange} page={currentPage} count={totalPage}/>
            </ActivityFooter>
        </section>
    );
}

export default ActivitySection;