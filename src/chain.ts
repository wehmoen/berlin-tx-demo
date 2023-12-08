import dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

export { ethers }


function rpcUrl() {
    const apiKey = process.env.RPC_API_KEY;
    if (!apiKey) {
        throw new Error("RPC_API_KEY not set");
    }

    const rpc = process.env.RPC_URL || "https://api-gateway.skymavis.com/rpc"

    return `${rpc}?apikey=${apiKey}`;
}

export const provider = new ethers.JsonRpcProvider(rpcUrl())

const privateKey = process.env.WALLET_PRIVATE_KEY;

if (!privateKey) {
    throw new Error("WALLET_PRIVATE_KEY not set");
}

export const wallet = new ethers.Wallet(privateKey, provider);

export const berlinDemoContract = new ethers.Contract("0x03795ea8a64D781b7802fB680602041a6f6f94Ea", [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newValue",
                "type": "string"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "newValue",
                "type": "string"
            }
        ],
        "name": "ValueChanged",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getValue",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
], wallet)
