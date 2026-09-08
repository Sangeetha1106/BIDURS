import os
pages_dir = 'd:/BIDURS/pages'
pages = [f for f in os.listdir(pages_dir) if f.endswith('.html')]
count = 0
for page in pages:
    path = os.path.join(pages_dir, page)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'auth.js' not in content:
        content = content.replace('</body>', '  <script src="../assets/js/auth.js"></script>\n</body>')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
print('Fixed pages:', count)

with open('d:/BIDURS/index.html', 'r', encoding='utf-8') as f:
    idx = f.read()
if 'auth.js' not in idx:
    idx = idx.replace('</body>', '  <script src="assets/js/auth.js"></script>\n</body>')
    with open('d:/BIDURS/index.html', 'w', encoding='utf-8') as f:
        f.write(idx)
    print('Fixed index.html')
