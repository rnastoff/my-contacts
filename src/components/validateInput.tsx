
const validateInput = (name: string, value: string) => {
  if (name === "phone") {
    const regEx = /^[0-9-]*$/;
    if (!value.match(regEx)) return false;
  }

  if (name === "postalCode") {
    const regEx = /^\d{0,5}$/;
    if (!value.match(regEx)) return false;
    // return regex for phone number
  }

  return true;
}


export default validateInput;
