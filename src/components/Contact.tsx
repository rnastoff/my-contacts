import { ContactInterface } from '../interfaces/contactInterface';

interface Props {
  contact: ContactInterface;
  displayContactModal: (id: string) => void;
}

const Contact = ({ contact, displayContactModal }: Props) => {
  return (
    <>
      <section
        className="grid grid-cols-12 text-white mt-6 cursor-pointer"
        onClick={() => displayContactModal(contact.id)}
      >
        <p role="contactListName" className="md:col-span-2 sm:col-span-3 max-[640px]:col-span-5">{`${contact.firstName} ${contact.lastName}`}</p>
        <div className="md:col-span-3 md:block sm:hidden max-[640px]:hidden">
          <p className="">{contact.address}</p>
          <p className="">{`${contact.city} ${contact.state} ${contact.postalCode}`}</p>
        </div>
        <p className="md:col-span-2 sm:col-span-3 max-[640px]:col-span-5">{contact.phone}</p>
        <p className="md:col-span-4 sm:col-span-4 max-[640px]:hidden">{contact.email}</p>
        <div className="" role="contactLabel">{contact.label}</div>
      </section>
      <div className="border-[1px] border-neutral-800 mt-5"></div>
    </>
  )
}

export default Contact;