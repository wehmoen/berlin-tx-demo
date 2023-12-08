import dotenv from "dotenv";
dotenv.config();
import { berlinDemoContract} from "./chain";

console.log("Attempting to get value from Demo contract, then set new value and get it again")

berlinDemoContract.getValue().then((value) => {
    console.log("Current value: " + value)
}).then(() => {
    return berlinDemoContract.setValue("Hello Berlin - " + Date.now().toString(4))
}).then((tx) => {
    console.log("Transaction sent: " + tx.hash + " waiting for confirmation...")
    return tx.wait(3)
}).then(() => {
    return berlinDemoContract.getValue()
}).then((value) => {
    console.log("New value: " + value)
}).catch((err) => {
    console.error(err)
})
