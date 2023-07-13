# OpenAI ChatGPT Placeholder

The OpenAI ChatGPT Placeholder Extension is a convenient tool that automatically inserts placeholder text into the ChatGPT textbox.

---

### Contributing & Bug Reports

Since it manipulates the html source to function, any changes in the ChatGPT chat page may cause the extention to not work properly.

If you find any issues and have any good suggestions, please submit them as issues in the [Issues Tab of this repository](https://github.com/hsk-kr/openai-chatgpt-placeholder/issues).

---

## Preview

![preview](https://github.com/hsk-kr/openai-chatgpt-placeholder/raw/main/docs/preview_extension.mp4)

## How To Use

1. Add a new item.

2. Click on the new item.

3. Modify the title and the placeholder you want. If the title matches a part of a title of your chat in ChatGPT, the extension will automatically insert the placeholder text into the textbox. Note that the title is case-insensitive.

4. Toggle on the title and the extention in the bar.

## How To Run (Development Mode)

1. Clone the repository.

2. Install packages.

   ```console
   > pnpm install
   ```

3. Build.

   ```console
   > pnpm build
   ```

4. Go to chrome://extensions/.

   - Reference : https://support.google.com/chrome/a/answer/2714278?hl=en (Create and publish custom Chrome apps & extensions)

5. At the top right, turn on Developer mode.

6. Click Load unpacked.

7. Find and select the dist directory.
