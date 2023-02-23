import type {SafeEventEmitterProvider} from "@web3auth/base";
import {SigningStargateClient, StargateClient} from "@cosmjs/stargate";
import {DirectSecp256k1Wallet, OfflineDirectSigner} from "@cosmjs/proto-signing";

const objEncode = require('object-encode');

const rpc = "rpc.sentry-01.theta-testnet.polypore.xyz:26657";
export default class CosmosRPC {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }



  async getChainId(): Promise<string> {
    try {
      const client = await StargateClient.connect(rpc);

      // Get the connected Chain's ID
      const chainId = await client.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const privateKey = Buffer.from(await this.getPrivateKey(), 'hex');
      const walletPromise = await DirectSecp256k1Wallet.fromKey(privateKey, "cosmos");
      return (await walletPromise.getAccounts())[0].address;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getBalance(): Promise<any> {
    try {
      const client = await StargateClient.connect(rpc);

      const privateKey = Buffer.from(await this.getPrivateKey(), 'hex');
      const walletPromise = await DirectSecp256k1Wallet.fromKey(privateKey, "cosmos");
      const address = (await walletPromise.getAccounts())[0].address;
      // Get user's balance in uAtom
      return await client.getAllBalances(address);
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      await StargateClient.connect(rpc);
      const privateKey = Buffer.from(await this.getPrivateKey(), 'hex');
      console.log(typeof(privateKey));
      const walletPromise = await DirectSecp256k1Wallet.fromKey(privateKey, "cosmos");
      const fromAddress = (await walletPromise.getAccounts())[0].address;

      const destination = "cosmos15aptdqmm7ddgtcrjvc5hs988rlrkze40l4q0he";

      const getSignerFromKey = async (): Promise<OfflineDirectSigner> => {
        return DirectSecp256k1Wallet.fromKey(privateKey,  "cosmos");
      }
      const signer: OfflineDirectSigner = await getSignerFromKey();

      const signingClient = await SigningStargateClient.connectWithSigner(rpc, signer);

      const result = await signingClient.sendTokens(
          fromAddress,
          destination,
          [{ denom: "uatom", amount: "250" }],
          {
            amount: [{ denom: "uatom", amount: "250" }],
            gas: "100000",
          },
      )
      console.log(result);
      return result.transactionHash;
    } catch (error) {
      console.log(error);
      return error as string;
    }
  }

  async signMessage() {
    try {
      await StargateClient.connect(rpc);
      const privateKey = Buffer.from(await this.getPrivateKey(), 'hex');
      console.log(typeof(privateKey));
      const getSignerFromKey = async (): Promise<OfflineDirectSigner> => {
        return DirectSecp256k1Wallet.fromKey(privateKey,  "cosmos");
      }
      const signer: OfflineDirectSigner = await getSignerFromKey();

      const address = (await signer.getAccounts())[0].address;

      const signingClient = await SigningStargateClient.connectWithSigner(rpc, signer);
      // const defaultGasPrice = GasPrice.fromString('0.025uatom');
      // const fee : StdFee = calculateFee(80_000, defaultGasPrice);
      //
      // let signTx = await signingClient.sign(address, objEncode.encode("YOUR_MESSAGE"), fee, "MEMO");
      // const signingStargateClient = await SigningStargateClient.offline(signer);
      // console.log(JSON.stringify(signingStargateClient));
      const numberPromise = await signingClient.simulate(address, objEncode.encode("YOUR_MESSAGE"), "MEMO");
      console.log(numberPromise.toString());
      return numberPromise;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      return await this.provider.request({
        method: "private_key",
      });
    } catch (error) {
      return error as string;
    }
  }
}