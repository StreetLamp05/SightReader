# SightReader
## About
A cross-platform desktop application helping users practice piano sight-reading w/ real-time feedback. Built with Electrion, Next.js, and FastAPI. It interfaces with MIDI keyboards to visualize and evaluate input/ performance.

## Features
88-key interactive piano roll that highlights notes in real time as they are played

Live MIDI input detection and port selection from supported devices

Modular practice modes including:

Single-note recognition with instant correctness feedback

Short sight-reading passages with timing and accuracy analysis

Sheet-style song rendering with mistake highlighting

## Tech
Frontend: Next.js, Tailwind CSS, React

Backend: FastAPI, Python MIDI libraries

Desktop Integration: Electron

Communication: WebSockets for real-time MIDI data

## Future Goals
Track user performance over time

Add configurable difficulty levels

Export session logs or performance summaries

Create a mobile application for use with iPads/ tablets... 
..


## Todo: mvp
- ~~port detection and selection in frontend~~
- ~~display live midi input in Next~~ (debug console)
- display note names w/ real time status (on/off)
- visual piano roll
== 
- single note sight-reading 
- wait for use to play and check correctness
- give instant feedback
== 
- short reading passages
- display passage & record timing & accuracy
- highlight mistakes
==
- song based
- display notes, sheet-style 
## Todo
