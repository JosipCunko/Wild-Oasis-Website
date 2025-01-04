"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((cur) => cur + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
