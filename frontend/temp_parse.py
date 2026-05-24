from pathlib import Path
import os
import subprocess
import sys

path = Path('src/pages/Profile.jsx')
lines = path.read_text(encoding='utf-8').splitlines()
esbuild = Path('node_modules', '.bin', 'esbuild.cmd' if os.name == 'nt' else 'esbuild')
import re
pattern = re.compile(r'<(/?)([A-Za-z][A-Za-z0-9_]*)\b([^>]*)>')
stack = []
for i, line in enumerate(lines, 1):
    for m in pattern.finditer(line):
        closing = m.group(1) == '/'
        tag = m.group(2)
        attrs = m.group(3)
        selfclose = attrs.strip().endswith('/')
        if closing:
            if stack and stack[-1][0] == tag:
                stack.pop()
            else:
                print('unmatched close', tag, 'line', i, 'raw', m.group(0))
        elif selfclose:
            continue
        else:
            stack.append((tag, i, m.group(0)))
print('stack len', len(stack))
for item in stack[-20:]:
    print(item)
sys.exit(0)
