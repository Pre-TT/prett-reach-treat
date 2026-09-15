# Fix the Radiotheranostics picture on the Home page

## What happened

The picture is now loaded from your image table instead of the version stored in the site. The two files are not the same:

- Old version (used before): tightly cropped, 1643 x 312 — the artwork filled the whole image.
- New version (in your image library): 6000 x 4200, but the artwork only occupies a narrow band in the middle; the rest is empty transparent space.

Nothing changed in the layout or styling. Because the new file carries so much empty space around the artwork, the same on-page width now makes the drawing look small and vertically off-centre.

## Options

1. Replace the file in your image library with a tightly cropped copy (recommended). I prepare a cropped version of the exact same artwork and upload it in place of the current one, so everything stays driven by your table and the picture looks as it did before. If uploading into your storage isn't permitted for me, I hand you the cropped file to upload yourself.
2. Keep this one picture as the stored site version, and let the table drive all the others. Fastest, but this image then no longer updates from your table.
3. Leave the file as is and adjust only how it is displayed, cropping the empty space away visually. No change to your library, but it fixes the symptom rather than the file.

## Recommendation

Option 1: same artwork, same table-driven setup, and the picture looks exactly as before.

## Technical notes

- Row: Infography id 1, Home / Radiotheranostics, `picture_link` -> `Infography/Patient Stratification.webp`.
- Alpha bounding box of the current file: (776, 1780) to (5732, 2578) on a 6000 x 4200 canvas — roughly 19 % of the canvas height is artwork.
- Option 1 crops to the alpha bounding box and re-uploads under the same object name so `picture_link` stays valid.
- Option 3 would add wrapper styling in `src/routes/index.tsx` only; no table or file changes.
