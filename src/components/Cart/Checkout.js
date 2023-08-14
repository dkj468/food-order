import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const nameValidator = (name) => {
      return (name.trim() !== '');
  }

  const streetValidator = (street) => {
    return (street.trim() !== '');
  }

  const postCodeValidator = (postCode) => {
      return (postCode.trim().length === 6);
  }

  const cityValidator = (country) => {
    return (country.trim() !== '');
  }

  // name
  const {
      value: name, 
      IsValid: nameIsValid, 
      changeHandler: nameChangeHandler, 
      blurHandler: nameBlurHandler,
      inputClass: nameInputClass
    } = useInput(nameValidator, classes);

  // street
  const {
    value: street, 
    IsValid: streetIsValid, 
    changeHandler: streetChangeHandler, 
    blurHandler: streetBlurHandler,
    inputClass: streetInputClass
  } = useInput(streetValidator, classes); 

  // postal code
  const {
    value: postCode, 
    IsValid: postCodeIsValid, 
    changeHandler: postCodeChangeHandler, 
    blurHandler: postCodeBlurHandler,
    inputClass: postCodeInputClass
  } = useInput(postCodeValidator, classes); 

// city
    const {
        value: city, 
        IsValid: cityIsValid, 
        changeHandler: cityChangeHandler, 
        blurHandler: cityBlurHandler,
        inputClass: cityInputClass
        } = useInput(cityValidator, classes);

    //let formIsValid = nameIsValid && streetIsValid && postCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    const userData = {
        name,
        street,
        postCode,
        city
    }

    props.onConfirm(userData);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' 
            onChange={nameChangeHandler} 
            onBlur={nameBlurHandler}
            value={name}
            />
      </div>
      <div className={streetInputClass}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' 
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={street}
            />
      </div>
      <div className={postCodeInputClass}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' 
            onChange={postCodeChangeHandler}
            onBlur={postCodeBlurHandler}
            value={postCode}
            />
      </div>
      <div className={cityInputClass}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' 
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={city}
            />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;