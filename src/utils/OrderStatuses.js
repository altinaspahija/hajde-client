const status = [
  { id: 1, label: "Në pritje", value: "PENDING" },
  { id: 2, label: "Në progres", value: "IN_PROGRESS" },
  { id: 3, label: "E kompletuar", value: "COMPLETED" },
  { id: 4, label: "Problem", value: "ISSUE" },
  { id: 5, label: "Anuluar", value: "CANCELLED" },
];
const ConvertStatusToNumber = (statusString) => status.find(o=> o.value === statusString)?.id;
const ConvertStatusToString = (statusNumber) => status.find(o=> o.id === statusNumber)?.value;
const ConvertStatusToObject = (numberOrString) => status.find(o=> o.id === numberOrString || o.value === numberOrString);

export { ConvertStatusToNumber, ConvertStatusToString, ConvertStatusToObject };
