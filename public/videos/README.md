# Hero video assets

| File | Use |
|------|-----|
| `hero-background-pluck.web.mp4` | **Served on the homepage** — H.264, CRF 28, `faststart`, max width 1920px (~3MB). |
| `hero-background-pluck.mp4` | Master / re-encode source only (not linked in the app). |
| `hero.mp4` | Legacy clip; not used on the homepage. |

Re-encode after updating the master:

```bash
ffmpeg -i public/videos/hero-background-pluck.mp4 -an \
  -c:v libx264 -preset medium -crf 28 -profile:v main \
  -movflags +faststart -vf "scale='min(1920,iw)':-2" \
  public/videos/hero-background-pluck.web.mp4
```
