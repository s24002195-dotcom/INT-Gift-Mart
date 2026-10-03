import os

src_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\int_gift_mart\frontend\src"

replacements = [
    ("94771234567", "94753259928"),
    ("+94 77 123 4567", "+94 75 325 9928"),
    ("077 123 4567", "075 325 9928"),
    ("0771234567", "0753259928")
]

modified_files = []
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.jsx', '.js', '.json', '.html')):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            new_content = content
            for old_s, new_s in replacements:
                new_content = new_content.replace(old_s, new_s)
                
            if new_content != content:
                with open(fpath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                modified_files.append(fpath)

print(f"Updated {len(modified_files)} files with new phone number +94 75 325 9928:")
for mf in modified_files:
    print(" -", os.path.basename(mf))
