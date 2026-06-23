## Fix Profile Picture Crop

The profile picture in the hero section uses `object-cover` with default center cropping, which is cutting off the top of your head.

### What I'll do
- Adjust the image's focal point by adding `object-top` (or a precise percentage) so the crop centers on your face/head instead of the middle of the photo.
- Keep the circular frame, size, and ring styling exactly as they are.

### Technical detail
One-line CSS change: add `object-top` or `object-position: center 20%` to the `<img>` className to shift the crop upward. I'll verify in the preview and fine-tune the percentage if needed.

No other sections or styles will be touched.