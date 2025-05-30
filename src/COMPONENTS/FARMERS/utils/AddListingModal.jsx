import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AddListingModal = ({ onClose, onListingAdded }) => {
  const [product, setProduct] = useState("Cabbage");
  const [quantityUnit, setQuantityUnit] = useState("per Bag");
  const [price, setPrice] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("Large");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddListing = async () => {
    if (!price || !availableDate) return;

    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const storage = getStorage();

      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(
          storage,
          `listing_images/${user.uid}/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newListing = {
        userId: user.uid,
        product,
        quantityUnit,
        price: parseFloat(price.replace(/,/g, "")),
        availableDate,
        description,
        tier,
        imageUrl,
        createdAt: serverTimestamp(),
        status: "In Stock",
      };

      const docRef = await addDoc(
        collection(db, "farmers_listings"),
        newListing
      );

      onListingAdded({ ...newListing, id: docRef.id });
      onClose();
    } catch (error) {
      console.error("Error adding listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-backdrop'>
      <div className='modal-card'>
        <h2>Add New Produce</h2>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option>Cabbage</option>
          <option>Tomato</option>
          <option>Potato</option>
        </select>
        <select
          value={quantityUnit}
          onChange={(e) => setQuantityUnit(e.target.value)}
        >
          <option>per Bag</option>
          <option>per Kg</option>
        </select>
        <input
          type='text'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type='date'
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={tier} onChange={(e) => setTier(e.target.value)}>
          <option>Large</option>
          <option>Medium</option>
          <option>Small</option>
        </select>
        <input type='file' onChange={(e) => setImageFile(e.target.files[0])} />

        <div className='mt-4 flex justify-between'>
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            onClick={handleAddListing}
            disabled={loading || !price || !availableDate}
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListingModal;
