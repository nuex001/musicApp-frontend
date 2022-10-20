import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// const solu = (num) => {
//   let sum = 1;
//   if (num !== 1) {
//     for (let index = num; index > 0; index--) {
//       sum = sum * index;
//     }
//   }
//   return sum;
// };
// console.log(solu(5));

// const timezone = Init.DateTimeFormat().resolvedOptions().timeZone;
// console.log(timezone);
