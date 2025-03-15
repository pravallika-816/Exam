import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/protected", { headers: { Authorization: token } })
      .then((res) => setMessage(res.data.msg))
      .catch(() => setMessage("Access denied"));
  }, []);

  return <h1>{message}</h1>;
};

export default ProtectedPage;
