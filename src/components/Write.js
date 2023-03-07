import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const refs = useRef({
    titleElement: null,
    contentElement: null,
  });

  const save = () => {
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
      />
      <br />
      <br />
      <TextArea
        ref={(r) => (refs.current.contentElement = r)}
        placeholder='내용을 입력하세요.'
        showCount
        maxLength={300}
        style={{ height: "500px" }}
      />
      <br />
      <Button type='primary' onClick={save}>
        저장
      </Button>
      <Button type='primary' danger onClick={cancel}>
        취소
      </Button>
    </div>
  );
};

export default Write;
