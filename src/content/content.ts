const INTERVAL = 500;
const globalData: {
  placeholderList: chrome.custom.PlaceholderListItem[];
  available: boolean;
} = {
  placeholderList: [],
  available: false,
};

function isTextboxEmpty() {
  const textareaElmt = document.querySelector('textarea');
  return !textareaElmt || textareaElmt.value.length === 0;
}

function scrollToTheBottom() {
  const textareaElmt = document.querySelector('textarea');
  if (!textareaElmt) {
    console.error(`textarea can't be found.`);
    return;
  }

  textareaElmt.scrollTop = textareaElmt.scrollHeight;
}

function focusOnTextbox() {
  const textareaElmt = document.querySelector('textarea');
  if (!textareaElmt) {
    console.error(`textarea can't be found.`);
    return;
  }

  textareaElmt.focus();
}

function setTextbox(value: string) {
  const textareaElmt = document.querySelector('textarea');
  if (!textareaElmt) {
    console.error(`textarea can't be found.`);
    return;
  }

  textareaElmt.value = value;
  // It fires the height resizing event of the input element, the value doesn't matter.
  textareaElmt.style.height = '1px';
}

function isResponseGenerating() {
  return document.querySelector('.result-streaming') !== null;
}

function getActiveChatTitle({ lowercase }: { lowercase?: boolean }) {
  let activeTitle = '';

  try {
    const titleElmtList = document.querySelectorAll<HTMLLIElement>('nav li');

    for (const titleElmt of titleElmtList) {
      // If the length of buttons is greater than zero, it considers it active.
      if (titleElmt.querySelectorAll('button').length > 0) {
        activeTitle = titleElmt.innerText;
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return lowercase ? activeTitle.toLocaleLowerCase() : activeTitle;
}

function init() {
  const startChatDetectionLoop = () => {
    setInterval(() => {
      if (!globalData.available || !isTextboxEmpty() || isResponseGenerating())
        return;

      const title = getActiveChatTitle({
        lowercase: true,
      });
      if (!title) return;

      for (const placeholder of globalData.placeholderList) {
        if (!placeholder.active) continue;
        if (title.includes(placeholder.title.toLocaleLowerCase())) {
          setTextbox(placeholder.placeholder);
          scrollToTheBottom();
          focusOnTextbox();
          break;
        }
      }
    }, INTERVAL);
  };

  const loadHandlers = () => {
    chrome.storage.onChanged.addListener((changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        switch (key) {
          case 'placeholderList': {
            // generate lowercasedTitle
            const placeholderList = JSON.parse(
              newValue as string
            ) as chrome.custom.PlaceholderListItem[];

            globalData.placeholderList = placeholderList.map((value) => ({
              ...value,
              lowercasedTitle: value.title.toLocaleLowerCase(),
            }));
            break;
          }
          case 'available': {
            globalData.available = JSON.parse(newValue as string) as boolean;
            break;
          }
        }
      }
    });
  };

  const loadStorageData = async () => {
    const dataMap = await chrome.storage.local.get([
      'placeholderList',
      'available',
    ]);
    globalData.placeholderList = JSON.parse(
      dataMap['placeholderList'] as string
    ) as (typeof globalData)['placeholderList'];
    globalData.available = JSON.parse(
      dataMap['available'] as string
    ) as (typeof globalData)['available'];
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  Promise.all([loadStorageData(), loadHandlers(), startChatDetectionLoop()]);
}

init();
