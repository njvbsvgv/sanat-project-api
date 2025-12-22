const ProductTypeDB = require("../../models/level1/productType.model");
const ProductCountry = require("../../models/level1/exportingCountry.model");
const filterProducts = async (RowsOfPage, TypeId) => {
  let allData = [];
  const typeData = await ProductTypeDB.findOne({ _id: productType });
  const countryData = await ProductCountry.findOne({ _id: lssuingCountry });
  const newData = productList.filter(
    (el) =>
      (!TypeId || el.quality === productQuality)
  );

  if (newData.length != 0 && pageNumber && rowsOfPage) {
    const slicedData = newData.slice(startLimit, limit);
    allData = slicedData;
  }
  if (allData.length > 0) {
    return allData;
  } else {
    return allData;
  }
};

module.exports = { filterProducts };
