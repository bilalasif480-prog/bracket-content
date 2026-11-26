#!/bin/bash
# qa.sh rNN -> qa/strip_rNN.png (frames 0,4,8,11,14.2 of the final mp4)
cd /home/claude/scratch/week04-cartoon; r=$1; i=0; args=""
for t in 0 4 8 11 14.2; do ffmpeg -loglevel error -y -ss $t -i out/final_$r.mp4 -frames:v 1 qa/${r}_$i.png; args="$args -i qa/${r}_$i.png"; i=$((i+1)); done
ffmpeg -loglevel error -y $args -filter_complex "xstack=inputs=5:layout=0_0|1080_0|2160_0|3240_0|4320_0,scale=1800:-1" qa/strip_$r.png
ffprobe -v error -show_entries format=duration,size -of csv=p=0 out/final_$r.mp4
