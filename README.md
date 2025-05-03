# Browser Media Downloader

This project automates downloading images and videos from a website by extracting their URLs via your browser's Network tab and saving them with a simple Node.js script.

## Prerequisites

* **Node.js** (v14 or newer)
* **npm** (bundled with Node.js)
* **Web browser** (e.g., Chrome, Firefox)

## Setup Instructions

1. **Clone or create your project folder**

   ```bash
   mkdir image-downloader
   cd image-downloader
   ```

2. **Add the downloader script**

   Save the provided `download.js` into this folder (ensure it sits alongside `links.txt`).

3. **Install Axios**

   ```bash
   npm init -y
   npm install axios
   ```

4. **Capture image URLs**

   1. Open your browser and navigate to the page containing the images.
   2. Open Developer Tools:

      * **Windows/Linux**: `F12` or `Ctrl+Shift+I`
      * **Mac**: `Cmd+Option+I`
   3. Select the **Network** tab.
   4. Reload the page to start capturing requests.
   5. (Optional) Filter requests by typing `webp` to show only `.webp` images.
   6. For each image request:

      * Right-click the request → **Copy** → **Copy link address (or similar)**
      * Paste the URL on its own line into `links.txt`
   7. Save the `links.txt` file in your project folder.

5. **Download the images**

   ```bash
   node download-all.js
   ```

6. **Check your images**

   * All downloaded files will be in the `images/` directory.

## Troubleshooting

* If the first URL appears truncated or incorrect, remove any hidden BOM or extra whitespace at the top of `links.txt`.
* Ensure every line in `links.txt` is a complete URL starting with `https://`.
* Verify the `images/` folder exists; the script will create it if missing.

---

With these steps, you can quickly grab and download all images from any page using a single command.
