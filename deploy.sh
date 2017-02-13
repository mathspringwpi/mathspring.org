#!/bin/sh

read -p "Enter Mathseeds username: " uname

echo "Build html page and assets..."
gulp build
echo "Deploying..."
scp index.html $uname@mathseeds.wpi.edu:~
scp android-chrome-192x192.png $uname@mathseeds.wpi.edu:~
scp android-chrome-256x256.png $uname@mathseeds.wpi.edu:~
scp apple-touch-icon.png $uname@mathseeds.wpi.edu:~
scp browserconfig.xml $uname@mathseeds.wpi.edu:~
scp favicon-16x16.png $uname@mathseeds.wpi.edu:~
scp favicon-32x32.png $uname@mathseeds.wpi.edu:~
scp favicon.ico $uname@mathseeds.wpi.edu:~
scp manifest.json $uname@mathseeds.wpi.edu:~
scp mstile-150x150.png $uname@mathseeds.wpi.edu:~
scp -r public/ $uname@mathseeds.wpi.edu:~
ssh -t $uname@mathseeds.wpi.edu "sudo rm -r /var/www/html/public &&
    sudo mv index.html \
    android-chrome-192x192.png \
    android-chrome-256x256.png \
    apple-touch-icon.png \
    browserconfig.xml \
    favicon-16x16.png \
    favicon-32x32.png \
    favicon.ico \
    manifest.json \
    mstile-150x150.png \
    public/ \
    /var/www/html"
