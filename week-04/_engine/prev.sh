#!/bin/bash
# prev.sh name t1,t2,... -> out/sheet_<name>.png (frames 360 px wide each)
cd /home/claude/scratch/week04-cartoon
export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)
n=$1; ts=$2
node render.js $n $ts >/dev/null || exit 1
args=""; lay=""; i=0
for t in ${ts//,/ }; do args="$args -i out/${n}_t$t.png"; [ $i -gt 0 ] && lay="$lay|"; lay="${lay}$((i*1080))_0"; i=$((i+1)); done
ffmpeg -loglevel error -y $args -filter_complex "xstack=inputs=$i:layout=$lay,scale=$((i*360)):-1" out/sheet_$n.png
rm -f out/${n}_t*.png
echo out/sheet_$n.png
