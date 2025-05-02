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
        console.log("artist " + artistAddress)
        console.log("router: " + router.isReady)
        if (router.isReady) {
          const { artistAddress, artistName } = router.query;
          setArtistAddress(artistAddress);
          setArtistName(artistName);
        }
      }, []);


    const [contractName, setContractName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [progressState, setProgressState] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [sendingAmount, setSendingAmount] = useState('');

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

        } catch(err) {
            console.log(err)
            setStatusMessage(`Error: ${err.toString()}`)
            // setIsMinting(false)
        }
    }


    // create a commission contract
    async function createCommission(){
        try{
            console.log(artistAddress);
            if (!artistAddress || !ethers.utils.isAddress(artistAddress)) {
                setStatusMessage("Invalid or missing artist address.");
                return;
            }
            const value = ethers.utils.parseEther(sendingAmount);
            const tx = await contract.createCommission(
                contractName,
                artistAddress,
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

    // return (
    //     <>
    //       <h2>Commission Your Art</h2>
    //       <input placeholder="Contract Name" value={contractName} onChange={e => setContractName(e.target.value)} />
    //       <input placeholder="Total Cost (ETH)" value={totalCost} onChange={e => setTotalCost(e.target.value)} />
    //       <input placeholder="Amount to send (ETH)" value={sendingAmount} onChange={e => setSendingAmount(e.target.value)} />
    
    //       <button onClick={createCommission}>Create Commission</button>
    //       <button onClick={mintNFT}>Mint NFT</button>
    //       <button onClick={payArtist}>Pay Artist</button>
    //       <button onClick={updateProgress}>Update Progress</button>
    //       <input placeholder="Token ID" value={tokenId} onChange={e => setTokenId(e.target.value)} />
    //       <button onClick={completeCommission}>Complete & Transfer NFT</button>
    
    //       <p><strong>Progress:</strong> {progressState}</p>
    //       <p><strong>Status:</strong> {statusMessage}</p>
    //     </>
    //   );

      return (
        <FormContainer>
          <FormTitle>🎨 Commission Your Art</FormTitle>
    
          <StyledLabel>Contract Name</StyledLabel>
          <StyledInput
            placeholder="e.g., Ocean Landscape"
            value={contractName}
            onChange={e => setContractName(e.target.value)}
          />
    
          <StyledLabel>Total Cost (ETH)</StyledLabel>
          <StyledInput
            placeholder="e.g., 1.5"
            value={totalCost}
            onChange={e => setTotalCost(e.target.value)}
          />
    
          <StyledLabel>Amount to Send (ETH)</StyledLabel>
          <StyledInput
            placeholder="e.g., 0.75"
            value={sendingAmount}
            onChange={e => setSendingAmount(e.target.value)}
          />
    
          <StyledButton onClick={createCommission}>Create Commission</StyledButton>
          <StyledButton onClick={mintNFT}>Mint NFT</StyledButton>
          <StyledButton onClick={() => payArtist(sendingAmount)}>Pay Artist</StyledButton>
          <StyledButton onClick={updateProgress}>Update Progress</StyledButton>
    
          <StyledLabel>Token ID</StyledLabel>
          <StyledInput
            placeholder="e.g., 0"
            value={tokenId}
            onChange={e => setTokenId(e.target.value)}
          />
          <StyledButton onClick={completeCommission}>Complete & Transfer NFT</StyledButton>
    
          <StatusText><strong>Progress:</strong> {progressState}</StatusText>
          <StatusText><strong>Status:</strong> {statusMessage}</StatusText>
        </FormContainer>
      );
    };
    



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
       
    const FormContainer = styled.div`
    max-width: 500px;
    margin: 40px auto;
    padding: 30px;
    background: #fdfdfd;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
  `;
  
  const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  `;
  
  const StyledLabel = styled.label`
    font-weight: 600;
    margin-top: 10px;
    color: #444;
  `;
  
  const StyledInput = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
  `;
  
  const StyledButton = styled.button`
    background-color: #4f46e5;
    color: white;
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  
    &:hover {
      background-color: #4338ca;
    }
  `;
  
  const StatusText = styled.p`
    margin-top: 10px;
    color: #333;
    font-size: 0.95rem;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 6px;
  `;
  

export default CommissionContract;