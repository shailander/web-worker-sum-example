import { useEffect, useState, useRef } from "react";
export default function Home() {
  const [worker, setWorker] = useState();
  const [num, setNum] = useState(0);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [sum, setSum] = useState(0);

  const [counter, setCounter] = useState(0);

  const intervalId = useRef(0);

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/sum.worker.js", import.meta.url)
    );

    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = (event) => {
        console.log("Finished calculating");
        setSum(event.data);
        clearInterval(intervalId.current);
      };
    }
  }, [worker]);

  const handleStartWorker = () => {
    if (!num) {
      setError("Enter a number first");
      return;
    }
    setTimer(0);
    setSum(0);
    intervalId.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
    console.log("Started Calculating");
    worker.postMessage(num);
  };

  return (
    <div>
      <h1>Worker Demo by Sum (1 to N)</h1>
      <div>
        Enter the number :{" "}
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        &emsp;Eg: Use a 9 digit number
      </div>
      {error}
      <div>
        <button onClick={handleStartWorker}>Start Worker</button>
        &emsp;<span>Time took : {timer}</span>
      </div>
      <span>Sum : {sum}</span>
      <br />
      <br />
      <div>
        <span>
          Meanwhile woker is working in the background, check how other
          functionaity is also working
        </span>
      </div>
      Counter : {counter}
      <div>
        <button onClick={() => setCounter((prev) => prev + 1)}>
          Increase counter
        </button>
        <button onClick={() => setCounter(0)}>Reset counter</button>
      </div>
    </div>
  );
}
