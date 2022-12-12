import {TezosToolkit} from "@taquito/taquito"
import { BeaconWallet } from '@taquito/beacon-wallet'

const DAPP_NAME = "Digital Degree - NITH"
const RPC_URL = "https://ghostnet.smartpy.io";
const NETWORK = "ghostnet"
const FA2_CONTRACT_ADDRESS = "KT1Aa9amSPeHNN24A83hyuhb49gtTN2JP6vm"
const MINTER_CONTRACT_ADDRESS = "KT1BKdjGPBg9EX5Ghehx7szmJ6QPkrTpKnUm"

const Tezos = new TezosToolkit(RPC_URL);

const wallet = new BeaconWallet({
    name: DAPP_NAME,
    preferredNetwork: NETWORK,
    colorMode: 'light'
});

// Setting the wallet as the wallet provider for Taquito.
Tezos.setWalletProvider(wallet)

const network = {
    type: NETWORK,
    rpcUrl: RPC_URL
};

async function getActiveAccount(request=false) {
    const activeAccount = await wallet.client.getActiveAccount();

    // no active account, we need permissions first
    if (!activeAccount && request) {
        await wallet.requestPermissions({ network });
        return getActiveAccount();
    }
    return activeAccount;
};

async function clearActiveAccount() {
    return wallet.client.clearActiveAccount();
}

async function getMinterContract() {
    return Tezos.wallet.at(MINTER_CONTRACT_ADDRESS);
}

export {
    Tezos,
    wallet,
    getActiveAccount,
    clearActiveAccount,
    getMinterContract,
    FA2_CONTRACT_ADDRESS,
};