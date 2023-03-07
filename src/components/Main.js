import { Button, Calendar, Carousel } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const onChange = (value) => {
    navigate(`/write/${value.format("YYYY-MM-DD")}`);
  };

  return <Calendar onChange={onChange} />;
};

export default Main;
