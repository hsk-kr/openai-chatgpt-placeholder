/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="chrome" />

namespace chrome {
  namespace custom {
    type PlaceholderListItem = {
      id: string;
      title: string;
      placeholder: string;
      active: boolean;
    };
  }
}
