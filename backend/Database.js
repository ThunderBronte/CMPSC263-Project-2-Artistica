import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"
import { getDatabase, ref, set, onValue } from "firebase/database"


// I have it set up so the "document" is the user's email and the fields are the cat id & url

// Get data from the database based on an email 
export const fetchData = async (email) => {
  try{
    const docRef = doc(database, "UserCatCartCollection", email);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Success! Doc data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No luck :( document does not exist");
      return null
    }
  } catch(err) {
    console.error("Error fetching databse data from document: ", err)
    return null;
  }
}

// Get data from the a collection 
export const fetchCollectionData = async (email, subName) => {
  try{
    const docRef = doc(database, `/UserCatCartCollection/${email}`);
    const subRef = collection(docRef, subName);
    const subCollect = [];
    const querySnapshot = await getDocs(subRef);

    querySnapshot.forEach((doc) => {
      subCollect.push(doc.data());
    })

    return subCollect;

  } catch(err) {
    console.error("Error fetching collection data from document: ", err)
    return [];
  } 
}


// Create a new document and add infomration to it
export const createDoc = async (email, data) =>{

}


















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