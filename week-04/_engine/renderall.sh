#!/bin/bash
cd /home/claude/scratch/week04-cartoon
export PW_CHROMIUM=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell | head -1)
q() { for r in "$@"; do node render.js $r > out/$r.log 2>&1 && ffmpeg -loglevel error -y -i out/$r.mp4 -i cues/$r.wav -c:v copy -c:a aac -b:a 128k -shortest out/final_$r.mp4 && echo "$r ok $(date +%T)" >> out/progress.txt; done; }
q ${Q1} &
q ${Q2} &
wait
echo ALLDONE >> out/progress.txt
