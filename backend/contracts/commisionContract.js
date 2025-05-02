// import { COLORS } from '@/library/theme'
// import { SIZING } from '@/library/sizing'
// import { BotCreationWorkspaceInputLabel, BotCreationWorkspaceTagItem, 
// BotCreationWorkspaceScriptConfigurationLabel, BotCreationWorkspaceUnderlinedSpan,
// BotCreationWorkspaceDragAndDropYourScriptSpan, BotCreationWorkspaceOrSpan,
// BotCreationWorkspaceAffirmationSpan, BotCreationWorkspaceFileNameSpan,
// BotCreationWorkspaceSuccessSpan } from '@/library/typography'
// import { MdClose } from "react-icons/md";
// import { MdCloudUpload } from "react-icons/md";
//import Commission from './commission.js'
// import { MdCheck } from "react-icons/md";
// import Confetti from 'react-confetti'

import { useStorage, useAddress, useSigner } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React, { useState, useRef, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import { useRouter } from 'next/router';
import CommissionABI from "@/backend/contracts/abi/commission.json";
import { DIGITAL_ART_NFT_ADDRESS } from '@/backend/contracts/constants';



// const crypto = require('crypto');


const CommissionContract = () => {
    const router = useRouter();
    const [artistAddress, setArtistAddress] = useState(null);
    const [artistName, setArtistName] = useState(null);

    // get the artist name and address from artShop page. 
    useEffect(() => {
        if (router.isReady) {
          const { artistAddress, artistName } = router.query;
          setArtistAddress(artistAddress);
          setArtistName(artistName);
        }
      }, [router.isReady]);


    const [contractName, setContractName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [progressState, setProgressState] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    // const contractName = useRef();
    // const totalCost = useRef();

    const [isMinting, setIsMinting] = useState(false);
    // const [mintMessege, setMintMessege] = useState('');

    const storage = useStorage();
    const userAddress = useAddress();
    const signer = useSigner();

    if (!signer) {
        console.log("Wallet not connected or signer not available.");
        return;
    }

    const contract = new ethers.Contract(DIGITAL_ART_NFT_ADDRESS, CommissionABI, signer);
    //deployContract()

    // async function deployContract() {
    //     // Deploy the contract
    //     const contract = await contractOutline.deploy(artistAddress);
    //   }
    
    async function mintNFT(){
        if (!artistAddress) {
            console.log("No artist address found.");
            return;
        }

        setIsMinting(true)
        try{
        
            // bot creation workspace 
            // for storage

            // images on firebase 
            // ^ before metadata
            // get url of it

            // but url in metadata
            // uploading to storage
            // then minting 



            // I made a place to store the uris
            // const metadata = {
            //     name: contractName,
            //     manager: userAddress,
            //     url: imgUrl
            // };


            // const data = JSON.stringify(metadata) + new Date().toISOString();
            // const hash = crypto.createHash('sha256').update(data).digest('hex');
            // metadata.id = hash;

            // console.log(metadata)

            // const url = await storage.upload(metadata);

            const tx = await contract.safeMint(artistAddress);
            await tx.wait();

            console.log("NFT Minted to Artist!");
            setStatusMessage("NFT Minted to Artist!");
            // setMintMessege("NFT Minted to Artist!");
            // setIsMinting(false);

        } catch(err) {
            console.log(err)
            setStatusMessage(`Error: ${err.toString()}`)
            // setIsMinting(false)
        }
    }


    // create a commission contract
    async function createCommission(){
        try{
            const value = ethers.utils.parseEther((Number(totalCost) / 2).toString());
            const tx = await contract.createCommission(
                contractName,
                ethers.utils.parseEther(totalCost),
                {value}
            );

            tx.wait();
            setStatusMessage('Commission Created Successfully');

       } catch(err) {
        setStatusMessage(`Error: ${err.message}`);
       }
    }


    const payArtist = async (amount) => {
        try{
            const value = ethers.utils.parseEther((Number(amount) / 2).toString()); 
            const tx = await contract.payArtist({ value });
            await tx.wait();
            setStatusMessage('Paid ' + amount + 'ethers to the artist.');
        } catch(err) {
            setStatusMessage(`Error: ${err.message}`);
        }
    }


    // update the progress of the art 
    const updateProgress = async () => {
        try{
            const tx = await contract.updateProgress();
            await tx.wait();

            const state = await contract.getCurrentState();
            setProgressState(state);
            setStatusMessage(`Updated progress to: ${state}`);
        } catch(err) {
            setStatusMessage(`Error: ${err.message}`);
        }
    }


    // Complete the commission
    const completeCommission = async () => {
        try{
            const tx = await contract.completeCommission(tokenId);

            await tx.wait();
            setStatusMessage('Commission complete, NFT transferred to buyer and money sent to the artist.');
        } catch(err) {
            setStatusMessage(`Error: ${err.message}`);
        }
    };

    return (
        <>
          <h2>Commission Your Art</h2>
          <input placeholder="Contract Name" value={contractName} onChange={e => setContractName(e.target.value)} />
          <input placeholder="Total Cost (ETH)" value={totalCost} onChange={e => setTotalCost(e.target.value)} />
    
          <button onClick={createCommission}>Create Commission</button>
          <button onClick={mintNFT}>Mint NFT</button>
          <button onClick={payArtist}>Pay Artist</button>
          <button onClick={updateProgress}>Update Progress</button>
          <input placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)} />
          <button onClick={completeCommission}>Complete & Transfer NFT</button>
    
          <p><strong>Progress:</strong> {progressState}</p>
          <p><strong>Status:</strong> {statusMessage}</p>
        </>
      );



    // return (  
    //  <> 
    //         <TextContent>
    //         {isOpen && (
    //         <PopupOverlay>
    //             <PopupContent>
    //             <CloseButton onClick={() => closePopup()}>&times;</CloseButton>
    //             <PopupTitle>Shopping Form</PopupTitle>
    //             <StyledForm>
    //                 <FormGroup>
    //                 <Label>Desired Artist's Name:</Label>
    //                 <Input value = {artistName}/>
    //                 </FormGroup>
    //                 <FormGroup>
    //                 <Label>Desired Artist's Email:</Label>
    //                 <Input value = {artistEmail}/>
    //                 </FormGroup>
    //                 <FormGroup>
    //                 <Label>Message:</Label>
    //                 <TextArea value="Hello, I was interested in buying an art piece from you."/>
    //                 </FormGroup>
    //                 <SubmitButton type="button" onClick={() => openMessage()}>Submit</SubmitButton>
    //             </StyledForm>
    //             </PopupContent>
    //         </PopupOverlay>
    //         )}
    //         {hasMessage && (
    //         <PopupOverlay>
    //         <PopupContent>
    //             <CloseButton onClick={() => closePopup()}>&times;</CloseButton>
    //             <PopupTitle>Success!</PopupTitle>
    //                 <Label>Your message has successfully sent. The artist will be in touch with you shortly. </Label>
    //             <SubmitButton type="button" onClick={() => closeMessage()}>Close</SubmitButton>
    //         </PopupContent>
    //         </PopupOverlay>
    //         )};
    //     </>
    //     )
       
};

export default CommissionContract;