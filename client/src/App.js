import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Homepage from "./pages/homepage/homepage";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserSignedIn(true);
    else setIsUserSignedIn(false);
  }, []);

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  const onLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsUserSignedIn(false);
  };

  return (
    (isUserSignedIn && <Homepage onLogout={onLogout}/>) || (
      <Login onLoginSuccessful={onLoginSuccessful} />
    )
  );
}

export default App;
