#!/usr/bin/env python3
"""
Injects the HausHoch animation layer into an exported static website.
Usage:
  python tools/inject_animations.py --source ./source --output ./dist
Then upload ./dist to GitHub Pages.
"""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def relative_tag(file_path: Path, root: Path, asset_name: str, is_css: bool) -> str:
    rel_assets = Path('assets') / asset_name
    rel = Path(*(['..'] * (len(file_path.relative_to(root).parents) - 1))) / rel_assets
    href = rel.as_posix()
    if is_css:
        return f'<link rel="stylesheet" href="{href}">'
    return f'<script src="{href}" defer></script>'


def inject_html(path: Path, root: Path) -> None:
    text = path.read_text(encoding='utf-8', errors='ignore')
    if 'haushoch-scroll-3d.css' not in text:
        css = relative_tag(path, root, 'haushoch-scroll-3d.css', True)
        if '</head>' in text:
            text = text.replace('</head>', f'  {css}\n</head>', 1)
        else:
            text = css + '\n' + text
    if 'haushoch-scroll-3d.js' not in text:
        js = relative_tag(path, root, 'haushoch-scroll-3d.js', False)
        if '</body>' in text:
            text = text.replace('</body>', f'  {js}\n</body>', 1)
        else:
            text = text + '\n' + js
    path.write_text(text, encoding='utf-8')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', required=True, help='Folder containing the exported existing website')
    parser.add_argument('--output', required=True, help='Output folder for GitHub Pages')
    args = parser.parse_args()

    source = Path(args.source).resolve()
    output = Path(args.output).resolve()
    if not source.exists():
        raise SystemExit(f'Source folder not found: {source}')

    if output.exists():
        shutil.rmtree(output)
    shutil.copytree(source, output)

    asset_dir = output / 'assets'
    asset_dir.mkdir(exist_ok=True)
    package_assets = Path(__file__).resolve().parents[1] / 'assets'
    shutil.copy2(package_assets / 'haushoch-scroll-3d.css', asset_dir / 'haushoch-scroll-3d.css')
    shutil.copy2(package_assets / 'haushoch-scroll-3d.js', asset_dir / 'haushoch-scroll-3d.js')

    count = 0
    for html in output.rglob('*.html'):
        inject_html(html, output)
        count += 1
    print(f'Injected animation layer into {count} HTML file(s). Output: {output}')


if __name__ == '__main__':
    main()
