import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />,
  document.getElementById("view-tab"));

// chrome.cookies.getAll({ 'domain': '.jd.com' }, function (cookies) {
//   let ck = "";
//   cookies.forEach((cookie) => {
//     if (cookie.name == "pt_pin" || cookie.name == "pt_token") {
//       ck += `${cookie.name}=${cookie.value};`;
//     }
//   })

//   console.log(ck);
// });