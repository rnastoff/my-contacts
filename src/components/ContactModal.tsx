import { useState, useEffect } from 'react';

import TextInput from './TextInput';
import useForm from '../hooks/useForm';

import { emptyContact } from '../variables/emptyContact';
import { ContactInterface } from '../interfaces/contactInterface';
import { dummyData } from '../variables/dummyData';


interface Props {
  contacts: ContactInterface[];
  setContacts: Function;
  activeContact: ContactInterface;
  setActiveContact: Function;
  setContactModalVisible: Function;
}

const ContactModal = ({ contacts, setContacts, activeContact, setActiveContact, setContactModalVisible }: Props) => {

  const { handleInputChange, handleDropdownChange, values } = useForm(activeContact);

  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    values.new === true ? addNewContact() : updateContact();
    setContactModalVisible(false);
  }

  const addNewContact = () => {
    values.new = false;
    setContacts([...contacts, values])
  }

  const updateContact = () => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === values.id) return values;
      return contact;
    });
    setContacts(updatedContacts);
  }

  const deleteContact = () => {
    const updatedContacts = contacts.filter((contact) => { return contact.id !== values.id });
    setContacts(updatedContacts);
    setActiveContact(emptyContact);
    setContactModalVisible(false);
  }

  const addDummyData = () => {
    setContacts(dummyData);
    setContactModalVisible(false);
  }

  return (
    <form onSubmit={handleSave} className="bg-white w-[20rem] sm:w-[35rem] rounded-md absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                     w-full top-0 left-0 translate-x-0 translate-y-0">
      <div className="Modal-Top flex justify-between rounded-t-md bg-amber-500 p-5">
        <h1 className="text-white sm:text-3xl text-2xl font-semibold self-center">Contact Details</h1>
        <span
          className="material-symbols-outlined text-white sm:text-4xl text-3xl self-center cursor-pointer"
          onClick={() => setContactModalVisible(false)}
        >cancel</span>
      </div>

      <div className="flex sm:justify-between sm:flex-row flex-col px-5 sm:pt-5 pt-2 pb-0">
        <TextInput labelText="First Name" name="firstName" handleChange={handleInputChange} value={values.firstName} />
        <TextInput labelText="Last Name" name="lastName" handleChange={handleInputChange} value={values.lastName} />
      </div>

      <div className="flex sm:justify-between sm:flex-row flex-col px-5 sm:pt-5 pb-0">
        <TextInput labelText="Email" name="email" handleChange={handleInputChange} value={values.email} />
        <TextInput labelText="Phone" name="phone" handleChange={handleInputChange} value={values.phone} />
      </div>

      <div className="flex sm:justify-between sm:flex-row flex-col px-5 sm:pt-5 pb-0">
        <TextInput labelText="Address" name="address" handleChange={handleInputChange} value={values.address} />
        <TextInput labelText="City" name="city" handleChange={handleInputChange} value={values.city} />
      </div>

      <div className="flex sm:justify-between sm:flex-row flex-col px-5 sm:pt-5 pb-0">
        <TextInput labelText="State" name="state" handleChange={handleInputChange} value={values.state} />
        <TextInput labelText="Postal Code" name="postalCode" handleChange={handleInputChange} value={values.postalCode} />
      </div>

      <div className="px-5 sm:pt-5 sm:mt-0 mt-2">
        <label htmlFor="labels">Labels</label>
        <select
          className="Dropdown border-[1px] border-neutral-300 outline-0 h-11 w-full"
          name="label"
          id="labels"
          onChange={handleDropdownChange}
          value={values.label}
        >
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="buttons px-5 pt-5 pb-7">
        <button className="bg-amber-500 text-white rounded h-11 w-28 active:scale-95" type="submit">Save</button>
        <button className="bg-red-500 text-white rounded h-11 w-28 ml-2 active:scale-95" type="button" onClick={deleteContact}>Delete</button>
        <button className="bg-blue-500 text-white rounded h-11 w-28 ml-2 active:scale-95" type="button" onClick={addDummyData}>Mock</button>
      </div>
    </form>
  )
}

export default ContactModal;