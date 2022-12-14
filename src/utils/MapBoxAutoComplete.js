import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TextInput,
  View,
  FlatList,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  PixelRatio,
} from "react-native";
import Qs from "qs";

const WINDOW = Dimensions.get("window");

const defaultStyles = {
  container: {
    marginTop: 2,
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    height: 44,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  powered: {},
  listView: {
    //flex: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#c8c7cc",
  },
  administrative: {},
  loader: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
  },
  androidLoader: {
    marginRight: -15,
  },
};

class MapBoxAutoComplete extends Component {
  _isMounted = false;
  _results = [];
  _requests = [];

  constructor(props) {
    super(props);
    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    text: this.props.getDefaultValue(),
    dataSource: this.buildRowsFromResults([]),
    listViewDisplayed:
      this.props.listViewDisplayed === "auto"
        ? false
        : this.props.listViewDisplayed,
  });

  setAddressText = (address) => this.setState({ text: address });

  getAddressText = () => this.state.text;

  buildRowsFromResults = (results) => {
    let res = [];

    if (
      results.length === 0 ||
      this.props.predefinedPlacesAlwaysVisible === true
    ) {
      res = [...this.props.predefinedPlaces];

      if (this.props.currentLocation === true) {
        res.unshift({
          administrative: this.props.currentLocationLabel,
          isCurrentLocation: true,
        });
      }
    }

    res = res.map((place) => ({
      ...place,
      isPredefinedPlace: true,
    }));

    return [...res, ...results];
  };

  componentWillMount() {
    this._request = this.props.debounce
      ? debounce(this._request, this.props.debounce)
      : this._request;
  }

  componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._isMounted = true;
    this._onChangeText(this.state.text);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listViewDisplayed !== "auto") {
      this.setState({
        listViewDisplayed: nextProps.listViewDisplayed,
      });
    }

    if (
      typeof nextProps.text !== "undefined" &&
      this.state.text !== nextProps.text
    ) {
      this.setState(
        {
          listViewDisplayed: true,
        },
        this._handleChangeText(nextProps.text)
      );
    }
  }

  componentWillUnmount() {
    this._abortRequests();
    this._isMounted = false;
  }

  _abortRequests = () => {
    this._requests.map((i) => i.abort());
    this._requests = [];
  };

  /**
   * This method is exposed to parent components to focus on textInput manually.
   * @public
   */
  triggerFocus = () => {
    if (this.refs.textInput) this.refs.textInput.focus();
  };

  /**
   * This method is exposed to parent components to blur textInput manually.
   * @public
   */
  triggerBlur = () => {
    if (this.refs.textInput) this.refs.textInput.blur();
  };

  getCurrentLocation = () => {
    let options = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000,
    };

    if (this.props.enableHighAccuracyLocation && Platform.OS === "android") {
      options = {
        enableHighAccuracy: true,
        timeout: 20000,
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (this.props.nearbyPlacesAPI === "None") {
          let currentLocation = {
            administrative: this.props.currentLocationLabel,
            geometry: {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          };

          this._disableRowLoaders();
          this.props.onPress(currentLocation, currentLocation);
        } else {
          this._requestNearby(
            position.coords.latitude,
            position.coords.longitude
          );
        }
      },
      (error) => {
        this._disableRowLoaders();
        alert(error.message);
      },
      options
    );
  };

  _onPress = (rowData) => {
    // this.props.geo_loc(rowData.center);
    // this.props.stringLoc(rowData.text);

    let firstRowLine = rowData.text;
    if (rowData?.address) {
      firstRowLine = `${rowData?.address} ${rowData?.text}`;
    }

    this.setState({
      text: this._renderDescription(firstRowLine),
      listViewDisplayed: false,
    });

    if (
      rowData.isPredefinedPlace !== true &&
      this.props.fetchDetails === true
    ) {
      if (rowData.isLoading === true) {
        // already requesting
        return;
      }

      this._abortRequests();

      // display loader
      this._enableRowLoader(rowData);

      // fetch details
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          if (responseJSON.status === "OK") {
            if (this._isMounted === true) {
              const details = responseJSON.result;
              this._disableRowLoaders();
              this._onBlur();

              this.setState({
                text: this._renderDescription(rowData.text),
              });

              delete rowData.isLoading;
              this.props.onPress(rowData, details);
            }
          } else {
            this._disableRowLoaders();

            if (this.props.autoFillOnNotFound) {
              this.setState({
                text: this._renderDescription(rowData.text),
              });
              delete rowData.isLoading;
            }

            if (!this.props.onNotFound) {
              console.warn(
                "google places autocomplete: " + responseJSON.status
              );
            } else {
              this.props.onNotFound(responseJSON);
            }
          }
        } else {
          this._disableRowLoaders();

          if (!this.props.onFail) {
            console.warn(
              "google places autocomplete: request could not be completed or has been aborted"
            );
          } else {
            this.props.onFail();
          }
        }
      };

      request.open(
        "GET",
        "https://maps.googleapis.com/maps/api/place/details/json?" +
          Qs.stringify({
            key: this.props.query.key,
            placeid: rowData.place_id,
            language: this.props.query.language,
          })
      );

      if (this.props.query.origin !== null) {
        request.setRequestHeader("Referer", this.props.query.origin);
      }

      request.send();
    } else if (rowData.isCurrentLocation === true) {
      // display loader
      this._enableRowLoader(rowData);

      this.setState({
        text: this._renderDescription(rowData),
      });

      this.triggerBlur(); // hide keyboard but not the results
      delete rowData.isLoading;
      this.getCurrentLocation();
    } else {
      this.setState({
        text: this._renderDescription(rowData),
      });

      this._onBlur();
      delete rowData.isLoading;
      let predefinedPlace = this._getPredefinedPlace(rowData);

      // sending predefinedPlace as details for predefined places
      this.props.onPress(predefinedPlace, predefinedPlace);
    }
  };

  _enableRowLoader = (rowData) => {
    let rows = this.buildRowsFromResults(this._results);
    for (let i = 0; i < rows.length; i++) {
      if (
        rows[i].place_id === rowData.place_id ||
        (rows[i].isCurrentLocation === true &&
          rowData.isCurrentLocation === true)
      ) {
        rows[i].isLoading = true;
        this.setState({
          dataSource: rows,
        });
        break;
      }
    }
  };

  _disableRowLoaders = () => {
    if (this._isMounted === true) {
      for (let i = 0; i < this._results.length; i++) {
        if (this._results[i].isLoading === true) {
          this._results[i].isLoading = false;
        }
      }

      this.setState({
        dataSource: this.buildRowsFromResults(this._results),
      });
    }
  };

  _getPredefinedPlace = (rowData) => {
    if (rowData.isPredefinedPlace !== true) {
      return rowData;
    }

    for (let i = 0; i < this.props.predefinedPlaces.length; i++) {
      if (
        this.props.predefinedPlaces[i].locale_names.default ===
        rowData.locale_names.default
      ) {
        return this.props.predefinedPlaces[i];
      }
    }

    return rowData;
  };

  _filterResultsByTypes = (responseJSON, types) => {
    if (types.length === 0) return responseJSON.results;

    var results = [];
    for (let i = 0; i < responseJSON.results.length; i++) {
      let found = false;

      for (let j = 0; j < types.length; j++) {
        if (responseJSON.results[i].types.indexOf(types[j]) !== -1) {
          found = true;
          break;
        }
      }

      if (found === true) {
        results.push(responseJSON.results[i]);
      }
    }
    return results;
  };

  _requestNearby = (latitude, longitude) => {
    this._abortRequests();

    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== null &&
      longitude !== null
    ) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);

          this._disableRowLoaders();

          if (typeof responseJSON.results !== "undefined") {
            if (this._isMounted === true) {
              var results = [];
              if (this.props.nearbyPlacesAPI === "GoogleReverseGeocoding") {
                results = this._filterResultsByTypes(
                  responseJSON,
                  this.props.filterReverseGeocodingByTypes
                );
              } else {
                results = responseJSON.results;
              }

              this.setState({
                dataSource: this.buildRowsFromResults(results),
              });
            }
          }
          if (typeof responseJSON.error_message !== "undefined") {
            console.warn(
              "google places autocomplete: " + responseJSON.error_message
            );
          }
        } else {
          // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
      };

      let url = "";
      if (this.props.nearbyPlacesAPI === "GoogleReverseGeocoding") {
        // your key must be allowed to use Google Maps Geocoding API
        url =
          "https://maps.googleapis.com/maps/api/geocode/json?" +
          Qs.stringify({
            latlng: latitude + "," + longitude,
            key: this.props.query.key,
            ...this.props.GoogleReverseGeocodingQuery,
          });
      } else {
        url =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
          Qs.stringify({
            location: latitude + "," + longitude,
            key: this.props.query.key,
            ...this.props.GooglePlacesSearchQuery,
          });
      }

      request.open("GET", url);
      if (this.props.query.origin !== null) {
        request.setRequestHeader("Referer", this.props.query.origin);
      }

      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.buildRowsFromResults([]),
      });
    }
  };

  _request = (text) => {
    this._abortRequests();
    if (text.length >= this.props.minLength) {
      const request = new XMLHttpRequest();
      this._requests.push(request);
      request.timeout = this.props.timeout;
      request.ontimeout = this.props.onTimeout;
      request.onreadystatechange = () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const responseJSON = JSON.parse(request.responseText);
          if (typeof responseJSON.features !== "undefined") {
            if (this._isMounted === true) {
              this._results = responseJSON.features;
              this.setState({
                dataSource: this.buildRowsFromResults(responseJSON.features),
              });
            }
          }
          if (typeof responseJSON.error_message !== "undefined") {
            console.warn(
              "google places autocomplete: " + responseJSON.error_message
            );
          }
        } else {
          //console.warn("mapBox places autocomplete: request could not be completed or has been aborted");
        }
      };
      let url = "";
      url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        text.split(" ").join("+") +
        ".json" +
        "?" +
        Qs.stringify({
          limit: 5,
          access_token: this.props.accessToken,
          bbox: this.props.bbox,
        }) +
        "&language=sq";
      request.open("GET", url);
      request.send();
    } else {
      this._results = [];
      this.setState({
        dataSource: this.buildRowsFromResults([]),
      });
    }
  };

  _onChangeText = (text) => {
    this._request(text);

    this.setState({
      text: text,
      listViewDisplayed: true,
    });
  };

  _handleChangeText = (text) => {
    this._onChangeText(text);

    const onChangeText =
      this.props &&
      this.props.textInputProps &&
      this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  };

  _getRowLoader() {
    return <ActivityIndicator animating={true} size="small" />;
  }

  _renderRowData = (rowData) => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData);
    }
    let firstRowLine = rowData?.text;
    if (rowData?.address) {
      firstRowLine = `${rowData?.address} ${rowData?.text}`;
    }
    // const secondRowLine = rowData?.context ? `${rowData?.context[0]?.text}, ${rowData?.context[1]?.text}, ${rowData?.context[2]?.text}` : '';
    const secondRowLine = rowData?.place_name;
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={[
            defaultStyles.administrative,
            this.props.styles.RowFirstLine,
            rowData.isPredefinedPlace
              ? this.props.styles.predefinedPlacesDescription
              : {},
          ]}
          numberOfLines={1}
        >
          {this._renderDescription(firstRowLine)}
        </Text>

        <Text
          style={[
            defaultStyles.administrative,
            this.props.styles.RowSecondLine,
            rowData.isPredefinedPlace
              ? this.props.styles.predefinedPlacesDescription
              : {},
          ]}
          numberOfLines={1}
        >
          {secondRowLine ? this._renderDescription(secondRowLine) : ""}
        </Text>
      </View>
    );
  };

  _renderDescription = (rowData) => {
    if (this.props.renderDescription) {
      return this.props.renderDescription(rowData);
    }
    return rowData;
  };

  _renderLoader = (rowData) => {
    if (rowData.isLoading === true) {
      return (
        <View style={[defaultStyles.loader, this.props.styles.loader]}>
          {this._getRowLoader()}
        </View>
      );
    }

    return null;
  };

  _renderRow = (rowData = {}, sectionID, rowID) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          style={{ width: WINDOW.width }}
          onPress={() => this._onPress(rowData)}
          underlayColor={this.props.listUnderlayColor || "#c8c7cc"}
        >
          <View
            style={[
              defaultStyles.row,
              this.props.styles.row,
              rowData?.isPredefinedPlace
                ? this.props.styles.specialItemRow
                : {},
            ]}
          >
            {this._renderRowData(rowData)}
            {this._renderLoader(rowData)}
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.dataSource.length - 1) {
      return null;
    }

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={[defaultStyles.separator, this.props.styles.separator]}
      />
    );
  };

  _onBlur = () => {
    this.triggerBlur();

    this.setState({
      listViewDisplayed: false,
    });
  };

  _onFocus = () => this.setState({ listViewDisplayed: true });

  _renderLeftButton = () => {
    if (this.props.renderLeftButton) {
      return this.props.renderLeftButton();
    }
  };

  _renderRightButton = () => {
    if (this.props.renderRightButton) {
      return this.props.renderRightButton();
    }
  };

  _getFlatList = () => {
    const keyGenerator = () => Math.random().toString(36).substr(2, 10);

    if (
      (this.state.text !== "" ||
        this.props.predefinedPlaces.length ||
        this.props.currentLocation === true) &&
      this.state.listViewDisplayed === true
    ) {
      return (
        //I added code here
        <ScrollView horizontal={true} scrollEnabled={false}>
          <FlatList
            style={[defaultStyles.listView, this.props.styles.listView]}
            data={this.state.dataSource}
            keyExtractor={keyGenerator}
            extraData={[this.state.dataSource, this.props]}
            ItemSeparatorComponent={this._renderSeparator}
            renderItem={({ item }) => this._renderRow(item)}
            {...this.props}
          />
        </ScrollView>
      );
    }

    return null;
  };

  render() {
    let { onFocus, ...userProps } = this.props.textInputProps;
    return (
      <View style={[defaultStyles.container, this.props.styles.container]}>
        {!this.props.textInputHide && (
          <View
            style={[
              defaultStyles.textInputContainer,
              this.props.styles.textInputContainer,
            ]}
          >
            {this._renderLeftButton()}
            <TextInput
              {...userProps}
              ref="textInput"
              returnKeyType={this.props.returnKeyType}
              autoFocus={this.props.autoFocus}
              style={[defaultStyles.textInput, this.props.styles.textInput]}
              value={this.state.text}
              placeholder={this.props.placeholder}
              autoCorrect={false}
              placeholderTextColor={this.props.placeholderTextColor}
              onFocus={
                onFocus
                  ? () => {
                      this._onFocus();
                      onFocus();
                    }
                  : this._onFocus
              }
              clearButtonMode="while-editing"
              underlineColorAndroid={this.props.underlineColorAndroid}
              onChangeText={this._handleChangeText}
            />
            {this._renderRightButton()}
          </View>
        )}
        {this._getFlatList()}
        {this.props.children}
      </View>
    );
  }
}

MapBoxAutoComplete.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
  returnKeyType: PropTypes.string,
  onPress: PropTypes.func,
  onNotFound: PropTypes.func,
  onFail: PropTypes.func,
  minLength: PropTypes.number,
  fetchDetails: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoFillOnNotFound: PropTypes.bool,
  getDefaultValue: PropTypes.func,
  timeout: PropTypes.number,
  onTimeout: PropTypes.func,
  query: PropTypes.object,
  GoogleReverseGeocodingQuery: PropTypes.object,
  GooglePlacesSearchQuery: PropTypes.object,
  styles: PropTypes.object,
  textInputProps: PropTypes.object,
  enablePoweredByContainer: PropTypes.bool,
  predefinedPlaces: PropTypes.array,
  currentLocation: PropTypes.bool,
  currentLocationLabel: PropTypes.string,
  nearbyPlacesAPI: PropTypes.string,
  enableHighAccuracyLocation: PropTypes.bool,
  filterReverseGeocodingByTypes: PropTypes.array,
  predefinedPlacesAlwaysVisible: PropTypes.bool,
  enableEmptySections: PropTypes.bool,
  renderDescription: PropTypes.func,
  renderRow: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  listUnderlayColor: PropTypes.string,
  debounce: PropTypes.number,
  isRowScrollable: PropTypes.bool,
  text: PropTypes.string,
  textInputHide: PropTypes.bool,
  accessToken: PropTypes.string,
  bbox: PropTypes.array,
};
MapBoxAutoComplete.defaultProps = {
  placeholder: "Search",
  placeholderTextColor: "#A8A8A8",
  isRowScrollable: true,
  underlineColorAndroid: "transparent",
  returnKeyType: "default",
  onPress: () => {},
  onNotFound: () => {},
  onFail: () => {},
  minLength: 0,
  fetchDetails: false,
  autoFocus: false,
  autoFillOnNotFound: false,
  keyboardShouldPersistTaps: "always",
  getDefaultValue: () => "",
  timeout: 20000,
  onTimeout: () => console.warn("google places autocomplete: request timeout"),
  query: {
    key: "missing api key",
    language: "en",
    types: "geocode",
  },
  GoogleReverseGeocodingQuery: {},
  GooglePlacesSearchQuery: {
    rankby: "distance",
    types: "food",
  },
  styles: {},
  textInputProps: {},
  enablePoweredByContainer: true,
  predefinedPlaces: [],
  currentLocation: false,
  currentLocationLabel: "Current location",
  nearbyPlacesAPI: "GooglePlacesSearch",
  enableHighAccuracyLocation: true,
  filterReverseGeocodingByTypes: [],
  predefinedPlacesAlwaysVisible: false,
  enableEmptySections: true,
  listViewDisplayed: "auto",
  debounce: 0,
  textInputHide: false,
  bbox: [19.3044861183, 39.624997667, 21.0200403175, 42.6882473822],
};

// this function is still present in the library to be retrocompatible with version < 1.1.0
const create = function create(options = {}) {
  return React.createClass({
    render() {
      return <MapBoxAutoComplete ref="MapBoxAutoComplete" {...options} />;
    },
  });
};

const debounce = (func, ms) => {
  let timeoutId = 0;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, ms, ...args);
  };
};

export { MapBoxAutoComplete };
