import Http from "./Http";
export const getProducts = (config)=>Http("/products", config);
export const getProductsCategory = (id, config)=>Http(`/categories/${id}/products`, config);
export const getProduct = (id, config)=>Http(`/products/${id}`, config);
export const getCategories = (config)=>Http("/categories", config);
export const getCategory = (id, config)=>Http(`/categories/${id}`, config);
export const getCommentsProduct = (id, config)=>Http(`products/${id}/comments`, config);
export const createCommentProduct = (id, data)=>Http.post(`products/${id}/comments`, data);
export const order = (data)=>Http.post("/order", data);
export const getOrdersCustomer = (id, config) => Http.get(`/customer/${id}/orders`, config)
export const getOrderCustomer = (id, config) => Http.get(`/customer/order/${id}`, config);
export const canceledOrderCustomer = (id, config)=>Http.get(`/customer/order/${id}/canceled`);

export const loginCustomer = (data)=>Http.post("/customer/login", data);
export const registerCustomer = (data)=>Http.post("/customer/register", data);
export const updateCustomer = (data)=>Http.post("/customer/update", data);
