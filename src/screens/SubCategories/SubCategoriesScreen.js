//External dependencies
import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Searchbar from "@/components/Searchbar/Searchbar";
import { Header } from "react-native-elements";
// Internal dependencies
import {
  BackButton,
  QuickButton,
  DecrementButton,
  SolidButton,
  SubCategoryCard,
} from "@/components";

import { useTheme } from "@/hooks";

export default ({
  navigation,
  setPage,
  subCategories,
  data,
  setData,
  subCategoriesId,
  setSubCategoriesId,
  currency,
  loading,
  loadMore,
  _renderFooter,
  onSubmitSearched,
  title, 
  incNum,
  decNum,
  item,
  marketID
}) => {
  const { Common, Colors, Layout } = useTheme();
  const { subCategory: styles } = Common;

  return (
    <View style={Layout.fill}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'transparent' }}
        containerStyle={{
          backgroundColor: Colors.primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        centerComponent={{
          text: title, //"Nënkategoritë",
          style: {
            color: Colors.header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
        leftComponent={
          <BackButton
            onPress={() => navigation.navigate("KategoriteListaIme", { item, marketID })}
          />
        }
      />
      <View style={styles.container}>
        <View style={Layout.fullWidth}>
          <Searchbar
            containerStyle={styles.searchBarcontainer}
            inputContainerStyle={styles.input}
            onSubmitEditing={(text) => {
              onSubmitSearched(text);
            }}
          />
        </View>
        <View
          style={[
            styles.subCatContainer,
            {
              backgroundColor: "#333",
              borderBottomWidth: 3,
              borderBottomColor: Colors.black,
            },
          ]}
        >
          <FlatList
            data={subCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 1 }}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingRight: 0,
                  }}
                >
                  <SolidButton
                    title={item.name}
                    onPress={() => {
                      setData([]);
                      setSubCategoriesId(item._id);
                      setPage(1);
                    }}
                    isSelected={subCategoriesId === item._id}
                  />
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
        >
          <Text style={styles.titile}>Produktet</Text>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("Homepage", { screen: "Shporta" })
            }
            style={{
              backgroundColor: backgroundColor,
              borderWidth: 1,
              borderColor: Colors.buttonColor,
              paddingHorizontal: 5,
              paddingVertical: 3,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Avenire-Regular",
                color: black,
                textAlign: "center",
              }}
            >
              Shiko shportën
            </Text>
          </TouchableOpacity> */}
        </View>
        {loading ? (
          <View style={Common.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.buttonColor} />
          </View>
        ) : data.length === 0 ? (
          <View style={Common.activityIndicator}>
            <Text style={Common.emptyText}>Për momentin nuk ka produkte</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item, index }) => {
              const id = item._id;
              return (
                <View style={styles.containerCard}>
                  <SubCategoryCard
                    title={item.name}
                    price={item.price}
                    currency={currency}
                    index={index}
                    img={{ uri: item.imageURL }}
                    onPress={() =>
                      navigation.navigate("Produkti", { item, index })
                    }
                  />
                  <View style={styles.quantityContainer}>
                    <QuickButton
                      title="Add"
                      onPress={() => incNum(id, index)}
                    />
                    <Text style={styles.number}>
                      {item.quantity ? item.quantity : 0}
                    </Text>
                    <DecrementButton onPress={() => decNum(id, index)} />
                  </View>
                </View>
              );
            }}
            onEndReached={loadMore}
            ListFooterComponent={_renderFooter}
            onEndReachedThreshold={1}
          />
        )}
      </View>
      {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("Homepage", { screen: "Shporta" })
            }
            style={styles.bottomContainer}
            >
        <Image source={require("../../assets/images/shkoShporta.png")} color="white" height="20" resizeMode="contain"/>
        <Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>Shko te Shporta</Text>
        <Text style={{color:"white",fontSize:18}}>800 Lek</Text>
        </TouchableOpacity> */}
    </View>
  );
};
