function searchBook(){

let title=document.getElementById("searchTitle").value

fetch(`/books/search?title=${title}`)
.then(res=>res.json())
.then(data=>{

let container=document.getElementById("books")

container.innerHTML=""

data.forEach(b=>{

container.innerHTML+=`
<div>
<h3>${b.title}</h3>
<p>${b.author}</p>
<p>${b.category}</p>
<p>${b.price}</p>
</div>
`

})

})

}