import React, { useCallback, useEffect, useRef, useState } from "react";
import CoreImage from "@/utils/CoreImage";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useLocation, useTheme } from "@/hooks";
import { Header } from "react-native-elements";
import {
  SwipableComponent,
  FooterPanelOrderDetails,
  BackButton,
  AddressAutoComplete,
} from "@/components";

const DEFAULT_REGION_LATITUDE = 42.653073;
const DEFAULT_REGION_LONGITUDE = 21.150157;
const initialRegion = {
  latitude: DEFAULT_REGION_LATITUDE,
  longitude: DEFAULT_REGION_LONGITUDE,
};

const ShoppingCartScreen = ({
  navigation,
  comment,
  setComment,
  basket,
  data,
  currency,
  marketName,
  restaurantName,
  manualData,
  offers,
  total,
  removeProduct,
  removeManualProduct,
  decNum,
  incNum,
  onPress,
  openPermissionModal,
  setFormattedAddress,
  formattedAddress,
  street,
  setStreet,
  country,
}) => {
  const { Common, Layout, Gutters, Images, Colors } = useTheme();
  const { primary, header, black, backgroundWhite, titleBanner } = Common;
  const {
    container,
    baseText,
    infoText,
    address: addressStyle,
    addressButton,
    addressButtonText,
    deleteNoteContainer,
    deleteProduct,
    marketStyle,
    textInput,
    stampOriginalContainer,
    editIconContainer,
    confirmButton,
    confirmButtonText,
    offerItem,
    offerItemText,
    offerItemTextBold,
  } = Common.shoppingCart;
  let modal = useRef(null).current;

  
  const { location, permissionResult, displayPermission } = useLocation(
    initialRegion,
    true,
    false
  );

  return (
    <View style={[Layout.fill, backgroundWhite]}>
      <Header
        statusBarProps={{
          barStyle: "dark-content",
          translucent: true,
          backgroundColor: "transparent",
        }}
        containerStyle={{
          backgroundColor: primary,
          borderBottomWidth: 1,
        }}
        placement="center"
        leftComponent={
          navigation.canGoBack() && (
            <BackButton onPress={() => navigation.goBack()} />
          )
        }
        centerComponent={{
          text: "SHPORTA",
          style: {
            color: header,
            fontSize: 20,
            fontFamily: "Avenire-Regular",
          },
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={navigation.canGoBack()
            ? Layout.fill85
            : Layout.fill70}
      >
        <View style={container}>
          <Text style={titleBanner}>Porosia Juaj</Text>
          <Text style={infoText}>
            {(manualData?.length === 0 && data?.length === 0) ||
            (data?.length === undefined && manualData?.length != 0)
              ? "Ju lutem zgjedhni restorantin ose marketin"
              : `${data.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.quantity,
                  0
                )} Produkte nga "${restaurantName || marketName}"`}
          </Text>

          <View>
            {(data || []).map((item, index) => {
              return (
                <SwipableComponent
                  key={`${item.id}_${index}`}
                  id={`${item.id}_${index}_${navigation.canGoBack()}`}
                  customId={true}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  currency={currency}
                  manual={false}
                  removeProduct={removeProduct}
                  incNum={() => incNum(index, `${item.id}_${index}`, null)}
                  decNum={() => decNum(index, `${item.id}_${index}`, null)}
                  index={index}
                  navigation={navigation}
                />
              );
            })}
            {manualData?.map((item, index) => {
              return (
                <SwipableComponent
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  quantity={item.quantity}
                  removeProduct={() => removeManualProduct(item.name)}
                  incNum={incNum}
                  decNum={decNum}
                  index={index}
                  manual={true}
                  navigation={navigation}
                />
              );
            })}
          </View>

          {(basket?.products?.length != 0 ||
            basket?.typedProducts?.length != 0) && (
            <View style={deleteNoteContainer}>
              {
                <Text style={deleteProduct}>
                  Për të hequr një produkt nga lista tërhiqe majtas
                </Text>
              }
            </View>
          )}
          <View style={{ marginTop: 4 }}>
            <Text style={titleBanner}>Detajet e dërgesës</Text>
            <View style={addressStyle}>
          <ImageBackground
            source={Images.addressMap}
            style={[
              Layout.center,
              Layout.fill,
              Gutters.smallRadius,
              !!street && { backgroundColor: "#111111" },
            ]}
            imageStyle={[Gutters.smallRadius, 
            !!street && { opacity: 0.5 },
            ]}
          >
            <TouchableOpacity
              style={[addressButton,
              !!street && { backgroundColor: "#00000059" },
              ]}
              onPress={openPermissionModal}
              disabled={!!street}
            >
              <Text style={[addressButtonText, 
              !!street && { color: "#FFFFFF" },
              ]}>Adresa Automatike</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
            <View
              style={[
                Gutters.smallTMargin,
                Layout.rowHCenter,
                Layout.justifyContentBetween,
              ]}
            >
              <TouchableOpacity
                style={[Layout.rowHCenter, Layout.fill]}
                onPress={() => modal.open()}
              >
                <View style={[Layout.fill, Layout.rowHCenter]}>
                  <CoreImage
                    style={[stampOriginalContainer, Layout.fill10]}
                    source={Images.logo}
                  />
                  <Text
                    style={[
                      Layout.fill,
                      baseText,
                      Gutters.smallLPadding,
                      Gutters.smallRPadding,
                      !street && {
                        color: Colors.gray,
                        fontStyle: "italic",
                      },
                    ]}
                  >
                    {!street ? `Vendos së paku nje adresë` : street}
                  </Text>
                </View>
                <CoreImage
                  resizeMode={"cover"}
                  style={[editIconContainer, Layout.fill10]}
                  source={Images.iconEditAddress}
                />
              </TouchableOpacity>
            </View>
          </View>

          {offers?.length > 0 && (
            <View style={{ marginTop: 15 }}>
              <Text style={titleBanner}>Ofertat e përftuara</Text>
              <View style={marketStyle}>
                {offers?.map((next) => {
                  return (
                    <View style={offerItem}>
                      <Text style={offerItemText}>{next?.description}</Text>
                      <Text style={offerItemTextBold}>
                        {next?.endDateFormat}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          <View style={{ marginTop: 15 }}>
            <Text style={titleBanner}>Shto koment</Text>
            <TextInput
              name="comment"
              label="comment"
              style={textInput}
              placeholder="Shtoni koment për postierin"
              placeholderTextColor={black}
              numberOfLines={10}
              multiline
              value={comment}
              onChangeText={(txt) => setComment(txt)}
            />
          </View>
          <View
            style={[
              Gutters.nLargeHMargin,
              Gutters.smallBPadding,
              Common.backgroundGray,
            ]}
          >
            <FooterPanelOrderDetails data={total} />
          </View>
        </View>
      </ScrollView>
      <View
        style={
          navigation.canGoBack()
            ? Layout.fill15
            : [Layout.fill30, Common.backgroundReset]
        }
      >
        <TouchableOpacity
          style={[Layout.center, confirmButton]}
          onPress={onPress}
        >
          <Text style={confirmButtonText}>KONFIRMO</Text>
        </TouchableOpacity>
      </View>
      <AddressAutoComplete
        ref={(el) => (modal = el)}
        country={country}
        formattedAddress={formattedAddress}
        setFormattedAddress={setFormattedAddress}
        setStreet={setStreet}
      />
    </View>
  );
};

export default ShoppingCartScreen;
