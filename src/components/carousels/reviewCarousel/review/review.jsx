import React from "react";
import classes from "./review.module.css";
import sample_avatar from "./../../../../assets/sample_avatar.jpg";
import Modal from "react-bootstrap/Modal";

import dayjs from "dayjs";
import { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isReadMore] = useState(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{text}</Modal.Body>
      </Modal>

      <span className={classes.text}>
        {isReadMore ? text.slice(0, 400) : handleShow}
        {text.length > 400 ? (
          <span onClick={handleShow} className={classes.button}>
            {"...read more"}
          </span>
        ) : null}
      </span>
    </>
  );
};

export const Review = (props) => {
  const get_date = (date) => {
    const dateobj = dayjs(date);
    const date_time = dateobj.format("DD.MM.YYYY");
    return date_time;
  };
  const { avatar_path, author, content, created_at } = props;

  return (
    <div className={classes.sliderElement}>
      <div className={classes.info}>
        <img
          className={classes.sliderThumb}
          src={
            avatar_path != null && avatar_path.startsWith("/https")
              ? avatar_path.slice(1, -1)
              : avatar_path != null
              ? `https://secure.gravatar.com/avatar/${avatar_path}?s=64`
              : sample_avatar
          }
          alt={"avatar"}
        />
        <h1 className={classes.username}>{author}</h1>
      </div>

      <div className={classes.content}>
        <p className={classes.startText}>
          <ReadMore>{content}</ReadMore>
        </p>
      </div>
      <div className={classes.date}>
        <h4 className={classes.dateTime}>{get_date(created_at)}</h4>
      </div>
    </div>
  );
};
