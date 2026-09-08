import os
import re

def replace_footer(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match the footer blocks. Since footers vary slightly, we look for <footer ...>...</footer>
    # using DOTALL to match across newlines.
    pattern = re.compile(r'<footer.*?</footer>', re.DOTALL)
    
    # Also need to make sure we don't accidentally replace footers that we might not want to, but the requirement says all HTML files.
    if pattern.search(content):
        new_content = pattern.sub('<div id="global-footer"></div>', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No footer found in {filepath}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                replace_footer(os.path.join(root, file))

if __name__ == "__main__":
    process_directory("d:/BIDURS")
