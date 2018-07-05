console.log("Chatbox JS Loaded")
var socket = io()
var $message = $('#message')
var $sendChat = $('#send-chat')
var $chatList = $('#chat-list')

$sendChat.on("click", () => {
    var data = { message: $message.val()}
    socket.emit("sendmessage", data)
    $message.val("")
    $message.focus()
})

socket.on('receivemessage', (data) => {
    $chatList.prepend(`<li> ${currentUser.name} said the following: ${data.message}  </li>`)
})