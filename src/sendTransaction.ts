import dotenv from "dotenv";
dotenv.config();
import { ethers, wallet} from "./chain";

console.log("Attempting to send 1 RON from " + wallet.address + " to " + process.env.RON_RECEIVER)

wallet.sendTransaction({
    to: process.env.RON_RECEIVER,
    value: ethers.parseEther("1"),
    gasLimit: 25000,
    gasPrice: ethers.parseUnits("20", "gwei"),
    chainId: process.env.RPC_CHAIN_ID ? parseInt(process.env.RPC_CHAIN_ID) : 2020,
    from: wallet.address,
}).then(async (tx) => {

    console.log("Transaction sent: " + tx.hash + " waiting for confirmation...")
    await tx.wait(3)

    console.log("Transaction confirmed!!!")
}).catch((err) => {
    console.error(err)
})
