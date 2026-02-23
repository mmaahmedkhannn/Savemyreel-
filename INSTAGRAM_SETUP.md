# Media Downloader - Setup Guide

## Instagram Authentication Setup

Instagram requires authentication for downloading media. Follow these steps:

### 1. Install Browser Extension

Install a "Get cookies.txt" extension for your browser:
- **Chrome**: [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
- **Firefox**: [cookies.txt](https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/)

### 2. Export Instagram Cookies

1. Open Instagram.com in your browser
2. Make sure you are **logged in**
3. Click the extension icon
4. Click "Export" or "Download" to save `cookies.txt`

### 3. Place cookies.txt File

Copy the downloaded `cookies.txt` file to the **root directory** of this project (same folder as `package.json`).

```
Downloader website/
├── cookies.txt          ← Place file here
├── package.json
├── bin/
└── ...
```

### 4. Test the Downloader

Start the development server:
```bash
npm run dev
```

Visit http://localhost:3000 and paste an Instagram URL to test.

## Supported Platforms

- ✅ Instagram (posts, reels, videos, images, carousels)
- ✅ Facebook (public videos)
- ✅ TikTok (videos)
- ✅ X/Twitter (videos)

## Important Notes

- **Cookies expire**: You may need to refresh your `cookies.txt` file periodically (every few weeks)
- **Private content**: The downloader only works with public posts
- **Rate limiting**: The app has built-in rate limiting to prevent abuse

## Troubleshooting

### "This content requires authentication"
- Make sure `cookies.txt` is in the root directory
- Verify you're logged into Instagram in your browser
- Re-export fresh cookies

### "There is no video in this post"
- This error means the post contains only images
- The app now supports image downloads as well

### "Failed to extract media"
- Check if the post is public
- Verify the URL is correct
- Try refreshing your cookies
