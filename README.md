# innovation-challenge

Our submission for the 2021 FRC Innovation Challenge.

# What is it?

> Since the beginning of the global pandemic, running apps, such as MapMyRun and Garmin, have seen a staggering 65 percent increase in runs logged and 27 percent more users respectively, which they say is significantly more than previous years. However, many runners struggle to stay motivated both while running and to continue on with the sport. To solve this problem, we invented BeatRunner, a tool to automatically play songs with a BPM that matches the users pace to provide motivation and make running more fun. 

Beatrunner is a app-device combination that syncs the music you are listening to the steps you take. For example, if you are taking 80 SPM, it will find spotify songs around 80 BPM.

# Product

This project was also submitted to the Michigan Invention Convention, and our pitch video is available [here](https://www.youtube.com/watch?v=diWKppm-QBk).

A video of the app is available [here](https://www.youtube.com/watch?v=Nbap7Ce5AGY).

The figma for this project is available [here](https://www.figma.com/file/JxewNDMmC1L2yEdJeLtyLS/Robotics-Take-Two?node-id=0%3A1).

# Installation & Usage

Even though react-native is cross platform, this project was only tested on android using a windows machine. I highly doubt it works on iOS.

1. Install git bash & node first
2. Install android studio & create a ADB device with API >= 29.
3. Install react native as outlined [here](https://reactnative.dev/docs/environment-setup).
4. Clone this repository, then cd into the `beatrunner` folder and run `npm run install` and `npm run android`.

