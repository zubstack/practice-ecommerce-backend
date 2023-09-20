const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

export default { info, error };
