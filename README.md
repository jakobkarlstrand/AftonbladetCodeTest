# Aftonbladet Code Test - Photo puzzle game


## Description
An interactive webcam based puzzle. Complete the puzzle displaying yourself by dragging & dropping shuffled cut out pieces of your webcam feed.

## Task
The task was to create a image puzzle, using plain javascript focusing on some of the following keypoints:

-   Level of puzzle difficulty, number of puzzle pieces
-   Awesome pics to use as the puzzle. Static or dynamic?
-   Does a player get points? Is there timing involved? A scoreboard?
-   Fancy animations or pure-and-simple?
-   Responsive design that works for different screen sizes?
-   Single-player? Local multi-player? Networked multi-player? 🙀
-   Accessibility?

This should be done within a time limit of around 3h.

## The process
Initially I wanted to create a puzzle game with focus on design, animations and level of difficulty where you can choose your own image.
So I started to layout a design in Figma with this in mind (Full design process can be viewed here if interested https://www.figma.com/file/s8krK3VgWKp16QUCXvUZwx/Untitled?node-id=0%3A1 )

![design](https://user-images.githubusercontent.com/53311520/154683540-91c340cd-e888-4678-b883-99bf7112f029.png)


However, while designing I came over an idea which I really liked. To make the puzzle based on your own webcam feed.
So I kept the design I created in mind, but started working on the functionality of the webcam puzzle.
I quickly realized I had probably taken on too much to handle within the time limit, as the webcam functionality took more time than expected, and resulted in having to scratch some of my original ideas, to make it in time.

Some assumptions I've made:
 -   The user has a webcam (If no webcam is detected, nothing is drawn)
 -   The number of rows will always equal the number of columns
 -   The user will understand how to play the game without reading this readme.md (No instructions are shown in the game)


## Result
I ended up with a functional puzzle game using the users webcam as puzzle material
I'm pleased with the result regarding functionality of the basics of the game. However - of course-  there are a lot of points that can be improved. Like design, repsonsiveness, code base and so on.

## Future steps
Some points I would like to further develop in the puzzle:
 -   A landing page before the game starts
 -   Options for increasing/decreasing number of puzzle pieces
 -   Fancy animations instead of snapping back to place
 -   Responsiveness
 -   Add support for using images in addition to webcam feed

## Final thoughts
Definitely a very fun test! I have less experience working with `<canvas>` so I definitely learned a lot during this session.

Overall I'm pleased with the result, but will without a doubt keep expanding on this project in the future.


## How to play

### Locally
Download this repo, and open `index.html`
The game is only tested on Google Chrome and Opera, but should work for other browsers too.

### Online

You can also play the game here: https://jakobkarlstrand.github.io/AftonbladetCodeTest/ 


