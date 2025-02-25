import React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Share.module.css";
import {FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaLink} from "react-icons/fa";
import {useTranslation} from "react-i18next";

interface ShareProps {
  title: string;
  url?: any;
}

export const Share: React.FC<ShareProps> = ({title, url}) => {
  const currentUrl = url || window.location.href;
  const {t} = useTranslation();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success(t("link_copied_to_clipboard"), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
  };

  return (
    <div className={classes.shareContainer}>
      <h3 className={classes.shareTitle}>{t("share_this_content")}</h3>
      <div className={classes.shareButtons}>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${currentUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.shareButton}
        >
          <FaWhatsapp />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.shareButton}
        >
          <FaFacebook />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}: ${currentUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.shareButton}
        >
          <FaTwitter />
        </a>

        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`}
          className={classes.shareButton}
        >
          <FaEnvelope />
        </a>

        <button className={classes.shareButton} onClick={handleCopyLink}>
          <FaLink />
        </button>
      </div>
    </div>
  );
};
