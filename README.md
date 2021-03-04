# Keyword Generator

Have you ever had the need to extract specific keywords or phrases from text sources? I have lately enjoyed playing games of [Pictionary](https://en.wikipedia.org/wiki/Pictionary) with my friends online using the service [skribbl.io](https://skribbl.io/). The name of the game here is that you are given a word or phrase and are supposed to draw some figure representing the subject. The other players are then supposed to correctly guess the exact word or phrase as quickly as possible as you are drawing. In fact, we have played it so much that we have exhausted most of the default words which are available in the game. This leads to few surprises and way too easy games.

However, the game also allows for custom lists of words or phrases which can be used! These can be specified as comma-separated values (CSV), and then be randomly sampled from during the game. This opens up possibilty for us to pick niche words from specific subjects our group of people is interested in, if we want to. Say that we are for example interested in playing a game of Pictionary with the theme of `astronomy`. It would be completely feasible for us to manually compile a list of astronomy terms like `planet`, `solar system`, etc., but this is quite tedious.

Instead it would be easier if one could for example just navigate to some source containing information of the theme, like for example the [quite large article on the subject of astronomy](https://en.wikipedia.org/wiki/Astronomy) on Wikipedia. If we could just let some automated system extract typical words and phrases on the subject, we would be done!

This is in fact the purpose of the software in this repository. It comprises a backend service that mplements a REST API that is able to take a text string and extract statistically typical words from it, as well as a front end constructed with React which acts as the interface for the service.

## Resources

- Github pages: https://suhren.github.io/keyword/
- API endpoint: https://keyword.bitgnd.com/ui/

## Software stack

The frontend of the service is written in JavaScript, HTML, and CSS using React. The backend of the service is implemented using the following stack:

```
Client <--> Nginx (Reverse Proxy) <--> Gunicorn (WSGI Server) <--> Flask (Web Service)
```

## Sources:

I have (of course) not accomplished this without referring to tutorials and articles on the subject. Here is a list of some of them:

* [Youtube tutorial on connecting Flask, Nginx and Docker](https://www.youtube.com/watch?v=Vkqz2hK4fKg) (Andrew Porter, 2020)
* [Article on building REST APIs with Connexion](https://realpython.com/flask-connexion-rest-api/) (Doug Farrell)
* [Youtube Material UI React Tutorial](https://www.youtube.com/watch?v=vyJU9efvUtQ&t=592s) (Traversy Media, 2020)

## Setup:

If you want to run the code yourself I won't really provide any detailed step-by-step instructions. However, in general, you need to do the following:

- Clone down this repo
- Setup the frontend:
  - Make sure that Github pages are enabled for the repository where the website will be hosted. Also, make sure that it is set to the `gh-pages` branch.
  - Ensure that the npm package [gh-pages}(https://www.npmjs.com/package/gh-pages) are installed
  - Edit the `frontend/package.json` so that the `homepage` entry points to the URL of the github pages.
  - Set the cwd to `frontend/` and run `npm run deploy`
- Setup the backend:
  - The backend API uses HTTPS (since github pages enforces HTTPS for any requests) and therefore requires valid SSL certificates. I used [certbot](https://certbot.eff.org/) for this purpose, and generated the files `backend/certs/key.pem` and `backend/certs/cert.pem`. I should note that I am using the subdomain `keyword.bitgnd.com` of my other personal website which then points to a local server using the DNS records of the website.
  - The backend service is then containerized and run using `docker-compose` in the `backend` directory. It copies the `backend/cert` directory to the container, so make sure that the key and certificate files are located here.
  - Set the cwd to `backend` and run `docker-compose up` or `docker-compose start` on the server
