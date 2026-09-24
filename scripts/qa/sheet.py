# Usage: python3 scripts/qa/sheet.py <out.png> <cols> <scale> <files...>
import sys
from PIL import Image
out, cols, scale, files = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), sorted(sys.argv[4:])
ims = [Image.open(f) for f in files]
w, h = int(ims[0].width * scale), int(ims[0].height * scale)
rows = (len(ims) + cols - 1) // cols
sh = Image.new("RGB", (w * cols + 8 * (cols - 1), h * rows + 8 * (rows - 1)), (60, 60, 60))
for i, im in enumerate(ims):
    sh.paste(im.resize((w, h), Image.LANCZOS), ((i % cols) * (w + 8), (i // cols) * (h + 8)))
sh.save(out)
