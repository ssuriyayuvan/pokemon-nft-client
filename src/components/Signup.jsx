import  { useContext, useEffect, useState } from 'react';
import signup from "../assets/ash.png";
import Web3 from "web3";
import { createContext } from 'react';

const defaultChainId = 5;
export const supportedNetworks = {
  5777: {
      name: 'Truffle',
      tokenSymbol: 'ETH',
      rpcURL: 'http://localhost:7545',
  },
  5: {
      name: 'Goerli',
      tokenSymbol: 'Goerli ETH',
      rpcURL: 'https://goerli.infura.io/v3/',
  }
}

const ConnectionContext = createContext();

export function useConnection() {
    return useContext(ConnectionContext);
}

const Signup = () => {

  const [connectionState, setConnectionState] = useState({
    web3: null,
    chainId: defaultChainId,
    accounts: [],
    error: null,
});


  useEffect(() => {
    // initiate();

    if (window.ethereum) {
        // Detect metamask account change
        window.ethereum.on('accountsChanged', async function (_accounts) {
            setConnectionState({ ...connectionState, accounts: _accounts })
        })

        // Detect metamask network change
        window.ethereum.on('chainChanged', function (networkId) {
            connectWallet();
        });
    }
}, []);
 


  const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw "Browser Wallet Not Found";
        }

        const web3 = new Web3(window.ethereum);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const chainId = await web3.eth.net.getId();

        // if (!supportedNetworks[chainId]) {
        //     throw "Use Correct Network"
        // }

        // const govContract = new web3.eth.Contract(
        //     GovToken.abi,
        //     supportedNetworks[chainId].govAddress
        // );

        // const exchangeContract = new web3.eth.Contract(
        //     Exchange.abi,
        //     supportedNetworks[chainId].exchangeAddress
        // );

        setConnectionState({ ...connectionState, web3, accounts, chainId });
    } catch (e) {
        if (e.code === 4001) {
            // User rejected request
            e = 'Denied Browser Wallet Access';
        }
        console.log("useConnection : connectWallet Error -> ", e.toString());
        setConnectionState({ ...connectionState, error: e.toString() });
    }
}

  return (
    <div className="signup" id="signup">
      <div className="container">
        <div className="left">
          <p className="sub-title">Launching Soon</p>
          <h1 className="title">An NFT like no other</h1>
          <p className="description">
            Don't miss out on the release of our new NFT. Sign up below to
            receive updates when we go live.
          </p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
        <div className="right">
          <div className="image">
            <img src={signup} alt="signup" width={300} height={300} />
          </div>
          <div className="ellipse-container">
            <div className="ellipse pink"></div>
            <div className="ellipse orange"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
