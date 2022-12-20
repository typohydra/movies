import { useEffect, useState } from "react";
import UnAuthMain from "./pages/UnAuthMain";
import AuthMain from "./pages/AuthMain";

const App = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
    }
  }, []);

  if (token) {
    return <AuthMain setToken={setToken} />;
  }

  return <UnAuthMain setToken={setToken} />;
};

export default App;
