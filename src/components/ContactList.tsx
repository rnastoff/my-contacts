import { useEffect } from 'react';

import Contact from './Contact';

import { ContactInterface } from '../interfaces/contactInterface';

interface Props {
  contacts: ContactInterface[];
  filteredContacts: ContactInterface[];
  displayContactModal: (id: string) => void;
}

const ContactList = ({ contacts, filteredContacts, displayContactModal }: Props) => {

  let noContactsHtml = (<p className="text-center mt-3 text-white sm:text-xl text-lg">You have no contacts.</p>)

  let contactHtml = (filteredContacts
    .sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    .map((contact, index) => {
      return (<Contact contact={contact} displayContactModal={displayContactModal} key={index} />)
    }));

  return (
    <section>
      {contacts.length > 0 ? contactHtml : noContactsHtml}
    </section>
  )
}

export default ContactList;