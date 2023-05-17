# Desafio Latam: Introduction to Express Js

In this challenge, a server is develop with Express that uses the File System module to add, modify and delete songs stored in a local JSON called `repertory.json`

The server provides the following routes:

- `POST: /songs` : Receives the data of a song and adds it to the repertory
- `GET: /songs` :  Returns a JSON with the songs registered in the repertory 
- `PUT: /songs/:id` : Receives the data of a song to be edited and updates it by manipulating local JSON
- `DELETE: /songs/:id` : Receives the id of a song and removes it from the repertory.

<br>

Client Application
-------
The client application that consumes the routes is located in the file index.html, inside the public folder. To use it: run server and CTRL + right-click on the path displayed in the terminal, or open `localhost:4000` in your navigator after the server is up

- POST: Fill in the 3 fields and click on add.
- PUT: Click on the edit button of the song you want to modify, the form will be replaced by the data of the selected song, modify the desired fields and then click on edit.
- DELETE: Click on the delete button of the selected song.   

<br>

Using [Thunder Cliente for VS Code](https://www.thunderclient.com/) as a client application
-------
<br>

```html
METHOD: GET 
ENDPOINT: localhost:4000/songs/
```
<br>

To add a song, the following structure must be followed (the id is generated with nanoid, so, to create a song you don't need to write this data):


```html
METHOD: POST
ENDPOINT: localhost:4000/songs/
```
```json
BODY JSON

{
    "title": "",
    "artist": "",
    "tone": ""
}
```

To modify a song:

```
METHOD: PUT
ENDPOINT: localhost:4000/songs/{id}
```

```json
BODY JSON

{
    "title": "",
    "artist": "",
    "tone": ""
}
````

To delete a song:
```
METHOD: DELETE
ENDPOINT: localhost:4000/songs/{id}
```
<br>

Backend
-------

- [Node.js](https://nodejs.dev/)

<br>

Dependencies
-------

- Framework [Express](https://expressjs.com/es/)
- ID generator for JavaScript [Nano ID](https://www.npmjs.com/package/nanoid)
- To install dependencies run: `npm install`
- devDependencies [Nodemon](https://www.npmjs.com/package/nodemon) for run server and automatically restarting the node application when file changes, in the terminal run: `npm run dev`



