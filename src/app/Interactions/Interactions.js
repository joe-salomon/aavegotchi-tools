import { Component } from 'react'

const Web3 = require('web3')
const Abis = require('../../abis.js')


class Interactions extends Component {

  GOTCHI_ADDRESS = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  RPC_URL = 'https://rpc-mainnet.maticvigil.com/v1/c4faf26e983688f3a71acc5a6c20c338dc0ed063'

  constructor(){
    super();
    this.state = {
      tokenIds: "",
      gotchiContract: null
    }
  }

  componentDidMount() {
    if (typeof window.ethereum !== 'undefined') {    
    
      const web3 = new Web3(this.RPC_URL)  
      const gotchiContract = new web3.eth.Contract(Abis.GOTCHI_ABI, this.GOTCHI_ADDRESS)
      
      this.setState({
        gotchiContract: gotchiContract
      })
      console.log(gotchiContract)
    }
  }

  petGotchi = () => {
    if(this.state.gotchiContract !== null && this.state.tokenIds !== ""){
      
      let tokenIds = this.state.tokenIds.split(" ").map(num => {
        return Number(num);
      })
      console.log(tokenIds)
      let encodedData = this.state.gotchiContract.methods.interact(tokenIds).encodeABI()

      console.log(encodedData)
  
      const transactionParameters = {
        // nonce: '0x00', // ignored by MetaMask
        // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        // gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: this.GOTCHI_ADDRESS,
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data: encodedData,
        chainId: '137', // Matic
      };
  
      window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }).catch(function(error){});
    }
  }

  getAavegotchi = (token) => {
    if(this.state.gotchiContract !== null){
      let response = this.state.gotchiContract.methods.getAavegotchi(token).call()
      console.log(response)
    }
  }

  async connect(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  handleTokenIdsChange = (event) => {
    this.setState({
      tokenIds: event.target.value
    })
  }

  render() {
    if (typeof window.ethereum !== 'undefined') {   
      return (
        <section className="section">
          <div className="container">
              <div className="is-flex is-flex-direction-row-reverse">
                <button type="button" className="nes-btn is-primary" onClick={this.connect}>Connect</button>
              </div>
              <section className="nes-container with-title">
                <h3 className="title">Gotchi Interactions</h3>
                <textarea className="nes-textarea" value={this.state.tokenIds} onChange={this.handleTokenIdsChange}/>
                <button type="button" className="nes-btn is-primary" onClick={this.petGotchi}>Pet Gotchis</button>
              </section>
          </div>
        </section>
      )
    }
    else {
      return (
        <section className="section">
          <div className="container">
            <h3>MetaMask is required</h3>
          </div>
        </section>
      )
    }
  }
  
}



export default Interactions