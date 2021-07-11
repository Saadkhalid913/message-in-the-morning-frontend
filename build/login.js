if (localStorage.getItem("user_auth_token")) {
    fetch("http://localhost:3001/api/users/verify", {
        method: "post",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_auth_token: localStorage.getItem("user_auth_token")})
    }).then(r => r.json()).then(r => {
        if (r.error) localStorage.clear()
        else {
            chrome.browserAction.setPopup({popup: "popup.html"}, () => {console.log("done")})
            document.body.innerHTML = `<h2 class = "logged-in">You are logged in, close this popup to add messages</h2>`
    }
})
}


// Logging in logic 
document.getElementById("login-button").addEventListener("click", async () => {
    console.log("button pressed")
    const username = document.getElementById("username-box").value 
    const password = document.getElementById("password-box").value
    
    const response = await fetch("http://localhost:3001/api/users/login", {
        method: "post",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    token = await response.json()
    if (token.error) console.log("error")
    localStorage.setItem("user_auth_token", token["user_auth_token"]);
    chrome.browserAction.setPopup({popup: "popup.html"}, () => {console.log("done")})
})

