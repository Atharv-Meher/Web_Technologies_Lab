const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/student_notes")

const NoteSchema = new mongoose.Schema({
title:String,
subject:String,
description:String,
created_date:{type:Date, default:Date.now}
})

const Note = mongoose.model("Note",NoteSchema)

/* ADD NOTE */
app.post("/notes", async(req,res)=>{
const note = new Note(req.body)
await note.save()
res.json({message:"Note Added"})
})

/* VIEW NOTES */
app.get("/notes", async(req,res)=>{
const notes = await Note.find()
res.json(notes)
})

/* UPDATE NOTE */
app.put("/notes/:id", async(req,res)=>{
await Note.updateOne({_id:req.params.id},{$set:req.body})
res.json({message:"Note Updated"})
})

/* DELETE NOTE */
app.delete("/notes/:id", async(req,res)=>{
await Note.deleteOne({_id:req.params.id})
res.json({message:"Note Deleted"})
})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})