import { useTheme } from "@/hooks";
import React from "react";
import { View, Text } from "react-native";
import moment from "moment";

const OfferBanner = ({ offer }) => {
  const { Common } = useTheme();
  const styles = Common.offerBanner;
  let endDate = moment(new Date(offer.endDate)).format("YYYY-MM-DD");
  let todayDate = moment(new Date()).format("YYYY-MM-DD");
  if (offer?.hasPeriod !== false) {
    if (moment(endDate).isSameOrAfter(todayDate)) {
      let currentDate = moment(new Date());
      endDate = moment(endDate).endOf("day");
      let diffCommentDate =
        endDate && moment(endDate).diff(moment(currentDate), "days");
      let time = "";
      if (diffCommentDate >= 1) {
        if (diffCommentDate >= 7) {
          time = `${(diffCommentDate / 7).toFixed()} javë`;
        } else if (diffCommentDate >= 1 && diffCommentDate < 7) {
          time = `${Math.abs(diffCommentDate.toFixed())} ditë`;
        }
      } else {
        diffCommentDate =
          endDate && moment(endDate).diff(moment(currentDate), "hours");
        if (diffCommentDate >= 1) {
          time = `${Math.abs(diffCommentDate.toFixed())} orë`;
        } else {
          diffCommentDate =
            endDate && moment(endDate).diff(moment(currentDate), "minutes");
          if (diffCommentDate >= 1) {
            time = `${Math.abs(diffCommentDate.toFixed())} minuta`;
          } else {
            diffCommentDate =
              endDate && moment(endDate).diff(moment(currentDate), "seconds");
            time = `${Math.abs(diffCommentDate.toFixed())} sekonda`;
          }
        }
      }
      if (time) {
        offer.endDateFormat = time;
      }
    }
  } else {
    offer["endDateFormat"] = "Pa kohë të caktuar";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{offer.description}</Text>
      <Text style={styles.time}>{offer.endDateFormat}</Text>
    </View>
  );
};

export default OfferBanner;
