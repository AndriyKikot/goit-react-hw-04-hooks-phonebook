import PropTypes from 'prop-types';
import s from './ContactList.module.css';

import ContactListItem from './ContactLIstItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) return null;
  return (
    <ul className={s.contact__list}>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          deleteContact={() => onDeleteContact(id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
