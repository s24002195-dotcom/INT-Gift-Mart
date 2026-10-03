import os
import shutil
import json

base_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart"
frontend_public = os.path.join(base_dir, "frontend", "public")
images_dir = os.path.join(frontend_public, "images")
products_img_dir = os.path.join(frontend_public, "products")
backend_dir = os.path.join(base_dir, "backend")

os.makedirs(images_dir, exist_ok=True)
os.makedirs(products_img_dir, exist_ok=True)
os.makedirs(backend_dir, exist_ok=True)

# Copy logo and hero
brain_dir = r"C:\Users\DELL\.gemini\antigravity\brain\f6f064ca-6495-4d70-8c69-e9a6f5a20c0c"
logo_src = os.path.join(brain_dir, "int_gift_mart_logo_1790413671975.jpg")
hero_src = os.path.join(brain_dir, "hero_gift_banner_1790413708904.jpg")

if os.path.exists(logo_src):
    shutil.copy2(logo_src, os.path.join(images_dir, "logo.jpg"))
    print("Copied logo.jpg")
if os.path.exists(hero_src):
    shutil.copy2(hero_src, os.path.join(images_dir, "hero.jpg"))
    print("Copied hero.jpg")

# Copy crops to products folder
crops_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\product_crops"
crop_files = sorted([f for f in os.listdir(crops_dir) if f.startswith("crop_") and f.endswith(".jpg")])

for f in crop_files:
    shutil.copy2(os.path.join(crops_dir, f), os.path.join(products_img_dir, f))

print(f"Copied {len(crop_files)} product crops to {products_img_dir}")
