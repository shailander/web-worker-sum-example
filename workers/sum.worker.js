onmessage = (e) => {
  const num = e.data;
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  postMessage(sum);
};

export default {};
