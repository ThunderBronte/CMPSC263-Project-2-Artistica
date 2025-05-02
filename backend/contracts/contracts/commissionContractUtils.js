import { ethers } from "ethers";
import { useStorage, useAddress, useSigner } from '@thirdweb-dev/react';
import CommissionABI from "@/backend/contracts/abi/commission.json";
import { DIGITAL_ART_NFT_ADDRESS } from '@/backend/contracts/constants';


const MyComponent = () => {
    const signer = useSigner();
    const [cost, setCost] = useState(null);
  
    useEffect(() => {
      const fetchCost = async () => {
        if (!signer) return;
        const costInEth = await getTotalCost(signer);
        setCost(costInEth);
      };
  
      fetchCost();
    }, [signer]);

    if (!signer) {
        console.log("Wallet not connected or signer not available.");
        return;
    }

    return signer;
  };

MyComponent();




export const getCommissionContract = (signer) => {
  return new ethers.Contract(DIGITAL_ART_NFT_ADDRESS, CommissionABI, signer);
};

export const getTotalCost = async (signer) => {
  console.log("contract ", getCommissionContract(signer))
  const contract = getCommissionContract(signer);
  const total = await contract.getTotalCost();
  return ethers.utils.formatEther(total);
};

export const getBuyer = async (signer) => {
  const contract = getCommissionContract(signer);
  return await contract.buyer();
};

export const getArtist = async (signer) => {
  const contract = getCommissionContract(signer);
  return await contract.artist();
};
