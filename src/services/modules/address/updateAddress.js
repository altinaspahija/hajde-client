export default build =>
  build.mutation({
    query: ({id, ...address}) => ({
        url: `/client/profile/set-default-address/${id}`,
        method: 'PUT',
        body: {
            "street": address.street,
            "city": address.city,
            "country": address.country,
            "latitude": address.latitude,
            "longitude": address.longitude
        }
    })
  })
