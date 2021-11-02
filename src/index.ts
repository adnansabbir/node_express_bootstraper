import {connectToDb} from "./utilities/database.utility";
import {app, port} from "./app";


const start = async () => {
    await connectToDb();
    console.log(`Connected to db`);
    app.listen(port);
}

start().then(() => {
    console.log(`Server running on port ${port}`);
}).catch(e => {
    console.log(`Error starting server`, e);
})

