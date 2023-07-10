/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="chrome" />

namespace chrome {
  namespace custom {
    type ChromeMessageType = "GET_CHAT_TITLES" | "SET_PLACEHOLDER";

    interface ChromeResponse {
      type: ChromeMessageType;
    }

    interface ChromeGetChatTitlesResponse extends ChromeResponse {
      type: "GET_CHAT_TITLES";
      titles: string[];
    }

    interface ChromeMessageTemplate {
      type: ChromeMessageType;
    }

    interface ChromeGetChatTitlesMesasge extends ChromeMessageTemplate {
      type: "GET_CHAT_TITLES";
    }

    interface ChromeSetPlaceholderMessage extends ChromeMessageTemplate {
      type: "SET_PLACEHOLDER";
      placeholder: string;
    }

    type ChromeMessageResponse = ChromeGetChatTitlesResponse;

    type ChromeMessage =
      | ChromeGetChatTitlesMesasge
      | ChromeSetPlaceholderMessage;
  }
}
