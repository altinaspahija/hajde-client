import React from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
} from "react-native";

const ModalComponent = ({
  children,
  visible,
  dismiss,
  transparent = true,
  animationType = "none",
}) => {
  return (
    <View>
      <Modal
        visible={visible}
        transparent={transparent}
        onRequestClose={dismiss}
        animationType={animationType}
      >
        <TouchableWithoutFeedback onPress={dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={dismiss}>
          <View style={styles.modalContent}>{children}</View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    margin: "15%",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});

export default ModalComponent;
