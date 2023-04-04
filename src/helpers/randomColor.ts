import colors from "../components/Common/ListItem/listColors";

// Function to return different background colors for list
export const getColor = (index: number) => {
  var colorIndex: any = 0;
  // Storing color length
  var colorLength = colors.length;
  // Getting the color length
  colorIndex = (index + 1) % colorLength;
  // Returning the color
  return colors[colorIndex];
};
