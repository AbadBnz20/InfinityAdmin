import React, { useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";

export const ContentTimer = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <div className="flex items-center"><IoTimeOutline size={18}/> <span> {seconds}s</span> </div>
  );
};
