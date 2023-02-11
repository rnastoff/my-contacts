import { useState, useEffect } from 'react';
import './App.css';
import uuid from 'react-uuid';

import Header from './components/Header';
import Menu from './components/Menu';
import Labels from './components/Labels';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';

import { emptyContact } from './variables/emptyContact';
import { ContactInterface } from './interfaces/contactInterface';

import { auth, provider, db } from './firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore';


function App() {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactInterface[]>([]);
  const [activeContact, setActiveContact] = useState<ContactInterface>(emptyContact);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("All");

  const [loginValue, setLoginValue] = useState("");
  const [uid, setUid] = useState("");

  const usersCollection = collection(db, "users")


  //Page Load/Reload
  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("uid")) {
      handleLoginData(localStorage.getItem("email") || '{}', localStorage.getItem("uid") || '{}');
    }
    else if (localStorage.getItem("contacts")) {
      //Load contacts from localStorage
      setContacts(JSON.parse(localStorage.getItem("contacts") || '{}'));
    }
  }, []);


  // Get Contacts from Database if Login changes
  useEffect(() => {
    if (loginValue) getContactsFromDatabase(uid);
  }, [loginValue, uid]);


  const getContactsFromDatabase = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContacts(JSON.parse(docSnap.data().contacts));
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Set Login Variables
  const handleLoginData = (email: string, userId: string) => {
    localStorage.setItem("email", email);
    localStorage.setItem("uid", userId);
    setLoginValue(email);
    setUid(userId);
  };

  //When Contacts change, update database
  useEffect(() => {
    if (loginValue) {
      const docRef = doc(db, "users", uid);
      setDoc(docRef, { contacts: JSON.stringify(contacts) })
    }
    else {
      //Stops from setting it to an empty array
      if (contacts.length > 0) localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts])

  //Login
  const login = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        if (data.user.email) handleLoginData(data.user.email, data.user.uid);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  //Logout
  const logout = () => {
    localStorage.clear();
    setLoginValue("");
    setUid("");
    setContacts([]);
  }


  //Modal
  const displayContactModal = (id?: string) => {
    if (!id) setActiveContact({ ...emptyContact, id: uuid() });
    if (id) setActiveContact(getActiveContact(id)[0]);
    setContactModalVisible(true);
  }

  const getActiveContact = (id: string) => {
    return contacts.filter((contact) => id === contact.id);
  }

  //Filter
  let filterContacts = (search: string, dropdown: string) => {
    let updatedContacts = contacts;
    if (dropdown !== "All") updatedContacts = updatedContacts.filter((contact) => dropdown === contact.label);
    if (search) {
      const regex = new RegExp(search, 'gi');
      updatedContacts = updatedContacts.filter((contact) => {
        return contact.firstName.match(regex) || contact.lastName.match(regex);
      })
    }
    setFilteredContacts(updatedContacts)
  }

  useEffect(() => {
    filterContacts(searchValue, dropdownValue);
  }, [searchValue, dropdownValue, contacts]);

  // LOGGING
  // useEffect(() => {
  //   console.log("uid", uid);
  // })


  return (
    <div className="flex justify-center min-h-screen bg-stone-900 px-4">
      {contactModalVisible && <div className="absolute h-screen w-screen bg-black/50"></div>}
      {contactModalVisible && <ContactModal contacts={contacts} setContacts={setContacts} activeContact={activeContact} setActiveContact={setActiveContact} setContactModalVisible={setContactModalVisible} />}

      <main className="container w-[65rem]">
        <Header />
        <Menu
          displayContactModal={displayContactModal}
          setSearchValue={setSearchValue}
          setDropdownValue={setDropdownValue}
          login={login}
          loginValue={loginValue}
          logout={logout}
        />
        <Labels />
        <ContactList
          contacts={contacts}
          filteredContacts={filteredContacts}
          displayContactModal={displayContactModal}
        />
      </main>
    </div>
  );
}

export default App;
