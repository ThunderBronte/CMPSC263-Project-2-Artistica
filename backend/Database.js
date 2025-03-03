import { doc, setDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"
import { getDatabase, ref, set, onValue } from "firebase/database"



try{
  const docRef = await addDoc(collection(database, "UserCatCollection"), {
    userEmail: "email",
    catInfo: {
      id: "id",
      url: "url"
    }
  });
  console.log("doc written w ID: ", docRef.id)
} catch(err){
  console.error("Error w adding doc: ", err);
}

const querySnapshot = await getDocs(collection(database, "UserCatCollection"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.userEmail} => ${doc.catInfo}`);
})


















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