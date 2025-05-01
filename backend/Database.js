import { doc, setDoc, getDoc, getDocs, collection, query, where, deleteDoc, addDoc } from "firebase/firestore"
import { database } from "./Firebase"
import { getDatabase, ref, set, onValue } from "firebase/database"

//Read and write infmoration to the databse based on if its a collection, docuemnt, or in a document. 
// Use the user's email and other variables to grab the desired information.


// fetch art shopers
export const fetchArtShop= async () =>{
  try{
    const docRef = doc(database, "Artists/users");
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const artShop = data.artShop;

    const listOfArtists = [];
    let artistInfo = {};

    artShop.forEach((doc) => {
      console.log("doc: " + doc);
      // Popular inner variable with art shop information
      artistInfo = {
        id: doc.id,
        name: doc.name,
        email: doc.email,
        url: doc.url,
      }

      // Add it to list
      listOfArtists.push(artistInfo);
    })

    return listOfArtists;


  } catch(err) {
    console.error("Error fetching databse data from subCollection documents: ", err)
    return null;
  }
}


// fetch art traders
export const fetchArtTrade= async () =>{
  try{
    const docRef = doc(database, "Artists/users");
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const artShop = data.artTrade;

    const listOfArtists = [];
    let artistInfo = {};

    artShop.forEach((doc) => {
      console.log("doc: " , doc);
      // Popular inner variable with art shop information
      artistInfo = {
        id: doc.id,
        name: doc.name,
        email: doc.email,
        url: doc.url,
      }

      // Add it to list
      listOfArtists.push(artistInfo);
    })

    return listOfArtists;


  } catch(err) {
    console.error("Error fetching databse data from subCollection documents: ", err)
    return null;
  }
}





// I have it set up so the "document" is the user's email and the fields are the cat id & url

// Get data from the document database based on an email 
// export const fetchEmailData = async (email) => {
//   try{
//     const docRef = doc(database, "UserCatCartCollection", email);
//     const docSnap = await getDoc(docRef);

//     // See if the user info exists in the database 
//     if(docSnap.exists()){
//       return docSnap.data();
//     } else {
//       console.log("No luck :( document does not exist");
//       return null
//     }
//   } catch(err) {
//     console.error("Error fetching databse data from document: ", err)
//     return null;
//   }
// }


// // Get the list of cats from the subcollection
// export const fetchCatListData = async (email) => {
//   try{
//     // Get sub collection
//     const docRef = doc(database, `/UserCatCartCollection/${email}`);
//     const subRef = collection(docRef, "catsSaved");
//     // is array of docs
//     const querySnapshot = await getDocs(subRef);

//     const listOfCats = [];
//     let catInfo = {};

//     querySnapshot.forEach((doc) => {
//       // Popular inner variable with cat information
//       catInfo = {
//         id: doc.data().id,
//         url: doc.data().url,
//         name: doc.data().name
//       }

//       // Add it to list
//       listOfCats.push(catInfo);
//     })

//     return listOfCats;
//   } catch(err) {
//     console.error("Error fetching databse data from subCollection documents: ", err)
//     return null;
//   }
// }


// // Get data from the a collection within a doc
// export const fetchCollectionData = async (email, subName) => {
//   try{
//     const docRef = doc(database, `/UserCatCartCollection/${email}`);
//     const subRef = collection(docRef, subName);
//     const querySnapshot = await getDocs(subRef);
//     const subCollect = [];

//     querySnapshot.forEach((doc) => {
//       subCollect.push(doc.data());
//     })

//     return subCollect;

//   } catch(err) {
//     console.error("Error fetching collection data from document: ", err)
//     return [];
//   } 
// }



// // Remove from database
// export const deleteDesiredCat = async (email, catRef) =>{
//   try{
//     const docRef = doc(database, `/UserCatCartCollection/${email}/catsSaved/${catRef}`);

//     console.log("docRef: ", docRef);
//     await deleteDoc(docRef);

//   } catch(err) {
//     console.log("Unable to delete desired data: ", err);
//   }

// }



// // Create a new document and add infomration to it
// export const createDoc = async (email, data) =>{
//   try{
//     await addEmail(email);
//     const docRef = doc(database, `/UserCatCartCollection/${email}/catsSaved/`, data.id);
//     await setDoc(docRef, data);
//   } catch(err) {
//     console.log("Unable to create document in databse. ", err);
//   }
// }

// async function addEmail(email){
//   try{
//     const docRef = doc(database, `/UserCatCartCollection/${email}`);
//     await setDoc(docRef, { email });
    
//     console.log("Set uo email!")
//   } catch(err) {
//     console.log("Unable to add email in database. ", err);
//   }
// }


















/*
// wrong thing...
function writeToDB(email, catId, url){
  const reference = ref(getDatabase(), "/userInfo");
  set(reference, {
    email: email,
    catInfo: {
      id: catId,
      url: url
    }
  });
}

function readDB(){
  const catUrlRef = ref(database, "/userInfo/catInfo/url");
  onValue(catUrlRef, (snapshot) => {
    const data = snapshot.val();
    update;
  })
}

writeToDB("em@gmail.com", "ididididididid", "url.url.com"); */