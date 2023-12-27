import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DynamicContextProvider, DynamicWidget, FilterAndSortWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core';

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { utils } from 'ethers';
import { toBytes } from 'viem'

function Inner() {
  const {primaryWallet} = useDynamicContext();
  const [fetchAddress, setfetchAddress] = useState();
  const [signerAddress, setSignerAddress] = useState();
  const [recoveredAddressEthers, setRecoveredAddressEthers] = useState();
  const [recoveredAddressViem, setRecoveredAddressViem] = useState();


  const signMessage = async () => {
    const testArrayEthers  = utils.arrayify('0x1234')

    const signer =await primaryWallet.connector.ethers.getSigner();

    const sig = await signer.signMessage(testArrayEthers);
    const recoveredAddress = utils.verifyMessage(testArrayEthers, sig);
    setRecoveredAddressEthers(recoveredAddress)


    const viemSigner = await primaryWallet.connector.getSigner();
    const sig2 = await viemSigner.signMessage({account: primaryWallet.address, message: {raw: testArrayEthers}});
    const recoveredAddress2 = utils.verifyMessage(testArrayEthers, sig2);
    setRecoveredAddressViem(recoveredAddress2);
  }

  useEffect(async () => {
    console.log('fetching address')

    if (!primaryWallet) return;
    const fetch = await primaryWallet.connector.fetchPublicAddress();
    const signer =await primaryWallet.connector.ethers.getSigner();
    const signerAddress = await signer.getAddress();

    setfetchAddress(fetch);
    setSignerAddress(signerAddress);
  }, [primaryWallet])

  return (
    <div>
     {primaryWallet &&  (<div>
      Primary Wallet address: {primaryWallet.address} <br/>
      fetchAddress: {fetchAddress}<br/>
      signerAddress: {signerAddress}<br/>
      recoveredAddressEthers: {recoveredAddressEthers}<br/>
      recoveredAddressViem: {recoveredAddressViem}<br/>
      <button onClick={async () => {signMessage()}}>Sign Message</button>
     </div>)}

    </div>
  )
}

export default Inner
