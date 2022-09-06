function showMessage(text, isOwner = false) {
    document.getElementById("messages").innerHTML += `
        <div class="message-row ${isOwner ? 'owner' : ''}">
            <div class="bubble">${text}</div>
        </div> 
    `
}

const server = "ws://localhost:8099";
//const server = "wss://websocket-image-z2sqmsr2qq-uc.a.run.app";
const ws = new WebSocket(server);
document.getElementById("connected-devices").innerHTML = '0'
ws.addEventListener('message', ev => {
    payload = ev.data;
    console.log(payload)
    message = JSON.parse(payload);
    if (message['connected_devices'] !== undefined) {
        document.getElementById("connected-devices").innerHTML = message['connected_devices'];
    }
    if (message['data'] !== undefined) {
        showMessage(message['data']);
    }
})

document.querySelector('form').onsubmit = ev => {
    ev.preventDefault();
    input = document.querySelector('input')
    data = input.value.trim()
    if(data != ''){
        ws.send(data)
        showMessage(data, true)
    }
    input.value = ''
}