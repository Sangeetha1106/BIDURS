import os
import re

files_to_fix = [
    "d:/BIDURS/pages/auction-result.html",
    "d:/BIDURS/pages/chat.html",
    "d:/BIDURS/pages/forgot-password.html",
    "d:/BIDURS/pages/otp-verification.html",
    "d:/BIDURS/pages/payment-status.html",
    "d:/BIDURS/pages/profile.html",
    "d:/BIDURS/pages/register.html",
    "d:/BIDURS/pages/subscription.html"
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'id="global-footer"' not in content:
            new_content = content.replace('</body>', '  <div id="global-footer"></div>\n</body>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Added global footer to {filepath}")
