import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const [diary, setDiary] = useState({});

  const getDiary = () => {
    console.log(params.id);
    //axios
    setDiary({ id: 1, title: "title", content: "content", date: "2023-03-07" });
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
    console.log(titleElement.input.value);
    console.log(contentElement.resizableTextArea.textArea.value);

    // 데이터를 만듬 {'title':'제목','content':"내용",date:'날짜'}
    const data = {
      title: titleElement.input.value,
      content: contentElement.resizableTextArea.textArea.value,
      date: params.date,
    };
    // axios 서버에 POST요청해서 저장
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
