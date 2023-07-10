// import { ChromeMessage, ChromeMessageResponse } from "../types/chrome.d.ts";

let placeholder = "";

const messagesFromReactAppListener = (
  msg: chrome.custom.ChromeMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: chrome.custom.ChromeMessageResponse) => void
) => {
  switch (msg.type) {
    case "GET_CHAT_TITLES":
      {
        const titles: string[] = [];

        try {
          const navElmt = document.querySelector("nav");

          if (!navElmt) {
            throw new Error("there is no nav");
          }

          const titleElmtList = navElmt.querySelectorAll("li");
          titleElmtList.forEach((titleElmt) => {
            titles.push(titleElmt.innerText);
          });
        } catch (e) {
          console.error(e);
        } finally {
          console.log("titles", titles);
          sendResponse({
            type: "GET_CHAT_TITLES",
            titles,
          });
        }
      }
      break;
    case "SET_PLACEHOLDER":
      {
        placeholder = msg.placeholder;
        console.log(`placeholder has changed -> ${placeholder}`);
      }
      break;
  }
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

{
  (() => {
    setInterval(() => {
      if (!placeholder) return;
      const textareaElmt = document.querySelector("textarea");
      if (!textareaElmt || textareaElmt.value !== "") return;

      console.log("Empty!!");
      textareaElmt.value = placeholder;
    }, 500);
  })();
}
