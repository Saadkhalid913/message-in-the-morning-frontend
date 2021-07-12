
if (localStorage.getItem("user_auth_token")) {
    fetch("http://localhost:3001/api/users/verify", {
        method: "post",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_auth_token: localStorage.getItem("user_auth_token")})
    }).then(r => r.json()).then(r => {
        console.log(r)
        if (r.error) {
            chrome.browserAction.setPopup({popup: "login.html"}, () => {console.log("done")})
            document.body.innerHTML = `<h2 class = "logged-in">You are not logged in, close this popup log in</h2>`
    }
})
}
else {
    chrome.browserAction.setPopup({popup: "login.html"}, () => {console.log("done")})
    document.body.innerHTML = `<h2 class = "logged-in">You are not logged in, close this popup log in</h2>`
}


document.getElementById("submit-message").addEventListener("click", async () => {
    const title = document.getElementById("title-box").value
    const body = document.getElementById("body-box").value

    const response = await fetch("http://localhost:3001/api/messages", {    
        method: "post",
        mode:"cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, body, user_auth_token: localStorage.getItem("user_auth_token")})
    })
    const data = await response.json()

    if (data.error) return UserMessage(data.error);
    
    document.getElementById("title-box").value = ""
    document.getElementById("body-box").value = ""

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
      });

    return UserMessage("Message added")  
})


function UserMessage(message) {
    document.getElementById("user-message").innerText = message
}
