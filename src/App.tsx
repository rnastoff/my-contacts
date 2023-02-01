import { useState, useEffect } from 'react';
import './App.css';
import uuid from 'react-uuid';

import Header from './components/Header';
import Menu from './components/Menu';
import Labels from './components/Labels';
import ContactList from './components/ContactList';
import ContactModal from './components/ContactModal';
import DeleteModal from './components/DeleteModal';

import { emptyContact } from './variables/emptyContact';
import { ContactInterface } from './interfaces/contactInterface';

function App() {

  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactInterface[]>([]);
  const [activeContact, setActiveContact] = useState<ContactInterface>(emptyContact);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("All");



  const displayContactModal = (id?: string) => {
    if (!id) setActiveContact({ ...emptyContact, id: uuid() });
    if (id) setActiveContact(getActiveContact(id)[0]);
    setContactModalVisible(true);
  }

  const getActiveContact = (id: string) => {
    return contacts.filter((contact) => id === contact.id);
  }

  let filterContacts = (search: string, dropdown: string) => {
    let updatedContacts = contacts;
    if (dropdown !== "All") {
      updatedContacts = updatedContacts.filter((contact) => dropdown === contact.label);
    }
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
  }, [searchValue, dropdownValue, contacts])


  // LOGGING
  useEffect(() => { console.log("contacts", contacts) })

  return (
    <div className="flex justify-center min-h-screen bg-stone-900 px-4">
      {contactModalVisible && <div className="absolute h-screen w-screen bg-black/50"></div>}
      {contactModalVisible && <ContactModal contacts={contacts} setContacts={setContacts} activeContact={activeContact} setActiveContact={setActiveContact} setContactModalVisible={setContactModalVisible} />}

      <main className="container w-[65rem]">
        <Header />
        <Menu displayContactModal={displayContactModal} setSearchValue={setSearchValue} setDropdownValue={setDropdownValue} />
        <Labels />
        <ContactList filteredContacts={filteredContacts} displayContactModal={displayContactModal} />
      </main>
    </div>
  );
}

export default App;
