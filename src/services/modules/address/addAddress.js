export default build =>
  build.mutation({
    query: (address) => ({
        url: '/client/profile/add-address',
        method: 'POST',
        body: {
            "street": address.street,
            "city": address.city,
            "country": address.country,
            "latitude": address.latitude,
            "longitude": address.longitude
        }
    })
  })
