import { useEffect } from 'react';

import Contact from './Contact';

import { ContactInterface } from '../interfaces/contactInterface';

interface Props {
  filteredContacts: ContactInterface[];
  displayContactModal: (id: string) => void;
}

const ContactList = ({ filteredContacts, displayContactModal }: Props) => {

  let contactHtml = (filteredContacts
    .sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    .map((contact, index) => {
      return (<Contact contact={contact} displayContactModal={displayContactModal} key={index} />)
    }));

  // useEffect(() => console.log(contactHtml))

  return (
    <section>
      {contactHtml}
    </section>
  )
}

export default ContactList;