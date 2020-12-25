import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={s.contact__item} key={id}>
      <p className={s.contact__info}>
        <span className={s.contact__infoName}>{name}:</span>
        <span className={s.contact__infoNumber}> {number}</span>
      </p>

      <button
        className={s.btn__delete}
        type="button"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
