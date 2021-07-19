if (localStorage.getItem("user_auth_token")) {
    fetch("https://mitm-api.herokuapp.com/api/users/verify", {
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
const username = document.getElementById("username-box").value 
const password = document.getElementById("password-box").value

    if (!username) return UserMessage("Please provide a valid username")
    if (!password) return UserMessage("Please provide a valid password")

    const response = await fetch("https://mitm-api.herokuapp.com/api/users/login", {
        method: "post",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })

    token = await response.json()
    if (token.error) return UserMessage(token.error)
    localStorage.setItem("user_auth_token", token["user_auth_token"]);
    
    chrome.browserAction.setPopup({popup: "popup.html"}, () => {
     document.getElementById("username-box").value = ""
     document.getElementById("password-box").value = ""
     UserMessage("You are logged in, close this popup to add messages")
    })
})



function UserMessage(message) {
    document.getElementById("user-message").innerText = message
}
