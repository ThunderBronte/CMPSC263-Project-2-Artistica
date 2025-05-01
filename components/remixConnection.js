// import React, { useState, useRef, useEffect } from 'react';
// import styled, {keyframes} from 'styled-components'
// import { COLORS } from '@/library/theme'
// import { SIZING } from '@/library/sizing'
// import { BotCreationWorkspaceInputLabel, BotCreationWorkspaceTagItem, 
// BotCreationWorkspaceScriptConfigurationLabel, BotCreationWorkspaceUnderlinedSpan,
// BotCreationWorkspaceDragAndDropYourScriptSpan, BotCreationWorkspaceOrSpan,
// BotCreationWorkspaceAffirmationSpan, BotCreationWorkspaceFileNameSpan,
// BotCreationWorkspaceSuccessSpan } from '@/library/typography'
// import { MdClose } from "react-icons/md";
// import { MdCloudUpload } from "react-icons/md";
// import { useStorage, useAddress, useSigner } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';
// import CreatingBotLoader from './CreatingBotLoader.js'
// import TradioABI from "@/contracts/abi/TraderoidABI.json"
// import { Traderiod_NFT_CONTRACT_ADDRESS } from '@/CENTERAL_VALUES';
// import { MdCheck } from "react-icons/md";
// import Confetti from 'react-confetti'

// const crypto = require('crypto');

// const BotCreationWorkspace = () => {

//   const [botName, setBotName] = useState('');
//   const [description, setDescription ] = useState('')
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [uploadedFileName, setUploadedFileName] = useState(null);
//   const [isMinting, setIsMinting] = useState(false);

//   const ManagementFee = useRef();
//   const PerformanceFee = useRef()
//   const fileInputRef = useRef(null);
//   const [fileText, setFileText] = useState('');

//   const storage = useStorage();
//   const userAddress = useAddress();
//   const signer = useSigner();

//   const [mintMessege, setMintMessege] = useState('')

//   async function handleNFTmint(){
//     setIsMinting(true)
//     try{
//     const metadata = {
//         name: botName,
//         manager: userAddress,
//         tags: selectedTags,
//         description: description,
//         assets: selectedAssets,
//         ManagementFee: parseInt(ManagementFee.current.value),
//         PerformanceFee: parseInt(PerformanceFee.current.value),
//         script: fileText
//     };
//     const data = JSON.stringify(metadata) + new Date().toISOString();
//     const hash = crypto.createHash('sha256').update(data).digest('hex');
//     metadata.id = hash;
//     console.log(metadata)
//     const contract = new ethers.Contract(Traderiod_NFT_CONTRACT_ADDRESS, TradioABI, signer);
//     const url = await storage.upload(metadata);
//     const tx = await contract.safeMint(url, metadata.ManagementFee, metadata.script);
//     await tx.wait();
//     console.log("NFT Minted!");
//     setMintMessege("NFT Minted!");
//     setIsMinting(false)
//     }catch(err){
//         console.log(err)
//         setMintMessege(`Error: ${err.toString()}`)
//         setIsMinting(false)
//     }
//   }

//   const handleTagSelect = (tag) => {
//     if (!selectedTags.includes(tag)) {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };
// };