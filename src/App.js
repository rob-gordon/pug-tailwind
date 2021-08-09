import "./styles.css";
import { compile } from "pug";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const slowInput = useDebounce(input, 500);
  const fn = useCallback(compile(slowInput), [slowInput]);
  return (
    <div className="App">
      <textarea onChange={(e) => setInput(e.target.value)} value={input} />
      <div dangerouslySetInnerHTML={{ __html: fn && fn() }} />
    </div>
  );
}

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
