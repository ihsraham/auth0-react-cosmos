import type {SafeEventEmitterProvider} from "@web3auth/base";
import {SigningStargateClient, StargateClient} from "@cosmjs/stargate";
import {DirectSecp256k1Wallet, OfflineDirectSigner} from "@cosmjs/proto-signing"

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

  // async getAccounts(): Promise<any> {
  //   try {
  //     const privateKey = await this.provider.request({ method: "private_key"});
  //     const client : any = await StargateClient.connect(rpc);
  //
  //     // Get user's Cosmos public address
  //     const address = (await client.getAccounts())[0];
  //     console.log(address);
  //
  //     return address;
  //   } catch (error) {
  //     console.log(this.provider);
  //     console.log(error);
  //     return error;
  //   }
  // }

  // async getBalance(): Promise<string> {
  //   try {
  //     const client = new StargateClient.connect(this.provider as any);
  //
  //     // Get user's Cosmos public address
  //     const address = (await client.getAccounts())[0];
  //
  //     // Get user's balance in uAtom
  //     const balance = await client.getAllBalances(address);
  //
  //     return balance;
  //   } catch (error) {
  //     return error as string;
  //   }
  // }
  //
  // async sendTransaction(): Promise<any> {
  //   try {
  //     const client = new StargateClient.connect(this.provider as any);
  //
  //     // Get user's Cosmos public address
  //     const fromAddress = (await client.getAccounts())[0];
  //
  //     const destination = fromAddress;
  //
  //     const amount = 1;
  //
  //     const getSignerFromKey = async (): Promise<OfflineDirectSigner> => {
  //       const pKey = await this.getPrivateKey();
  //       return await DirectSecp256k1Wallet.fromKey(pKey, "cosmos");
  //     }
  //
  //     const signer: OfflineDirectSigner = await getSignerFromKey();
  //
  //     const signingClient = await SigningStargateClient.connectWithSigner(this.provider, signer)
  //
  //     // Submit transaction to the blockchain and wait for it to be mined
  //     const receipt = await web3.eth.sendTransaction({
  //       from: fromAddress,
  //       to: destination,
  //       value: amount,
  //       maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
  //       maxFeePerGas: "6000000000000", // Max fee per gas
  //     });
  //
  //     return receipt;
  //   } catch (error) {
  //     return error as string;
  //   }
  // }
  //
  // async signMessage() {
  //   try {
  //     const web3 = new Web3(this.provider as any);
  //
  //     // Get user's Ethereum public address
  //     const fromAddress = (await web3.eth.getAccounts())[0];
  //
  //     const originalMessage = "YOUR_MESSAGE";
  //
  //     // Sign the message
  //     const signedMessage = await web3.eth.personal.sign(
  //       originalMessage,
  //       fromAddress,
  //       "test password!" // configure your own password here.
  //     );
  //
  //     return signedMessage;
  //   } catch (error) {
  //     return error as string;
  //   }
  // }
  //
  // async getPrivateKey(): Promise<any> {
  //   try {
  //     const privateKey = await this.provider.request({
  //       method: "private_key",
  //     });
  //
  //     return privateKey;
  //   } catch (error) {
  //     return error as string;
  //   }
  // }
}