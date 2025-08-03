export async function getProductList(searchTerm) {
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products`);
    if (!response.ok) {
      //throw { message: responce.statusText, status: responce.status };
      const error = new Error(response.statusText);
      error.status = response.status;
      throw error;
    }
    const data = await response.json();

    if (searchTerm) {
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      return filtered;
    } else {
      return data;
    }
  } catch (e) {
    console.error("Error while fetching products: ", e);
  }
}

export async function getProduct(id) {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products/${id}`
  );
  if (!response.ok) {
    //throw { message: response.statusText, status: response.status };
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getFeaturedList() {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/featured_products`
  );
  if (!response.ok) {
    //throw { message: response.statusText, status: response.status };
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data;
}
