import React, { useEffect } from "react";
import { OrderDetails } from "@/screens";
import { useLazyFetchOrderDetailsQuery } from "@/services/modules/orders";
import { ActivityIndicator } from "react-native";
import { ConvertStatusToNumber } from "@/utils/OrderStatuses";

export default ({ route }) => {
  const { id, status } = route.params;
  const statusNumber = ConvertStatusToNumber(status);
  const [fetchOrderDetails, { data, isLoading, isError }] = useLazyFetchOrderDetailsQuery();
  
  useEffect(async () => {
    await fetchOrderDetails(id);
    
  }, [data])
  
  return isLoading && !data ? <ActivityIndicator /> : <OrderDetails data={data} statusNumber={statusNumber}/>;
};
