# Favicon Setup Guide

**Status**: Configured (awaiting favicon file conversion)  
**Source**: `/public/assets/logos/logo-mark.webp`

---

## Overview

Favicon is configured in `src/app/layout.tsx` metadata to use the Leaf Lightly logo mark. To complete setup, convert the logo to favicon formats and place in `/public/`.

---

## Files Needed

Create these files in `/public/` directory:

| File | Size | Format | Purpose |
|------|------|--------|---------|
| `favicon.ico` | 32x32px | ICO | Browser tab icon (primary) |
| `favicon.png` | 32x32px | PNG | Modern browsers fallback |
| `apple-touch-icon.png` | 180x180px | PNG | iOS home screen icon |

---

## How to Create Favicon Files

### Option 1: Online Converter (Easiest)

1. Go to: https://convertio.co/webp-ico/ (or similar online tool)
2. Upload: `/public/assets/logos/logo-mark.webp`
3. Convert to: ICO format (32x32px)
4. Download: `favicon.ico`
5. Place in: `/public/favicon.ico`

**Repeat for PNG versions:**
- Use: https://convertio.co/webp-png/
- Size: 32x32px for favicon.png
- Size: 180x180px for apple-touch-icon.png

### Option 2: ImageMagick (Command Line)

```bash
# Convert WebP to ICO (32x32)
magick convert /public/assets/logos/logo-mark.webp -resize 32x32 /public/favicon.ico

# Convert WebP to PNG (32x32)
magick convert /public/assets/logos/logo-mark.webp -resize 32x32 /public/favicon.png

# Convert WebP to PNG (180x180 for Apple)
magick convert /public/assets/logos/logo-mark.webp -resize 180x180 /public/apple-touch-icon.png
```

### Option 3: ffmpeg

```bash
# Convert to PNG first, then to ICO
ffmpeg -i /public/assets/logos/logo-mark.webp -vf scale=32:32 /public/favicon.png
```

---

## File Placement

Once created, place files here:

```
/public/
├── favicon.ico                    [32x32px]
├── favicon.png                    [32x32px]
├── apple-touch-icon.png           [180x180px]
└── assets/
    └── logos/
        ├── logo-mark.webp
        ├── logo-full.webp
        └── ...
```

---

## Configuration (Already Done ✅)

The following is already configured in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logos/logo-mark.webp", sizes: "256x256", type: "image/webp" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
```

---

## Verification

After placing favicon files, verify:

1. **Browser Tab**: Refresh page, favicon appears in browser tab
2. **Bookmarks**: Favicon shows in bookmarks menu
3. **History**: Favicon shows in history
4. **iOS**: If accessed on iPhone, icon appears on home screen

---

## Browser Support

| Browser | Format | Status |
|---------|--------|--------|
| Chrome | ICO, PNG, WebP | ✅ All supported |
| Firefox | ICO, PNG | ✅ Supported |
| Safari | PNG, ICO | ✅ Supported |
| Edge | ICO, PNG | ✅ Supported |
| iOS Safari | PNG (180x180) | ✅ Supported |

---

## Next Steps

1. Convert logo-mark.webp to favicon formats (use Option 1 above - easiest)
2. Place converted files in `/public/` directory
3. Commit and push to GitHub
4. Vercel auto-deploys
5. Favicon will appear in browser tab

---

## Timeline

**Current**: Configuration complete ✅  
**Next**: File conversion (5 minutes with online tool)  
**Then**: Commit, push, deploy (~2 minutes)

---

**Note**: Configuration is already in place. Only awaiting favicon file creation and placement in `/public/` directory.
