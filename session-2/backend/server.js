import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8099 })
wss.on('connection', client => {
    console.log(`Connected New Client : Total size ${wss.clients.size}`);
    wss.clients.forEach(c => {
        c.send(`{"connected_devices": ${wss.clients.size}}`)
    })

    client.on('message', (data, isBinary) => {
        [...wss.clients]
            .filter(c => c != client)
            .forEach(c => {
                c.send(`{"data": "${data}"}`)
            })
    })

    client.on('close', () => {
        console.log(`Devices Disconnected. Total size ${wss.clients.size}`);
        [...wss.clients]
            .filter(c => c != client)
            .forEach(c => {
                c.send(`{"connected_devices": ${wss.clients.size}}`)
            })
    })
})

