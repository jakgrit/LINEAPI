const express = require('express');
const line = require('@line/bot-sdk');
const app = express();
const port = 8080;

const text = ["สวัสดี", "เหงาจังเลย", "มาหาหน่อย"]

const config = {
    channelAccessToken: "hAo5ljoO2JTTOjML/cjUPwEJ4xP5lINb+k52USBdXJ2II4QGy8LsDxjInW5vjwdADh54fbKilGgvjJ36kKwMRHkaFD4zXsoF7HqI0gcOoLVGZKZdXhww7YMAX2NQFyNM5bml617kubFfJWSFHYE7AAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "7bcc814442806ca4a70b8c2142eba5c7"
}
const client = new line.Client(config);


app.get('/', (req, res) => {
    res.send('Hello World!!');
})

app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})

function handleEvent(event){
    if(event.type != 'message' || event.message.type != 'text'){
        return Promise.resolvce(null);
       /*
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: "ควยไรสัส ส่งสติ๊กเกอร์ทำควยไร"
        });
        */
    }

    if(event.message.text === "ขอสติ๊กเกอร์หน่อย"){
        return client.replyMessage(event.replyToken, {
            type: "sticker",
            packageId: "1",
            stickerId: "1"
        });
    }

    if(event.message.text === "รักเฟรม"){
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'รักเกว'
        });
    }

    if(event.message.text === text){
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'JAKGRIT'
        });
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}


app.listen(port, () => console.log(`App running: ${port}`));
