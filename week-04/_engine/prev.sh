#!/bin/bash
# preview sheet: ./prev.sh r02-x 0,2,4 -> out/sheet-r02-x.png
cd "$(dirname "$0")"; export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)
node render.js $1 $2 >/dev/null && python3 -c "
from PIL import Image
ts='$2'.split(',');ims=[Image.open('out/$1_t'+t+'.png').resize((270,480)) for t in ts]
W=Image.new('RGB',(270*len(ims),480));[W.paste(im,(i*270,0)) for i,im in enumerate(ims)];W.save('out/sheet-$1.png')"
