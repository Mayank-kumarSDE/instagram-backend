const client = require("../config/redisconfig");

const connectredis = async()=>{
    try{
        if(!client.isOpen){
            await client.connect()
        }
        console.log("✅ redisdb connected successfully");
    }
    catch(err){
        console.error("❌ Redis connection error:",err.message);
        throw err;
    }
}

process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    try {
        if (client.isOpen) {
            await client.quit();
            console.log('✅ Redis connection closed');
        }
    } catch (err) {
        console.error('❌ Error closing Redis:', err);
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 SIGTERM received, shutting down...');
    try {
        if (client.isOpen) {
            await client.quit();
            console.log('✅ Redis connection closed');
        }
    } catch (err) {
        console.error('❌ Error closing Redis:', err);
    }
    process.exit(0);
});

module.exports = connectredis;