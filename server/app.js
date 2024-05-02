const express = require('express');
// const bodyParser = require('body-parser');

const mysql = require('mysql2/promise');
// async를 사용하려면
// mysql2에서 promise객체를 불러와야한다.

const bcrypt = require('bcrypt');
// 비밀번호를 암호화 해주는 함수 선언

const jwt = require("jsonwebtoken");
// 로그인 성공 시 토큰을 발생하는 함수

// require( 'dotenv').config({path:'../.env.local'});
const dotenv = require('dotenv');
dotenv.config({path:'../.env.local'});

// mysql 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// import express from "express";
// const cors = require('cors');

const app = express();
const port = 3002;

// const db = require('../server/config/db');

app.use(express.json());
app.use(express.urlencoded( {extended : true} ));

// app.use(cors({origin: 'http://localhost:3001'}));

app.get('/api', (req, res)=>{
  res.send('정현진');
})

// app.get('/api/tbl_users', (req,res) => {
//   db.query('select * from tbl_users' (err,data) => {
//     if(!err){
//       res.send(data);
//     }
//     else { 
//       console.log(err);
//       res.send(err)
//     }
//   })
// })

// 모든 사원 조회
app.get('/api/employees', (req, res)=>{
  
  // mysql에서 employees 테이블 모든 행,컬럼 조회
  pool.query('SELECT * FROM employees', (err, rows, fields)=>{
    console.log('ddd');
    console.log(err);
    res.json(rows);
  });

});

// 사원 한명 추가
app.post('/api/employees', ()=>{});


// 토큰을 전달받아서 로그인한 사람의 email 주소를 되돌려주는 api
app.get('/api/loggedInEmail', (req, res)=>{
  // 리액트로부터 전달받은 토큰이 유효한지 확인하고
  // 유효하지 않으면 오류로 응답
  // 유효하면 email주소로 응답
  // 토큰은 요청 header의 Authorization에 Bearer ..... 토큰 값이 들어있다.
  // console.log(req.headers.authorization)
  // 문자열
  const token = req.headers.authorization.replace('Bearer ', '');
  // 받아 온 토큰 값 Bearer ...에서 Bearer띄어쓰기를 비어있는 문자열로 바꿔줘
  // console.log(token);
  // token은 로그인 당시 발급 받은 토큰

  try{
    let result = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(result);
  
    res.send(result.email);

  }catch(err){
    console.log(err);
    res.status(403).json('오류발생!');
  }

});

app.get('/api/users/:email', async (req, res)=>{
  //주소를 받아올 때 동적으로 변하는 부분은 : 으로 접근 가능하다.
  // console.log(req.params);
  const email = req.params.email;
  let sql = 
  `
    SELECT email, created_date, updated_date, profile_url, cover_url
    FROM tbl_users
    WHERE email = ?
  `;
  try{
    let [rows, fields] = await pool.query(sql, [email]);
    
    res.json(rows[0]);
  }
  catch(err){
    console.log(err);
    res.status(500).json('서버에 오류가 발생하였습니다.');
  }

});

// 회원 한명 추가
app.post('/api/users' , async (req, res)=>{
  console.log(req.body);
  const sql = `INSERT INTO tbl_users
  (email, pw, question, answer)
  VALUES (?, ?, ?, ?)
  `;
  let {email, password, question, answer} = req.body;

  let enPw = bcrypt.hashSync(password, 10);
  // 10은 비밀번호를 10승한 랜덤한 값이 들어가게 한다.
  // 관례적으로 10을 많이 사용하고 다른 숫자를 넣어도 상관없다.
  try{
    let [result, fields] = await pool.query(sql, [email, enPw, question, answer]);
    console.log('result:', result);
    console.log('fields:', fields);
    res.json('success');
  }
  catch(err){
    if(err.errno ===1406){
      // 아이디가 컬럼의 최대 허용 용량을 벗어났다 1406
      res.status(400).json({errCode : 1, errMsg :'아이디가 너무 깁니다.'});
      
    }else if (err.errno === 1062){
      // 아이디가 중복되었다 1062
      res.status(400).json({errCode:2 , errMsg:'동일한 아이디가 존재합니다.'});

    }else{
      // 그외
      res.status(400).json({errCode:3, errMsg:'서버에 오류가 발생하였습니다.'});
    }
  }
  // pool.query(`INSERT INTO tbl_users
  // (email, pw, question, answer)
  // VALUES (?, ?, ?, ?)
  // `, [req.body.email, req.body.password, req.body.question, req.body.answer] , 
  // (err, result, fields)=>{
  //   console.log('err', err);
  //   if(err !== null){
  //     if(err.errno ===1406){
  //       // 아이디가 컬럼의 최대 허용 용량을 벗어났다 1406
  //       res.status(400).json({errCode : 1, errMsg :'아이디가 너무 깁니다.'});
        
  //     }else if (err.errno === 1062){
  //       // 아이디가 중복되었다 1062
  //       res.status(400).json({errCode:2 , errMsg:'중복된 아이디가 존재합니다.'});

  //     }else{
  //       // 그외
  //       res.status(400).json({errCode:3, errMsg:'서버에 오류가 발생하였습니다.'});
  //     }
  //   }else{
  //     console.log('result:', result);
  //     console.log('fields:', fields);
  //     res.json('성공!');
  //   }
  // }
  // );
  
});


app.post('/api/login',async (req, res)=>{
  const {email, password} = req.body;

  // mysql에서 해당 email과 해당 password 존재하는지 조회(SELECT)함
  try{
    // let sql = await pool.query('SELECT * FROM tbl_users WHERE email=? AND pw=?',[email,password]);
    let sql = 'SELECT email, pw FROM tbl_users WHERE email=?';
    const [rows, fields] = await pool.query(sql, [email]);

    console.log(rows);
    if(rows.length === 0){//로그인에 실패하여 비어있는 배열이 출력되었다면
      res.status(404).json('아이디가 존재하지 않습니다.');
      return;
    }
    // 사용자가 로그인할때 입력한 일반 비밀번호랑, 암호화되어 저장된 비밀번호랑
    // 같은지 검사
    // 일반비밀번호: password
    // 암호화된 비밀번호 : rows[0].pw
    if(! bcrypt.compareSync(password, rows[0].pw)){
      // 이메일은 맞췄지만 비밀번호는 틀렸을 때 실행 될 구문
      // 같은 비밀번호면 true 아니면 false가 출력될텐데
      // password랑 rows[0] 같지 않아야 if문을 탈거기 때문에
      // 앞에 !(not)을 붙여준다.
      res.status(404).json('비밀번호가 다릅니다.');
      return;
    }


    // 로그인이 성공 했다면 
    // jwt 토큰 만들기
    // payload에는 {email:'로그인한사람이메일'}
    // 1시간짜리 유효한 토큰으로 만들기
    const accessToken = jwt.sign( {email : rows[0].email}, process.env.JWT_SECRET, {expiresIn:'1h'});
    //rows[0]에는 이메일 키 값이 들어있다.

    console.log(accessToken);
    // 만든 토큰을 객체에 담아서 리액트로 전달
    res.json( { accessToken } );

  }catch(err){
    res.status(500).json('mysql에서 오류발생');
  }
})



app.get('/api/jsonwebtokentest', (req, res)=>{

  let myToken = jwt.sign( {email:'abc@naver.com'} , 'tokenpw' , {expiresIn:'1s'} )
  // jwt.sign은 암호화 토큰을 만드는 함수이다.
  // expiresIn : '' --> 토큰유효시간

  console.log(myToken);


  // let decoded = jwt.decode(myToken ); // --> jwt.decode() 토큰을 해석하는 함수
  // console.log(decoded);

  let verify = jwt.verify(myToken , 'tokenpw');  // --> jwt.verify() 토큰이 유효한지 검사하는 함수

  console.log(verify);

  res.json('응답끝');
});

app.get('/api/career', async (req, res)=>{
  try{
    let sql = `
    select 
      id, 
      email,
      company, 
      position, 
      date_format(start_date, '%Y년 %m월 %d일') start_date,
      date_format(end_date, '%Y년 %m월 %d일') end_date 
    from tbl_careers
    where email = ?
    `
    let token = req.headers.authorization.replace('Bearer ', '');
    let { email } = jwt.verify(token, process.env.JWT_SECRET);

    // mysql가서 커리어 리스트 받아오고 
    let [results, fields] = await pool.query(sql, [email]);
    // 리액트한테 받아온 배열 응답하기
    res.json(results);
  }catch(err){
    console.log(err);
    res.status(500).json('서버쪽 오류 발생');
  }


});

// 커리어 추가 api
app.post('/api/career', async (req, res)=>{
  // email은 header에 있는 token에 들어있음
  const token = req.headers.authorization.replace('Bearer ', '');
  console.log(req.headers);
  let { email } = jwt.verify(token, process.env.JWT_SECRET);
  // 토큰에는 이메일과 토큰갱신시간, 종료시간이 들어가있는 객체가 들어있다.
  // 그중 email만 가져온다. {email}

  const {company, position, startDate, endDate} = req.body;

  let sql =`
  insert into tbl_careers
  (email, company, position, start_date, end_date)
  values
  (
    ?, 
    ?, 
    ?, 
    str_to_date(?, '%Y-%m-%d'), 
    ${ endDate === '' ? null : `str_to_date(?, '%Y-%m-%d')`}
  );
  `; // endDate가 비어있는 문자열이라면 null값이 들어가야 한다.
     
  let values = [email , company, position, startDate];
  if(endDate !== ''){
    values.push(endDate);
  }

  try{
    let [results, ] = await pool.query(sql, values);

    console.log(results);
    let [rows, ] = await pool.query('SELECT * FROM tbl_careers WHERE id=?', [results.insertId]);
    console.log(rows[0]);
    
    res.json(rows[0]);
    // 데이터베이스에 추가한 행을 리액트에 보내준다.

  }catch(err){
    console.log(err);
    res.status(500).json('서버에서 오류 발생함');
  }
  
});

// pool.query()는 데이터베이스의 쿼리문을 입력하는 함수.
app.delete('/api/career', async(req, res)=>{
  const {id} = req.body;
  // 삭제할 행 id 는 id에 들어있음
  try{
    await pool.query('DELETE FROM tbl_careers WHERE id = ?', [id]);

    res.json('삭제성공!');

  }catch(err){
    console.log(err);
    res.status(500).json('서버에서 오류 발생');
  }

});

// 경력 수정 내용 서버에 넘겨주기, 수정은 put요청
app.put('/api/careers', async (req, res)=>{
  // react에서 넘겨준 값들(수정값들)
  console.log(req.body);
  const {company, position, startDate, endDate, id} = req.body;

  // 로그인 유저가 요청했는지 여부 검사
  console.log(req.headers.authorization);
  let token = req.headers.authorization.replace('Bearer ', '');
  try{
    jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    res.status(403).json('토큰이 만료되었습니다. 다시 로그인 해주세요.');
    return;
  }

  // 정상적인 토큰이라면 mysql 가서 수정 요청
  let sql = `
    UPDATE tbl_careers
    SET company = ?, position = ?, start_date = ?, end_date = ?
    WHERE id = ?
  `;
  try{
    await pool.query(sql, [company, position, startDate, endDate, id]);
    res.send('경력 수정 완료!');
  }catch(err){
    console.log(err);
    res.status(500).json('오류 발생함!');
  }

});


//activities get요청(게시글 목록 조회)
// 몇페이지 ? , 몇개씩 ? , 정렬순서 ? 에 대한 정보를 리액트에게 알려준다.
// 한페이지에 4개씩 최신순으로 요청하자
app.get('/api/activities', async (req,res) => {
  console.log(req.query);
  let {order, limit, page, q} = req.query;
  limit = Number(limit);
  page = Number(page);

  let sql = `
  select c.id,c.title,c.content,c.writer_email,c.created_date,c.updated_date,c.activity_view,c.activity_like,
  if(d.email is null, 'no', 'yes') "liked"
  from (select 
    a.id,
    a.title,
      a.content,
      a.writer_email,
      a.created_date,
      a.updated_date,
      a.activity_view,
      IFNULL(b.like,0) "activity_like"
  from tbl_activities a 
  left outer join(
    select activity_id, count(*) "like"
      from tbl_activity_like
      group by activity_id
  )b
  on a.id = b.activity_id) c left outer join(select * from tbl_activity_like
  where email = ?) d
  on c.id = d.activity_id
    where title like ? 
  `;

  if(order==="view"){
    sql += "order by activity_view desc";
  }
  else if(order === "like"){
    sql += "order by activity_like desc";
  }
  else if(order === "dateAsc"){
    sql += "order by created_date asc";
  }
  else{
    sql += "order by created_date desc";
  }

  sql += " limit ? offset ?"; 
  // limit에는 페이지 당 보여질 개수 2
  // page에는 보여질 페이지 1-->0, 2-->2, 3-->4
  
  try{
        // 로그인 한 유저의 이메일 정보
        const token = req.headers.authorization.replace('Bearer ','');
        const user = jwt.verify(token, process.env.JWT_SECRET);

    let [results] = await pool.query(sql, [user.email, `%${q}%`,limit, limit*(page-1)]);
    // console.log(results); //results에는 게시물 객체들의 배열이 들어있다.

    // 게시물 이미지 가져오기
    sql = 'select img_url from tbl_activity_img where activity_id=?';
    // 각 객체 속에 게시물 이미지url 넣어주기
    for(let i=0;i<results.length;i++){
      let [imgs] = await pool.query(sql,[results[i].id]);
      // console.log("imgs : ",imgs);
      results[i].img_url = imgs.map(el=>el.img_url);
    }
  
    // 전체게시물 개수
    sql = `
      select count(*) "total_cnt"
      from tbl_activities
      where title like ?
    `;
  
    // 제목 검색 시 검색결과에 맞는 페이지 개수 카운팅
    const [results2] = await pool.query(sql, [`%${q}%`]);
    console.log(results2); // [{total_cnt : 5}]
    
    res.json( {total_cnt : results2[0].total_cnt, activityList : results} );
  }
  catch(err){
    console.log(err);
    res.status(500).json('게시글을 가져오던 중 오류발생')
  }
});

// 좋아요 테이블에 추가  => 필요한 정보(리액트가 줘야하는 건 게시물 id, 로그인한 사람 email)
app.post('/api/like', async(req, res) => {
  const id = req.body.id;  // 게시물 id
  const token = req.headers.authorization.replace('Bearer ', ''); //'Bearer ' 문자열 '' 빈문자열로 바꿔줘
  const user = jwt.verify(token, process.env.JWT_SECRET); // token 해석해줘
  // -->  user.email : user에 로그인 한 사람의 email이 들어있게 된다.

  let sql = `
    insert into tbl_activity_like
    values(? , ?);
  `;
  try{
    await pool.query(sql, [id, user.email]);
    res.json('좋아요 성공~♥')
  }catch(err){
    console.log(err);
    res.status(500).json('서버에서 오류 발생함 , 좋아요 추가 실패')
  }

})

// 좋아요 테이블에서 삭제(리액트가 줘야하는 건 게시물 id, 로그인한 사람 email)
app.delete('/api/like', async(req,res)=>{
  const id = req.body.id;  // 게시물 id
  const token = req.headers.authorization.replace('Bearer ', ''); //'Bearer ' 문자열 '' 빈문자열로 바꿔줘
  const user = jwt.verify(token, process.env.JWT_SECRET); // token 해석해줘
  // -->  user.email : user에 로그인 한 사람의 email이 들어있게 된다.
  let sql = `
    delete from tbl_activity_like
    where activity_id = ? and email = ?;
  `;
  
  try{
    await pool.query(sql, [id,user.email]);
    res.json('좋아요 취소 성공~♡');
  }catch(err){
    console.log(err);
    res.status(500).json('서버 오류 발생함');
  }
}) 

// 게시글 상세보기
app.get('/api/activities/:id', async (req, res)=>{
  const id = req.params.id; // 게시글 id
  const token = req.headers.authorization.replace('Bearer ','');
  const user = jwt.verify(token, process.env.JWT_SECRET);
  
  try{ 
    let sql = `
      select activity_view
      from tbl_activities
      where id = ?;
    `;
    let [views] = await pool.query(sql, [id]);
    // get 요청이 일어날 때마다 조회수가 올라간다.
    sql = `
      update tbl_activities
      set activity_view = ?
      where id = ?;
    `;
    await pool.query(sql, [views[0].activity_view + 1, id])

    sql = `
    select * from tbl_activities
    where id = ?
    `; // id부터 ~ 조회수 까지 출력
    let [result1] = await pool.query(sql, [id]);
    sql = `
    select count(*) "activity_like"
    from tbl_activity_like
    where activity_id = ?;
    `; // 좋아요 개수

    let [result2] = await pool.query(sql, [id]);
    
    
    sql = `
      select * from tbl_activity_like
      where activity_id = ? and email = ?;
    `; // 해당 이메일이 좋아요를 눌렀는지에 대한 여부
    let [result3] = await pool.query(sql, [id, user.email]);
                                            // user.email에는 로그인한 회원의 이메일이 들어있다.
    
    
    sql = `
      select * from tbl_activity_img
      where activity_id = ?;
    `; // 게시물에 대한 이미지
    let [result4] = await pool.query(sql, [id]);
    result1[0].activity_like = result2[0].activity_like;
    result1[0].liked = result3.length === 0 ? 'no' : 'yes';
    result1[0].img_url = result4.map((el) => el.img_url);
    result1[0].owner = user.email === result1[0].writer_email;
    // 게시글 작성자는 result1[0].writer_email 에 들어있다.

    console.log(result1[0]);
    res.json(result1[0]);
  }catch(err){
    console.log(err);
    res.status(500).json('오류발생');
  }

});

// 게시글 상세페이지 댓글
app.get('/api/comments', async (req, res)=>{
  const activityId = Number(req.query.activityId);
  const limit = Number(req.query.limit); // 댓글 개수, 몇개 ?
  const page = Number(req.query.page); // 페이지 , 몇페이지 ?
  const offset = (page-1) * limit;
  let sql=`
    select * from tbl_comments
    where activity_id = ?
    order by created_date asc
    limit ? offset ?;
  `


  try{
    const token = req.headers.authorization.replace('Bearer ','');
    let user = jwt.verify(token, process.env.JWT_SECRET);
    let [results] = await pool.query(sql, [activityId,limit,offset]);
    
    results = results.map((el)=> ({...el, owner:el.writer_email === user.email}));
    
    console.log(results); // 터미널에서 댓글 정보 확인
    res.json(results);
  }catch(err){
    res.status(500).json('댓글 오류 발생')
  }
});

app.post('/api/comments', async(req,res)=>{
  const token = req.headers.authorization.replace('Bearer ','');
  const user = jwt.verify(token,process.env.JWT_SECRET);
  const content = req.body.content;
  const activityId = req.body.activityId;

  let sql=`
    insert into tbl_comments
    (content, activity_id, writer_email)
      values(?,?,?)
    `;
    try{
      let [result] = await pool.query(sql,[content, activityId, user.email]);
      console.log(result); // 추가한 댓글의 정보가 출력됨 (insertId 가져오기)
      let [rows] = await pool.query('select * from tbl_comments where id=?',[result.insertId]);
      console.log(rows); // select는 배열이 반환된다. insert,delete,update는 객체가 반환된다.
      res.json({...rows[0], owner:rows[0].writer_email === user.email}); // 구조 분해 할당 
    }catch(err){ 
      res.status(500).json('댓글추가 : 서버오류 발생');
    }
});

app.delete('/api/comments', async (req,res)=>{
  const id = req.body.id; // react에서 받아온 삭제할 댓글 ID
  try{
    await pool.query('delete from tbl_comments where id = ?',[id]);
    res.json('댓글삭제 성공');
  }catch(err){
    res.status(500).json('오류발생');
  }
});

app.put('/api/comments', async (req,res)=>{
  const id = req.body.id; // 댓글 ID
  const content = req.body.content; // 댓글 내용
  const token = req.headers.authorization.replace(`Bearer `,''); // 토큰(사용자 정보) 가져오기
  const user = jwt.verify(token, process.env.JWT_SECRET); // 토큰해석 → user.email

  // 댓글 수정 쿼리
  let sql = `
    update tbl_comments
    set content=?, updated_date=now()
    where id=?
  `;
  try{
    let [result] = await pool.query(sql, [content,id]); // 댓글수정 쿼리 실행
    console.log(result);

    let [rows] = await pool.query('select * from tbl_comments where id=?',[id]); // 수정된 댓글 배열 반환
    console.log('rows : ',rows); // 구조분해할당 , 반환배열에 owner key와 value추가, 값은 true 또는 false
    res.json({...rows[0], owner: rows[0].writer_email === user.email}); 
    // res.json('댓글수정 성공');, 참고) 삭제버튼은 owner 값이 true일 경우 보여진다.
  }catch(err){
    res.status(500).json('mysql 오류 발생');
  }
});


app.listen(port, ()=>{ // port == 3002
  console.log(`express 서버 실행됨! 포트:${port}`);
});