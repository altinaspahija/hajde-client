export default build =>
  build.query({
    query: () => `/client/orders/get-orders/all`,
  })
