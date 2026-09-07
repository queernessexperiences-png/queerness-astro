#!/usr/bin/env python3
"""Bundle a built page (dist/<page>/index.html or dist/index.html) into a
single self-contained HTML file for sharing as a Claude Artifact: inlines
all its CSS and embeds every /images/ reference as a base64 data URI.

Usage: python3 scripts/build-artifact.py <dist-relative-html-path> <output-path> <title>
Example: python3 scripts/build-artifact.py dist/tours/index.html /tmp/out.html "Tours Preview"
"""
import re, base64, os, sys

def main():
    html_path, out_path, title = sys.argv[1], sys.argv[2], sys.argv[3]
    with open(html_path) as f:
        html = f.read()

    css_hrefs = re.findall(r'href="(/_astro/[^"]+\.css)"', html)
    css = ''
    for href in css_hrefs:
        css_path = 'dist' + href
        with open(css_path) as f:
            css += f.read() + '\n'

    body_match = re.search(r'<body>(.*)</body>', html, re.DOTALL)
    body = body_match.group(1)

    def replace_img(m):
        src = m.group(1)
        path = 'dist' + src
        if not os.path.exists(path):
            return m.group(0)
        ext = src.split('.')[-1].lower()
        mime = {'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png'}.get(ext, 'image/jpeg')
        with open(path, 'rb') as imgf:
            b64 = base64.b64encode(imgf.read()).decode()
        return f'src="data:{mime};base64,{b64}"'

    body = re.sub(r'src="(/images/[^"]+)"', replace_img, body)

    output = f'<title>{title}</title>\n<style>\n{css}\n</style>\n{body}\n'
    with open(out_path, 'w') as f:
        f.write(output)
    print(f'{out_path}: {os.path.getsize(out_path) / 1024 / 1024:.1f} MB')

if __name__ == '__main__':
    main()
