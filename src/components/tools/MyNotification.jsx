import React, { useEffect, useState } from "react";
import css from "../home.module.css";

export const MyNotification = ({ message }) => {
  const [visible, setVisible] = useState(true);
  const isError = message.includes("Failed to add movie to favorites");
  const isPending = message.includes("Waiting response from server");
  const isSuccess = message.includes("Movie added to favorites successfully");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isError) {
    return visible ? <div className={css.error}>{message}</div> : null;
  } else if (isPending) {
    return visible ? <div className={css.pending}>{message}</div> : null;
  } else if (isSuccess) {
    return visible ? <div className={css.notification}>{message}</div> : null;
  }

  return visible ? <div className={css.notification}>{message}</div> : null;
};
