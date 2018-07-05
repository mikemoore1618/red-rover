console.log("Chatbox JS Loaded")
var socket = io()
var $userTag = $('#usertag')
var $message = $('#message')
var $sendChat = $('#send-chat')
var $chatList = $('#chat-list')

$sendChat.on("click", () => {
    var data = {usertag: $userTag.val(), message: $message.val()}
    socket.emit("sendmessage", data)
    $message.val("")
    $message.focus()
})

socket.on('receivemessage', (data) => {
    $chatList.prepend(`<li> ${data.usertag} said the following: ${data.message}  </li>`)
})