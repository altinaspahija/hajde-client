//External dependencies
import React, { useState, useEffect } from "react";
// Internal dependencies
import axiosApiInstance from "@/authentification/request/request";
import { RestaurantScreen } from "@/screens";
import { useSelector } from "react-redux";

export default ({ navigation, route }) => {
  const allCategorieId = route?.params?.allCategorieId;
  const subcategorieId = route?.params?.subcategorieId;

  const citySelected = useSelector(state=>state?.city?.city);
  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [fetchMore, setFetchMore] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  const [transporti, setTransporti] = useState();
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await axiosApiInstance.get(
        `/product-categories/list-restaurant-categories/null/${page}&city=${citySelected}`
      );
      setSubCategories(response.data);
    })();
  }, []);

  // useEffect(() => {
  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     // get the data from the api
  //     const response = await axiosApiInstance.get(`/product-categories/list-restaurant-categories/null/${page}`);

  //     // set state with the result
  //     setSubCategories(response.data);
  //   }

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch((err) =>console.error(err));
  // }, [])

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
    }
    (async () => {
      if (subCategoriesId === null) {
        //TO DO: remove v2 because it will be moved to environment
        const url = `v2/restaurants/list-restaurants?name=${searchText}&categoryId=${subCategoriesId}&page=${page}&city=${citySelected}`;
        const response = await axiosApiInstance.get(url);
        setBanner(response.data.offers);
        if (response.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.restaurants]);
        } else {
          setData([...data, ...response.data.restaurants]);
          setTransporti(response.data);
        }
        setFetchMore(false);
        setLoading(false);
        setFirstTime(false)
      } else {
        //TO DO: remove v2 because it will be moved to environment
        const url = `v2/restaurants/list-restaurants?name=${searchText}&categoryId=${
          subCategoriesId === null ? "" : subCategoriesId
        }&page=${page}&city=${citySelected}`;
        const response = await axiosApiInstance.get(url);

        if (response.data.restaurants.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }
        if (searchText) {
          setData([...response.data.restaurants]);
        } else {
          setData([...data, ...response.data.restaurants]);
        }
        setFetchMore(false);
        setLoading(false);
      }
    })();
  }, [subCategoriesId, page]);

  const loadMore = () => {
    if (hasMoreItems && !searchText) {
      setPage(page + 1);
    }
  };

  const onSubmitSearched = async (text) => {
    setPage(1);
    setSearchText(text);

    if (subCategoriesId == null || subcategorieId === null) {
      const response = await axiosApiInstance.get(
        //TO DO: remove v2 because it will be moved to environment
        `v2/restaurants/list-restaurants?name=${text}&categoryId=${subCategoriesId}&page=${page}&city=${citySelected}`,
      );
      setData(response.data.restaurants);
    } else {
      const response = await axiosApiInstance.get(
        //TO DO: remove v2 because it will be moved to environment
        `v2/restaurants/list-restaurants?name=${text}&categoryId=${
          subCategoriesId === null || subcategorieId === null
            ? ""
            : subCategoriesId || subcategorieId
        }&page=${page}
        }`
      );
      setData(response.data.restaurants);
    }
  };
  return (
    <RestaurantScreen
      navigation={navigation}
      data={data}
      citySelected={citySelected}
      setData={setData}
      loadMore={loadMore}
      onSubmitSearched={onSubmitSearched}
      subCategoriesId={subCategoriesId}
      allCategorieId={allCategorieId}
      subCategories={subCategories}
      setSubCategoriesId={setSubCategoriesId}
      setPage={setPage}
      loading={loading}
      banner={banner}
      searchText={searchText}
      fetchMore={fetchMore}
      hasMoreItems={hasMoreItems}
      transporti={transporti}
      firstTime={firstTime}
    />
  );
}
