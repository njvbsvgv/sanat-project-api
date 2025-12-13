const ProductTypeDB = require("../../models/level1/productType.model");
const ProductCountry = require("../../models/level1/exportingCountry.model");
const filterProducts = async (
  productList,
  pageNumber,
  rowsOfPage,
  query,
  productType,
  productQuality,
  lssuingCountry,
  minPrice,
  maxPrice
) => {
  const limit = pageNumber * rowsOfPage;
  const startLimit = limit - rowsOfPage;
  let allData = [];
  const typeData = await ProductTypeDB.findOne({ _id: productType });
  const countryData = await ProductCountry.findOne({ _id: lssuingCountry });
  const newData = productList.filter(
    (el) =>
      (!query || el.title.indexOf(query) != -1) &&
      (!productType || el.type.includes(typeData.name) != false) &&
      (!productQuality || el.quality === productQuality) &&
      (!lssuingCountry || el.xportingCountry === countryData.name) &&
      (!minPrice || el.price > minPrice) &&
      (!maxPrice || el.price < maxPrice)
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
