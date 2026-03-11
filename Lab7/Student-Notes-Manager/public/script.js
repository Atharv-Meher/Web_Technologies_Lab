function addNote(){

const note={
title:document.getElementById("title").value,
subject:document.getElementById("subject").value,
description:document.getElementById("description").value
}

fetch("/notes",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(note)
})
.then(res=>res.json())
.then(()=>{
loadNotes()
})

}

function loadNotes(){

fetch("/notes")
.then(res=>res.json())
.then(data=>{

const container=document.getElementById("notes")
container.innerHTML=""

data.forEach(n=>{

container.innerHTML+=`
<div>
<h3>${n.title}</h3>
<p>${n.subject}</p>
<p>${n.description}</p>
<button onclick="deleteNote('${n._id}')">Delete</button>
</div>
`

})

})

}

function deleteNote(id){

fetch(`/notes/${id}`,{
method:"DELETE"
})
.then(()=>loadNotes())

}

loadNotes()