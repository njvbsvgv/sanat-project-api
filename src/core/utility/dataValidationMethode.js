const dataValidationMethode = (data) => {
  return data.map((item) => {
    if (!item.trim() != "") {
      return true;
    } else {
      return false;
    }
  });
};


const dataValidationFn = (data) => {
  let validate = false
  data.forEach(el => !el.trim() !== "" ? validate = false : validate = true)
  return validate
}


module.exports = {dataValidationMethode, dataValidationFn};
