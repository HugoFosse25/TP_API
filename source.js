let users = Array();
const p_data = document.getElementById("content")
console.log(p_data);

let posts = Array();



async function API_fetch(page, id) {

    if (!page) return

    let url = null;

    if (!id) url = `https://jsonplaceholder.typicode.com/${page}`;
    else {

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
        user.ouvert = false;
        let name = document.createElement("div");
        name.setAttribute('id', user.id);
        name.setAttribute('class', "user_div");
        name.innerHTML = `<p>${user.name}</p>`;
        p_data.appendChild(name);
        name.addEventListener("click", async function () {

            if (user.ouvert == false) {

                posts = await API_fetch("posts", index);
                console.log(posts);
                let post_content = document.createElement("div");
                post_content.setAttribute('id', `user${user.id}_container`);
                post_content.setAttribute('class', "posts_container");
                name.appendChild(post_content);
                posts.forEach((post) => {
                    console.log(post);
                    let body_post_content = document.createElement("div");
                    body_post_content.setAttribute('class', "body_posts_container");
                    body_post_content.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>`;
                    post_content.appendChild(body_post_content);

                })



                user.ouvert = true;

            } else {
                name.removeChild(document.getElementById(`user${user.id}_container`))
                console.log("else");
                user.ouvert = false;

            }

        })
    })
})();



