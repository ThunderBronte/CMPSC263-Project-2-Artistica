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
import CommissionABI from "@/contracts/abi/commission.json";
import { DIGITAL_ART_NFT_ADDRESS } from '@/CENTERAL_VALUES';



const crypto = require('crypto');


const CommissionContract = () => { 
    const [contractName, setContractName] = useState('');
    const [totalCost, setTotalCost] = useState('');
    const [progressState, setProgressState] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    // const contractName = useRef();
    // const totalCost = useRef();

    // const [isMinting, setIsMinting] = useState(false);
    // const [mintMessege, setMintMessege] = useState('');

    const storage = useStorage();
    const userAddress = useAddress();
    const signer = useSigner();

    async function handleNFTmint(){
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


            const metadata = {
                name: botName,
                manager: userAddress,
                tags: selectedTags,
                description: description,
                assets: selectedAssets,
                ManagementFee: parseInt(ManagementFee.current.value),
                PerformanceFee: parseInt(PerformanceFee.current.value),
                script: fileText
            };

            const data = JSON.stringify(metadata) + new Date().toISOString();
            const hash = crypto.createHash('sha256').update(data).digest('hex');
            metadata.id = hash;
            console.log(metadata)
            const contract = new ethers.Contract(DIGITAL_ART_NFT_ADDRESS, TradioABI, signer);
            const url = await storage.upload(metadata);
            const tx = await contract.safeMint(url, metadata.ManagementFee, metadata.script);
            await tx.wait();
            console.log("NFT Minted!");
            setMintMessege("NFT Minted!");
            setIsMinting(false)
        } catch(err) {
            console.log(err)
            setMintMessege(`Error: ${err.toString()}`)
            setIsMinting(false)
        }
      }



}

export default CommissionContract