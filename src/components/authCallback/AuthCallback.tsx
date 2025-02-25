import React, {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {fetchSession, getAccountDetails} from "../../api";
import {useDispatch} from "react-redux";
import {setAuthState} from "../../store/authSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    const handleAuthCallback = async () => {
      const requestToken = searchParams.get("request_token");
      const approved = searchParams.get("approved");

      if (approved !== "true" || !requestToken) {
        console.error("Authorization failed or canceled.");
        navigate("/moflix/login");
        toast.error("Login failed", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        return;
      }

      try {
        const sessionId = await fetchSession(requestToken);

        const accountDetails = await getAccountDetails(sessionId);

        dispatch(setAuthState({sessionId, accountDetails}));
        toast.success("Logged in!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        navigate("/movflix/profile");
      } catch (error) {
        console.error("Error during callback handling:", error);
        navigate("/movflix/login");
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div>
      <h1>{t("processing_login")}</h1>
    </div>
  );
};
