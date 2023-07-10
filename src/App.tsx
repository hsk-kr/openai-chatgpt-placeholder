import Main from './pages/Main';

function App() {
  return <Main />;
}

export default App;

// function App() {
//   const [titles, setTitles] = useState("");

//   const handleGetChatTitles = () => {
//     (async () => {
//       const [tab] = await chrome.tabs.query({
//         active: true,
//       });

//       const response = await chrome.tabs.sendMessage<
//         chrome.custom.ChromeMessage,
//         chrome.custom.ChromeMessageResponse
//       >(tab.id ?? 0, {
//         type: "GET_CHAT_TITLES",
//       });

//       setTitles(response.titles.join(","));
//     })()
//       .then(() => {
//         console.log("okay");
//       })
//       .catch(() => {
//         console.log("error");
//       });
//   };

//   const handleSetPlaceHolder: React.KeyboardEventHandler<HTMLInputElement> = (
//     e
//   ) => {
//     (async () => {
//       const [tab] = await chrome.tabs.query({
//         active: true,
//       });

//       await chrome.tabs.sendMessage<chrome.custom.ChromeMessage>(tab.id ?? 0, {
//         type: "SET_PLACEHOLDER",
//         placeholder: (e.target as HTMLInputElement).value,
//       });
//     })()
//       .then(() => {
//         console.log("okay");
//       })
//       .catch(() => {
//         console.log("error");
//       });
//   };

//   return (
//     <>
//       <button type="button" onClick={handleGetChatTitles}>
//         Get Chat Titles
//       </button>
//       <input type="text" onKeyUp={handleSetPlaceHolder} />
//       <div>{titles}</div>
//     </>
//   );
// }

// export default App;
