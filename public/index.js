const socket = io()

let products = []

let chatBox = document.getElementById('chatBox')
let inputEmail = document.getElementById('inputEmail')

const submitChat = (e) => {
    e.preventDefault()
    let message = e.target[0].value
    console.log(message)
    let email = inputEmail.value
    if (message && email) {
        let date = new Date().toLocaleString()
        let chat = {email, message, date} 
        socket.emit('chat', chat)
    } else {
        document.getElementById('noInfo').innerHTML = "Faltan campos por completar..."
    }
}

chatBox.addEventListener('submit', (e) => submitChat(e))

socket.on('history', data => {
    console.log(data)
    let messages = ""
    data.forEach(text => {
        messages += `<p> <span class="email">${text.email}</span> <span class="date">[${text.date}]</span><span class="message">: ${text.message}</span> `
    })
    document.getElementById('chatLogs').innerHTML = messages
    chatBox.value = ""
})