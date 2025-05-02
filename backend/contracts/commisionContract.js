import { useStorage, useAddress, useSigner } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import React, { useState, useRef, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import { useRouter } from 'next/router';
import CommissionABI from "@/backend/contracts/abi/commission.json";
import { DIGITAL_ART_NFT_ADDRESS } from '@/backend/contracts/constants';



const CommissionContract = ({artistInfo}) => {
    const [artistAddress, setArtistAddress] = useState(null);
    const [artistName, setArtistName] = useState(null);

      useEffect(() => {
        console.log("artist infoooo: " + artistInfo)
        if (artistInfo) {
          setArtistName(artistInfo.name);
          setArtistAddress(artistInfo.address);
        }
      }, []);


    const [contractName, setContractName] = useState('');
    //const [imgUrl, setImgUrl] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [remainingCost, setRemainingTotal] = useState('');
    const [progressState, setProgressState] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [sendingAmount, setSendingAmount] = useState('');

    // set messages 
    const [statusMessage, setStatusMessage] = useState("");
    const [statusMessageFillOut, setStatusMessageFillout] = useState("");
    const [statusMessageComplete, setStatusMessageComplete] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageFillOut, setErrorMessageFillOut] = useState("");
    const [errorMessageComplete, setErrorMessageComplete] = useState("");
    

    const [isMinting, setIsMinting] = useState(false);

    const storage = useStorage();
    const userAddress = useAddress();
    const signer = useSigner();

    if (!signer) {
        console.log("Wallet not connected or signer not available.");
        return;
    }

    const contract = new ethers.Contract(DIGITAL_ART_NFT_ADDRESS, CommissionABI, signer);
    
    async function mintNFT(){
        if (!artistAddress) {
            console.log("No artist address found.");
            setErrorMessageFillOut("Error: No artist address found.");
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
            setStatusMessageFillout("Status: NFT Minted to Artist!");
            setErrorMessageFillOut(``);

        } catch(err) {
            console.log(err)
            setErrorMessageFillOut(`Error: ${err.toString()}`)
            setStatusMessageFillout("");
            // setIsMinting(false)
        }
    }


    // create a commission contract
    async function createCommission(){
        try{
            console.log(artistAddress);
            if (!artistAddress) {
                setErrorMessage("Error: Invalid or missing artist address.");
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
            setStatusMessage('Status: Commission Contract Created Successfully');
            setErrorMessage(``);

       } catch(err) {
        setErrorMessage(`Error: ${err.message}`);
        setStatusMessage(``);
       }
    }


    // pay the artist
    const payArtist = async () => {
        try{
            const value = ethers.utils.parseEther(sendingAmount.toString()); 
            const tx = await contract.payArtist({ value });
            await tx.wait();
            setStatusMessageFillout('Status: Paid ' + amount + 'ethers to the artist.');
            setErrorMessageFillOut(``);
        } catch(err) {
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout(``);
        }
    }


    // update the progress of the art 
    const updateProgress = async () => {
        try{
            const tx = await contract.updateProgress();
            await tx.wait();

            const state = await contract.getCurrentState();
            setProgressState("Progress: " + state);
            setStatusMessageFillout(`Status: Updated progress to: ${state}`);
            setErrorMessageFillOut(``);
        } catch(err) {
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout(``);
        }
    }


    // Complete the commission
    const completeCommission = async () => {
        try{
            const tx = await contract.completeCommission(tokenId);

            await tx.wait();
            setStatusMessageComplete('Status: Commission complete, NFT transferred to buyer and money sent to the artist.');
            setErrorMessageComplete(``);
        } catch(err) {
            setErrorMessageComplete(`Error: ${err.message}`);
            setStatusMessageComplete('');
        }
    };

    // Get the total cost of the coontract
    const getRemaining = async() =>{
        try{
            const remaining = await contract.getRemainingCost();
            setRemainingTotal(remaining);
            console.log(remaining);

            return ethers.utils.formatEther(remaining);
        } catch(err){
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout('');
        }
    }

     // get the contract name
     const getTotalCost = async() =>{
        try {
            const total = await contract.getTotal();
            console.log(total);

            return ethers.utils.formatEther(total);
          } catch (err) {
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout('');
          }
    }

    // get the buyer of the contract
    const getBuyer = async() =>{
        try{
            const buyer = await contract.buyer();
            console.log(buyer);

            return ethers.utils.formatEther(buyer);
        } catch(err){
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout('');
        }
    }

    // get the artist of the contract
    const getArtist = async() =>{
        try{
            const artist = await contract.artist();
            console.log(artist);

            return ethers.utils.formatEther(artist);
        } catch(err){
            setErrorMessageFillOut(`Error: ${err.message}`);
            setStatusMessageFillout('');
        }
    }


    // get the contract name
    const getContractName = async() =>{
        try {
            const name = await contract.getContractName();
            console.log("Contract name:", name);
            return name;
          } catch (err) {
            console.error("Error getting contract name:", err);
          }
    }



      return (
        <ContentContainer>
        <Space>.</Space>
        <FormContainer>
            <FormTitle>Commission Artist: {artistName} at {artistAddress}</FormTitle>

            <ErrorText> {errorMessage}</ErrorText>
            <StyledLabel>Contract Name</StyledLabel>
            <StyledInput
            // value={contractName}
            onChange={e => setContractName(e.target.value)}
            />

            <StyledLabel>Artist Address</StyledLabel>
            <StyledInput
                // value={artistAddress}
                onChange={e => setArtistAddress(e.target.value)}
            />

            <StyledLabel>Total Cost (ETH)</StyledLabel>
            <StyledInput
            // value={totalCost}
            onChange={e => setTotalCost(e.target.value)}
            />

            <StyledLabel>Pay half of contract price (ETH)</StyledLabel>
            <StyledInput
            // value={sendingAmount}
            onChange={e => setSendingAmount(e.target.value)}
            />

            <StyledButton onClick={createCommission}>Create Commission</StyledButton>
            <StatusText>{statusMessage}</StatusText>
        </FormContainer>


        <FormContainer>
            <FormTitle>Fill out Contract</FormTitle>
            
            <ErrorText> {errorMessageFillOut}</ErrorText>
            <StyledLabel>Enter Artist's Address</StyledLabel>
            <StyledInput
                // value={artistAddress}
                onChange={e => setArtistAddress(e.target.value)}
            />
            <StyledButton onClick={mintNFT}>Mint NFT For Artist</StyledButton>
            <br></br>

            <StyledLabel>Pay Artist (ETH)</StyledLabel>
            <StyledInput
                // value={sendingAmount}
                onChange={e => setSendingAmount(e.target.value)}
            />
            <StyledButton onClick={() => payArtist()}>Pay Artist</StyledButton>
            <br></br>

            <StyledLabel>Artists, Update Art Progress</StyledLabel>
            <StyledButton onClick={updateProgress}>Update Progress</StyledButton>
            <br></br>

            <StyledLabel>Get Remaining Cost</StyledLabel>
            <StyledButton onClick={getRemaining}>Get Remaining Cost</StyledButton>
            <StatusText>{remainingCost}</StatusText>


            <StatusText>{progressState}</StatusText>
            <StatusText>{statusMessageFillOut}</StatusText>

        </FormContainer>
        <FormContainer>
            <FormTitle>Complete Contract</FormTitle>

            <ErrorText> {errorMessageComplete}</ErrorText>
            <StyledLabel>Artists's Art piece (NFT Token ID)</StyledLabel>
            <StyledInput
                // value={tokenId}
                onChange={e => setTokenId(e.target.value)}
            />
            <StyledButton onClick={completeCommission}>Complete Contract & Transfer NFT</StyledButton>

            <StatusText>{statusMessageComplete}</StatusText>
            
        </FormContainer>
        <Space>.</Space>
        </ContentContainer>
      );
    };
    
       

    const ContentContainer = styled.div`
      background-color: #120E14;
      color: white;
    `;

    const Space = styled.div` color: #120E14; `;

    const FormContainer = styled.div`
    background-color: #292430;
    color: white;
    max-width: 50%;
    margin: 40px auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
  `;
  
  const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
  `;
  
  const StyledLabel = styled.label`
    font-weight: 600;
    margin-top: 10px;
  `;
  
  const StyledInput = styled.input`
    padding: 10px;
    color: white;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    background: transparent;
  `;
  
  const StyledButton = styled.button`
    background-color: #FFD725;
    color: black;
    padding: 10px;
    margin-top: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  
    &:hover {
      background-color: #CEAD1B;
    }
  `;
  
  const StatusText = styled.p`
    text-align: center;
    margin-top: 10px;
    font-size: 0.95rem;
    background: transparent;
    padding: 10px;
    border-radius: 6px;
    color: white;
  `;

  const ErrorText = styled.p`
  margin-top: 5px;
  font-size: 0.95rem;
  background: transparent;
  padding: 10px;
  border-radius: 6px;
  color: red;
`;
  

export default CommissionContract;