import React from "react";

export const farmData = [
  {
    id: 1,
    name: "Tomatoes",
    author: "Nice Cave",
    rating: 4.6,
    location: "Old airport",
    harvestDate: "10-05-2025",
    availableUntil: "15-05-2025",
    quantity: "76 kg",
    price: "N10,00 per kg",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Tomatoes.jpg",

    farmer: "Ov Yee",
    description:
      "Fresh organic tomatoes, harvested yesterday. These tomatoes are grown without pesticides or chemical fertilizers. They are perfect for salads, sauces, or cooking. Our farm has been certified organic for over 10 years, and we take pride in our sustainable farming practices.",
    reviews: [
      {
        date: "13-05-2025",
        rating: 5,
        comment: "Excellent quality tomatoes, very fresh and flavorful.",
        reviewer: "Grade Scan",
      },
      {
        date: "14-05-2025",
        rating: 4,
        comment: "Good tomatoes, arrived in great condition.",
        reviewer: "Beatrice Dame",
      },
    ],
  },
  {
    id: 2,
    name: "Carrots",
    author: "Green Fields",
    rating: 4.8,
    location: "New farm estate",
    harvestDate: "08-05-2025",
    availableUntil: "18-05-2025",
    quantity: "120 kg",
    price: "N8,50 per kg",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Carrots_of_many_colors.jpg",
    farmer: "Joshua Mike",

    description:
      "Sweet and crunchy organic carrots, rich in beta-carotene. Grown in nutrient-rich soil without synthetic chemicals. Perfect for juicing, snacking, or cooking.",
    reviews: [
      {
        date: "10-05-2025",
        rating: 5,
        comment: "The sweetest carrots I've ever tasted!",
        reviewer: "John Farmer",
      },
    ],
  },
  {
    id: 3,
    name: "Bell Peppers",
    author: "Rainbow Farms",
    rating: 4.4,
    location: "Valley region",
    harvestDate: "12-05-2025",
    availableUntil: "20-05-2025",
    quantity: "65 kg",
    price: "N15,00 per kg",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/da/Red_capsicum_and_cross_section.jpg",
    farmer: "Toyin Dare",

    description:
      "Colorful bell peppers in red, yellow and green. Grown with natural compost and organic pest control methods. High in vitamin C and antioxidants.",
    reviews: [],
  },
  // Add 27 more produce items following the same structure
  // Example items 4-30:
  {
    id: 4,
    name: "Spinach",
    author: "Leafy Greens Co.",
    rating: 4.7,
    location: "River basin",
    harvestDate: "09-05-2025",
    availableUntil: "16-05-2025",
    quantity: "90 kg",
    price: "N12,00 per kg",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Spinach_leaves.jpg",
    farmer: "Alex",

    description:
      "Tender organic spinach leaves, packed with iron and vitamins. Harvested at peak freshness for optimal nutrition and flavor.",
    reviews: [
      {
        date: "11-05-2025",
        rating: 5,
        comment: "Very fresh and lasted longer than supermarket spinach.",
        reviewer: "Health Conscious",
      },
    ],
  },
  {
    id: 5,
    name: "Strawberries",
    author: "Berry Delight",
    rating: 4.9,
    location: "Hillside farm",
    harvestDate: "07-05-2025",
    availableUntil: "14-05-2025",
    quantity: "45 kg",
    price: "N25,00 per kg",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg",
    farmer: "Emmanuel Aderemi",

    description:
      "Juicy, sweet organic strawberries. Grown without synthetic pesticides and hand-picked at perfect ripeness. Perfect for desserts or eating fresh.",
    reviews: [
      {
        date: "09-05-2025",
        rating: 5,
        comment: "Absolutely delicious! Worth every penny.",
        reviewer: "Sweet Tooth",
      },
      {
        date: "10-05-2025",
        rating: 4,
        comment: "Great flavor but some were slightly bruised in delivery.",
        reviewer: "Fruit Lover",
      },
    ],
  },
  // Continue adding more items until you reach 30
];
