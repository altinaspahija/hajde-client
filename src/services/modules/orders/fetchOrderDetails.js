export default build =>
  build.query({
    query: id => `/client/orders/get-order-details/${id}`,
  })
