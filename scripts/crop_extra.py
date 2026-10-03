import os
from PIL import Image
import numpy as np

src_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\extracted_pdf"
out_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart\frontend\public\products"

for fname in ["page_1_0_4.png", "page_1_2_7.png"]:
    fpath = os.path.join(src_dir, fname)
    if not os.path.exists(fpath):
        continue
    im = Image.open(fpath)
    w, h = im.size
    # In these images, thumbnail is at x in [20, 160], y ranges from 100 to 800
    strip = im.crop((15, 80, 160, h))
    strip_arr = np.array(strip.convert("L"))
    row_b = strip_arr.mean(axis=1)
    
    in_item = False
    start_y = 0
    item_boxes = []
    for y, val in enumerate(row_b):
        if val > 25 and not in_item:
            in_item = True
            start_y = y
        elif val <= 25 and in_item:
            in_item = False
            if y - start_y > 40:
                item_boxes.append((start_y, y))
    if in_item and len(row_b) - start_y > 40:
        item_boxes.append((start_y, len(row_b)))
        
    prefix = "crop_0" if "0_4" in fname else "crop_2"
    for idx, (sy, ey) in enumerate(item_boxes):
        orig_sy = 80 + sy
        orig_ey = 80 + ey
        th_h = orig_ey - orig_sy
        crop_im = im.crop((15, orig_sy, 15 + max(th_h, 110), orig_ey))
        crop_im.save(os.path.join(out_dir, f"{prefix}_{idx}.jpg"), quality=95)
        print(f"Saved {prefix}_{idx}.jpg")
