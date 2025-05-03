const fs    = require('fs');
const path  = require('path');
const axios = require('axios');

const LINKS_FILE = path.join(__dirname, 'links.txt');
const OUT_DIR    = path.join(__dirname, 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

// read in the file and strip BOM (if any)
let content = fs.readFileSync(LINKS_FILE, 'utf-8').replace(/^\uFEFF/, '');

// split into non-empty, trimmed lines
const urls = content
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(Boolean);


(async () => {
  console.log(`\nDownloading ${urls.length} images to ./${path.basename(OUT_DIR)}/\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const rawPath = url.split('?')[0];
      let filename = path.basename(rawPath);
  
      const resp = await axios.get(url, { responseType: 'stream' });
  
      // Only allow images and videos
      const contentType = resp.headers['content-type'];
      if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) {
        console.warn(`[${i + 1}/${urls.length}] Skipped (not image/video): ${contentType}`);
        continue;
      }
  
      const outPath = path.join(OUT_DIR, filename);
      await new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(outPath);
        resp.data.pipe(ws);
        ws.on('finish', resolve);
        ws.on('error', reject);
      });
  
      console.log(`[${i + 1}/${urls.length}] ✔ ${filename}`);
    } catch (err) {
      console.error(`[${i + 1}/${urls.length}] ✖ ${err.message}`);
    }
  }
  

  console.log('\nAll done.');
})();
