import  { useContext, useEffect, useState } from 'react';
import signup from "../assets/ash.png";
import Web3 from "web3";
import { createContext } from 'react';
import { useConnection } from '../App';
import { useNavigate } from 'react-router-dom';

function Mint() {

    const { connectionState } = useConnection();
    const { accounts, chainId, contract } = connectionState;
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate()

    const check = () => {
        console.log(accounts, chainId)
    }

    // const getBalance = async () => {
    //   return await contract.methods.balanceOf(accounts).call();
    // }

    useEffect(() =>{
      (async ()=> {
        if(contract) {
          let balance = await contract.methods.balanceOf(accounts).call();
          console.log("balance", balance)
          setBalance(balance)
         }
      })()
    }, [])

    useEffect(() =>{
      (async ()=> {
        if(contract) {
          let balance = await contract.methods.balanceOf(accounts).call();
          console.log("balance", balance)
          setBalance(balance)
         }
      })()
    }, [contract, accounts])


  return (
    <div className="signup" id="signup">
      <div className="container" style={{paddingTop: '10rem'}}>
        <div className="left">
          <p className="sub-title">Mint A New Avatar</p>
          <h1 className="title">Balance : {balance}</h1>
          <p className="description">
            Mint and play the game.
          </p>
         {balance == 0 ? <button onClick={check} >Mint Avatar</button> :  <button onClick={() => navigate('/play')} >Enter Game</button>}
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

export default Mint;
