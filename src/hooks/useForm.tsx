import { useState, useEffect } from 'react';

import { ContactInterface } from '../interfaces/contactInterface';
import validateInput from '../components/validateInput';


const useForm = (activeContact: ContactInterface) => {
  const [values, setValues] = useState<ContactInterface>({
    id: activeContact.id,
    firstName: activeContact.firstName,
    lastName: activeContact.lastName,
    email: activeContact.email,
    phone: activeContact.phone,
    address: activeContact.address,
    postalCode: activeContact.postalCode,
    city: activeContact.city,
    state: activeContact.state,
    label: activeContact.label,
    new: activeContact.new
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (validateInput(name, value))
      setValues({
        ...values,
        [name]: value
      });
  }

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    });
  }

  return { handleInputChange, handleDropdownChange, values };
}

export default useForm;