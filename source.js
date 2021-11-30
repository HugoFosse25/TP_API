let users = Array();
const p_data = document.getElementById("content")
console.log(p_data);

let posts = Array();



async function API_fetch(page, id) {
    if (!page) return
    const url = null;
    if (!id) url = `https://jsonplaceholder.typicode.com/${page}`;
    else{

        url = `https://jsonplaceholder.typicode.com/${page}?userId=${id}`;

    } 
    
    return fetch(url)
        .then(response => response.json())
        .then(json => json).catch(error => console.error('ERROR', error))
}

(async () => {
    users = await API_fetch("users");
    console.log(users)
    users.forEach((user, index) => {
        let name = document.createElement("div");
        name.setAttribute('id', user.id);
        name.innerHTML = `<p>${user.name}</p>`;
        p_data.appendChild(name);
        name.addEventListener("click", function(){

           posts =  API_fetch("posts", index);
           let post_content = document.createElement("div");
           post_content.setAttribute('id', user.id);
           name.appendChild(post_content);
           post_content.innerHTML = `<p>${user.title}`;

        })
    })
})();



