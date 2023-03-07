import { Badge, Button, Calendar, Card, Carousel, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pickerData, setPickerData] = useState([]);

  const getData = () => {
    // axios -> get 데이터
    let data = [
      { id: 1, title: "title1", content: "content1", date: "2023-03-07" },
      { id: 2, title: "title2", content: "content2", date: "2023-03-07" },
      { id: 3, title: "title3", content: "content3", date: "2023-03-08" },
      { id: 4, title: "titl4", content: "content4", date: "2023-03-09" },
    ];
    setData(data);
  };

  useEffect(() => {
    getData();
    //페이지가 렌더링 될 때 data 받아와서 상태 등록
  }, []);

  const onChange = (value) => {
    navigate(`/write/${value.format("YYYY-MM-DD")}`);
  };

  const dateCellRender = (value) => {
    // console.log(value.format("YYYY-MM-DD"));
    const calendarData = [];
    // 같은 날짜에 데이터가 있으면 calendarData에 담아서 ui를 바로 리턴
    //삼항연산자(참,거짓) / 조건부 렌더링(참)
    data.map(
      (d) => d.date === value.format("YYYY-MM-DD") && calendarData.push(d)
    );

    return (
      <ul>
        {calendarData.map((item) => (
          <li key={item.id} style={{ listStyle: "none" }}>
            <Badge color='green' text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const selectDate = (date) => {
    console.log(date.format("YYYY-MM-DD"));
    const pick = data.filter((d) => d.date === date.format("YYYY-MM-DD"));
    console.log(pick);
    setPickerData(pick);
  };

  const updateDiary = (id) => {
    navigate(`/update/${id}`);
  };

  const deleteDiary = () => {
    // axios delete 요청
    getData();
  };

  return (
    <div>
      <Calendar onChange={onChange} dateCellRender={dateCellRender} />
      <DatePicker onChange={selectDate} />
      {pickerData.map((p) => (
        <div>
          <Card
            title={p.title}
            style={{
              width: 300,
            }}
          >
            <p>{p.content}</p>
          </Card>
          <Button type='primary' onClick={() => updateDiary(p.id)}>
            수정
          </Button>
          <Button type='primary' onClick={deleteDiary}>
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Main;
