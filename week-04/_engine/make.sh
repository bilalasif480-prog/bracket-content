#!/bin/bash
# usage: ./make.sh r01-slow-site   -> ../rNN-....mp4 (video + voice + music + sfx)
set -e
cd "$(dirname "$0")"
export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)
node render.js $1 >/dev/null
python3 -I build.py ../.. ${KOKORO:-/tmp/claude-0/kokoro} cues/$1.json out/$1.mp4 ../$1.mp4
