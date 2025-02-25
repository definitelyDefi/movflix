import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./review.module.css";
import dayjs from "dayjs";
import sample_avatar from "./../../../../assets/sample_avatar.jpg";
import {useTranslation} from "react-i18next";

interface ReadMoreProps {
  children: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({children}) => {
  const {t} = useTranslation();
  const text = children;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </Modal.Body>
      </Modal>

      <span className={classes.text}>
        <span
          dangerouslySetInnerHTML={{
            __html: text.length > 400 ? `${text.slice(0, 400)}...` : text,
          }}
        />
        {text.length > 400 && (
          <span onClick={handleShow} className={classes.button}>
            {t("read_more")}
          </span>
        )}
      </span>
    </>
  );
};

interface ReviewProps {
  avatar_path?: string | null;
  author: string;
  content: string;
  created_at: string;
  rating?: number | null;
}

export const Review: React.FC<ReviewProps> = ({avatar_path, author, content, created_at, rating}) => {
  const formatDate = (date: string): string => {
    return dayjs(date).format("DD.MM.YYYY");
  };

  const getAvatarUrl = (path: string | null | undefined): string => {
    if (!path) return sample_avatar;
    if (path.startsWith("/https")) return path.slice(1);
    return `https://secure.gravatar.com/avatar/${path}?s=64`;
  };

  return (
    <div className={classes.sliderElement}>
      <div className={classes.info}>
        <img className={classes.sliderThumb} src={getAvatarUrl(avatar_path)} alt="avatar" />
        <h1 className={classes.username}>{author}</h1>
        {rating !== null && rating !== undefined && <h1 className={classes.rating}>{`${rating}/10`}</h1>}
      </div>
      <div className={classes.content}>
        <ReadMore>{content}</ReadMore>
      </div>
      <div className={classes.date}>
        <h4 className={classes.dateTime}>{formatDate(created_at)}</h4>
      </div>
    </div>
  );
};
