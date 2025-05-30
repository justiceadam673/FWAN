const imageMap = {
  Tomatoes: "https://source.unsplash.com/featured/?tomatoes",
  Cabbage: "https://source.unsplash.com/featured/?cabbage",
  "Irish Potatoes": "https://source.unsplash.com/featured/?potato",
  Carrot: "https://source.unsplash.com/featured/?carrot",
  // Add all others as needed
};

const randomImage = (product) =>
  imageMap[product] || "https://source.unsplash.com/random/?vegetable";

export default randomImage;
