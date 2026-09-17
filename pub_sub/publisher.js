const amqp = require("amqplib");


const message = {number: process.argv[2]}
connect();


async function connect () {

    try {
        // name of server?
        const amqpserver = "amqps://lhoqchkq:6Ti0dKzyJKWTjxdpnYt78uQZ4RZ3z0TF@guppy.rmq6.cloudamqp.com/lhoqchkq";
        // instantiate the connection
        const connection = await amqp.connect(amqpserver);

        //instantiate a channel?
        const channel = await connection.createChannel();

        // assert the queue jobs
        await channel.assertQueue("jobs");


        // send a message?
        const body = JSON.stringify(message);
        console.log("typeof message:", typeof message);
        console.log("message:", message);
        console.log("body:", body);
        await channel.sendToQueue("jobs", 
            Buffer.from(JSON.stringify(message), 
            {contentType: "application/json"})
        );
        console.log(`Job sent successfully: ${message.number}`);

        await channel.close();
        await connection.close();
        
        
    } catch (error) {
        console.error(error);
    }
}


