//IMPORTACIÓN MÓDULOS DE NODE
import { readFile, writeFile } from 'fs/promises';
import path from 'path'
import { URL } from 'url';

//IMPORTACIÓN DEPENDENCIAS
import { nanoid } from 'nanoid';
import express from "express";
const app = express()

//HABILITAR req.body
app.use(express.json());

//CRUD

//DEVOLVER PÁGINA WEB
const __dirname = new URL('.', import.meta.url).pathname;
const ruta = path.join(__dirname + "/index.html")

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(ruta);
});


//GET
app.get("/songs", async (req, res) => {
    try {
        const songs = JSON.parse(await readFile("repertory.json"))
        res.json(songs)
    } catch (error) {
        res.status(404).json({
            ok: false,
            error,
            msg: "File not found",
        });
    }
})

app.get("/songs/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const songs = JSON.parse(await readFile("repertory.json"));
        const song = songs.find(item => item.id === id);
        if (!song) res.status(404).json({ error: "Song not found" });
        res.json(song);
    } catch (error) {
        res.status(404).json({ ok: false, error, msg: "File not found" });
    }
});


//POST
app.post("/songs", async (req, res) => {
    const { title, artist, tone } = req.body;
    const newSong = {
        id: nanoid(3),
        title,
        artist,
        tone
    };

    if (!title || !artist || !tone) {
        return res.status(401).send("You must complete all required fields or you will not be able to add a song");
    }

    try {
        const songs = JSON.parse(await readFile("repertory.json"))
        songs.push(newSong);
        await writeFile("repertory.json", JSON.stringify(songs))
        res.status(201).json({
            ok: true,
            msg: 'Song adds successfully',
            song: newSong
        });
    } catch (error) {
        res.json({
            ok: false,
            error,
            msg: "There was an error adding the song",
        });
    }
})


//PUT
app.put("/songs/:id", async (req, res) => {
    const { id } = req.params
    const { title, artist, tone } = req.body

    if (!title || !artist || !tone) {
        return res.status(400).send("All fields must be filled in, even those that you do not want to modify.")
    }

    try {
        const songs = JSON.parse(await readFile("repertory.json"))
        const selectedSong = songs.findIndex(item => item.id === id)

        if (selectedSong < 0) {
            return res.status(404).json({
                ok: false,
                msg: "Song doesn't exists",
            })
        }
        const updateSong = songs.map((item) => {
            if (item.id == id) {
                item.title = title,
                    item.artist = artist,
                    item.tone = tone
            }
            return item
        })

        await writeFile("repertory.json", JSON.stringify(updateSong))
        res.status(200).json({
            ok: true,
            msg: "Song successfully updated",
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "There was an error updating the song",
        });
    }
})


//DELETE
app.delete("/songs/:id", async (req, res) => {
    const { id } = req.params
    try {
        const songs = JSON.parse(await readFile("repertory.json"))
        const songFilter = songs.filter(item => item.id != id)
    
        if (songs.length == songFilter.length) {
            return res.status(400).send("Wrong or non-existent ID");
        }
    
        await writeFile("repertory.json", JSON.stringify(songFilter))
    
        res.status(200).json({
            ok: true,
            msg: "Song successfully deleted",
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "There was an error deleting the song",
        });
    }
})


//HABILITAR PUERTO
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server en el puerto: http://localhost:${PORT}`);
})