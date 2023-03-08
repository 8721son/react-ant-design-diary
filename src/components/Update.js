import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [diary, setDiary] = useState({});

  const getDiary = () => {
    //axios
    axios({
      method: "get",
      url: `http://localhost:8081/${params.id}`,
    })
      .then((response) => {
        const diaryData = response.data.content;
        setDiary(diaryData);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    getDiary();
  }, []);

  const refs = useRef({
    titleElement: null,
    contentElement: null,
  });

  const updateDiary = () => {
    // 제목, 내용 가지고와서
    const { titleElement, contentElement } = refs.current;

    const data = {
      title: titleElement.input.value,
      content: contentElement.resizableTextArea.textArea.value,
    };

    axios({
      method: "put",
      url: `http://localhost:8081/update/${params.id}`,
      data: data,
    })
      .then((response) => {
        navigate("/");
      })
      .catch(() => {})
      .finally(() => {});
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <div>
      <Input
        ref={(r) => (refs.current.titleElement = r)}
        addonBefore={"제목"}
        showCount
        maxLength={20}
        value={diary.title}
      />
      <br />
      <br />
      <TextArea
        ref={(r) => (refs.current.contentElement = r)}
        value={diary.content}
        showCount
        maxLength={300}
        style={{ height: "500px" }}
      />
      <br />
      <Button type='primary' onClick={updateDiary}>
        수정
      </Button>
      <Button type='primary' danger onClick={cancel}>
        취소
      </Button>
    </div>
  );
};

export default Update;
