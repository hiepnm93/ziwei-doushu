# Remap GitHub heading anchors from source (zh) to translated (vi) file, matched by heading order.
import re, sys
def heads(t):
    t = re.sub(r'```.*?```', '', t, flags=re.S)
    return [m.group(2).strip() for m in re.finditer(r'^(#{1,6})\s+(.+)$', t, re.M)]
def slug(h):
    h = re.sub(r'<[^>]+>', '', h).lower()
    h = re.sub(r'[^\w\- ]', '', h)
    return h.replace(' ', '-')
src, dst = sys.argv[1], sys.argv[2]
a, b = heads(open(src).read()), heads(open(dst).read())
assert len(a) == len(b), (len(a), len(b))
m = {slug(x): slug(y) for x, y in zip(a, b)}
t = open(dst).read()
t2 = re.sub(r'\]\(#([^)]+)\)', lambda g: '](#%s)' % m.get(g.group(1), g.group(1)), t)
miss = [x for x in re.findall(r'\]\(#([^)]+)\)', t2) if x not in m.values()]
open(dst, 'w').write(t2); print('remapped; unresolved:', miss)
