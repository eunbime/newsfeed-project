import React from "react";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("App", db);
  }, []);

  return <div>Firebase</div>;
}

export default App;
