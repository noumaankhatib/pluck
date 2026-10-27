# Hero video assets

| File | Use |
|------|-----|
| `hero-section-background.web.mp4` | **Served on the homepage** — H.264, CRF 28, `faststart`, max width 1920px (~3MB). |
| `hero-section-background-master.mp4` | Master / re-encode source only (not linked in the app). |
| `hero-section-legacy.mp4` | Legacy clip; not used on the homepage. |

Re-encode after updating the master:

```bash
ffmpeg -i public/videos/hero-section-background-master.mp4 -an \
  -c:v libx264 -preset medium -crf 28 -profile:v main \
  -movflags +faststart -vf "scale='min(1920,iw)':-2" \
  public/videos/hero-section-background.web.mp4
```
