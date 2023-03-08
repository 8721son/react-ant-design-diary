import { Badge, Button, Calendar, Card, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pickerData, setPickerData] = useState([]);

  const getData = () => {
    // axios -> get 데이터
    axios({
      method: "get",
      url: "http://localhost:8081/",
    })
      .then((response) => {
        const diaryData = response.data.content;
        setData(diaryData);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    getData();
    //페이지가 렌더링 될 때 data 받아와서 상태 등록
  }, []);

  const onChange = (value) => {
    navigate(`/write/${value.format("YYYY-MM-DD")}`);
  };

  const dateCellRender = (value) => {
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
    const pick = data.filter((d) => d.date === date.format("YYYY-MM-DD"));
    setPickerData(pick);
  };

  const updateDiary = (id) => {
    navigate(`/update/${id}`);
  };

  const deleteDiary = (id, date) => {
    // axios delete 요청
    axios({
      method: "delete",
      url: `http://localhost:8081/delete/${id}`,
    })
      .then((response) => {
        console.log(response);
        getData();

        const pick = data.filter((d) => d.date === date);
        setPickerData(pick);
      })
      .catch(() => {})
      .finally(() => {});
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
          <Button type='primary' onClick={() => deleteDiary(p.id, p.date)}>
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Main;
