# Keyword Generator

Have you ever had the need to extract specific keywords or phrases from text sources? I have lately enjoyed playing games of [Pictionary](https://en.wikipedia.org/wiki/Pictionary) with my friends online using the service [skribbl.io](https://skribbl.io/). The name of the game here is that you are given a word or phrase and are supposed to draw some figure representing the subject. The other players are then supposed to correctly guess the exact word or phrase as quickly as possible as you are drawing. In fact, we have played it so much that we have exhausted most of default words which are available in the game. This leads to few surprises and way too easy games.

However, the game also allows for custom lists of words or phrases which can be used! These can be specified as comma-separated values (CSV), and then be randomly sampled from during the game. This opens up the possibilty for us to pick niche words from specific subjects our group of people are interested in, if we want to. Say that we are for example interested in playing a game of pictionary with the theme of `astronomy`. It would be completely feasible for us to manually compile a list of astronomy terms like `planet`, `solar system`, etc., but this is quite tedious.

Instead it would be easier if one could for example just navigate to some source containing information of the theme, like for example the [quite large article on the subject of astronomy](https://en.wikipedia.org/wiki/Astronomy) on Wikipedia. If we could just let some automated system extract typical words and phrases on the subject, we would be done!

This is in fact the puprose of the software in this repository. It comprises of a backend service which implements a REST API that is able to take a text string and extract `statistically typical` words from it, as well as a front end constructed with React which acts as the interface for the service.

## Resources

- Github pages: https://suhren.github.io/keyword/
- API endpoint: https://keyword.bitgnd.com/ui/

## Software stack

The frontend of the service is written in JavaScript, HTML and CSS using React. The backend of the service is implemented using the following stack:

```
Client <--> Nginx (Reverse Proxy) <--> Gunicorn (WSGI Server) <--> Flask (Web Service)
```

## Sources:

I have (of course) not accomplished this without refering to tutorials and articles on the subject. Here as a list of some of them:

* [Youtube tutorial on connecting Flask, Nginx and Docker](https://www.youtube.com/watch?v=Vkqz2hK4fKg) (Andrew Porter, 2020)


* [Article on building REST APIs with Connexion](https://realpython.com/flask-connexion-rest-api/) (Doug Farrell)


* [Youtube Material UI React Tutorial](https://www.youtube.com/watch?v=vyJU9efvUtQ&t=592s) (Traversy Media, 2020)
