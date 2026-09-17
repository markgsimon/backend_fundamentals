const amqp = require("amqplib");

connect();


async function connect () {
    try {

        const amqpserver = "amqps://lhoqchkq:6Ti0dKzyJKWTjxdpnYt78uQZ4RZ3z0TF@guppy.rmq6.cloudamqp.com/lhoqchkq";
        const connection = await amqp.connect(amqpserver);
        const channel = await connection.createChannel();

        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const msg = JSON.parse(message.content.toString());
            console.log(`New message consumed with input ${msg.number}`);

            if(msg.number % 2 == 1){
                channel.ack(message);
            }
        })

        console.log("Waiting for messages...");

        process.on("SIGINT", async () => {
            await channel.close();
            await connection.close();
            console.log(`\n`);
            process.exit(0);
        });

    } catch (error) {
       console.error(error);
       channel.nack(message, false, false);
    }

   
}