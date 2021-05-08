export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://frontrow-task-api.herokuapp.com/";
