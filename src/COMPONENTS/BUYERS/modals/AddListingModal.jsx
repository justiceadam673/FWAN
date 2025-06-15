import React, { useState, useEffect, useCallback } from "react";
import Star from "../../../assets/img/star.png";
import { Icon } from "@iconify/react";
import Logo from "../../../assets/img/fwan.png";
import MakeOffer from "../modals/MakeOffer";
import { db, auth } from "../../../FireBaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const AddListingModal = ({ onClose, onMakeOffer, product }) => {
  const [makeOffer, setMakeOffer] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const reviewsRef = collection(
          db,
          "farmers_listings",
          product.id,
          "reviews"
        );
        const q = query(reviewsRef, where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        setHasReviewed(!querySnapshot.empty);
      }
    });

    return () => unsubscribe();
  }, [product.id]);

  // const fetchReviews = async () => {
  //   const reviewsRef = collection(
  //     db,
  //     "farmers_listings",
  //     product.id,
  //     "reviews"
  //   );
  //   const q = query(reviewsRef, orderBy("timestamp", "desc"));
  //   const querySnapshot = await getDocs(q);
  //   const fetchedReviews = querySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setAllReviews(fetchedReviews);
  // };

  const fetchReviews = useCallback(async () => {
    const reviewsRef = collection(
      db,
      "farmers_listings",
      product.id,
      "reviews"
    );
    const q = query(reviewsRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const fetchedReviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllReviews(fetchedReviews);
  }, [product.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const handleAddReview = async () => {
    if (!user) {
      alert("Please log in to add a review.");
      return;
    }

    if (hasReviewed) {
      alert("You’ve already submitted a review.");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    const newReview = {
      reviewer: user.displayName || user.email?.split("@")[0] || "Anonymous",
      userId: user.uid,
      rating,
      comment,
      date: new Date().toLocaleDateString(),

      timestamp: serverTimestamp(),
    };

    try {
      const reviewRef = collection(
        db,
        "farmers_listings",
        product.id,
        "reviews"
      );
      await addDoc(reviewRef, newReview);

      await fetchReviews();

      setAllReviews((prev) => [
        {
          ...newReview,
          timestamp: new Date(), // For immediate display
        },
        ...prev,
      ]);

      setShowReviewForm(false);
      setHasReviewed(true);
      setRating(0);
      setComment("");
      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong while submitting the review.");
      setSubmitting(false);
    }
  };

  const getStarColor = (starValue) => {
    if (starValue <= 2) return "#FF4B4B"; // red
    if (starValue === 3) return "#FFA500"; // orange
    return "#4CAF50"; // green
  };

  return (
    <main className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <section className='md:w-2/3 w-full h-full md:max-h-[90vh] overflow-y-auto bg-white p-4 md:rounded-xl shadow-xl'>
        <div className='flex justify-between items-end mb-[20px] border-b-2 md:p-[15px] pb-[5px]'>
          <img src={Logo} />
          <button
            className=' md:gap-[20px] hover:md:gap-[5px] transition-all duration-200 hover:cursor-pointer hover:bg-gray-100 p-[5px] md:p-[10px] rounded-[10px] flex text-green-900/70 text-[16px] md:text-[20px] font-bold'
            onClick={onClose}
          >
            <Icon
              icon='ep:back'
              width='28'
              height='28'
              className='text-[#1D8338]'
            />
            Back to listings
          </button>
        </div>

        <section className='xl:flex gap-5'>
          <img
            src={product.image}
            alt={product.name}
            className=' xl:w-3/7 max-h-[450px] object-cover rounded'
          />

          <section className='mt-4 2xl:space-y-[20px]'>
            <div>
              <h2 className='2xl:text-[35px] xl:text-[28px] text-[35px] font-bold'>
                {product.name}
              </h2>
              <p className='flex items-center 2xl:text-[18px] xl:text-[15px] text-[18px] gap-2'>
                {product.farmer}
                <img src={Star} className='w-4 h-4' />
                <span>{product.rating}</span>
              </p>
            </div>

            <div className='md:flex max-sm:space-y-[20px] max-sm:my-[16px] gap-[58px]'>
              <p className='flex gap-2 items-center'>
                <Icon
                  icon='weui:location-outlined'
                  width='34'
                  height='34'
                  className='text-[#1D8338]'
                />
                <span className='max-sm:flex max-sm:gap-[20px]'>
                  <span className='font-semibold'>
                    Location <br />
                  </span>
                  {product.location || "Location not available"}
                </span>
              </p>
              <p className='flex gap-2 items-center'>
                <Icon
                  icon='formkit:date'
                  width='28'
                  height='28'
                  className='text-[#1D8338]'
                />
                <span className='max-sm:flex max-sm:gap-[20px]'>
                  <span className='font-semibold'>
                    Harvest Date <br />
                  </span>
                  {product.harvestDate || "Date not available"}
                </span>
              </p>
              <p className='flex gap-2 items-center'>
                <Icon
                  icon='ph:package-light'
                  width='34'
                  height='34'
                  className='text-[#1D8338]'
                />
                <span className='max-sm:flex max-sm:gap-[20px]'>
                  <span className='font-semibold'>
                    Available Until <br />
                  </span>
                  {product.availableUntil || "Date not available"}
                </span>
              </p>
            </div>

            <div className='flex ml-[10px] gap-21'>
              <p className='flex flex-col gap-2 '>
                <h2 className='font-bold text-[20px]'>Quantity</h2>
                <span className='text-[#1D8338] 2xl:text-[20px]'>
                  {product.quantity}
                </span>
              </p>
              <p className='flex flex-col gap-2 '>
                <h2 className='font-bold text-[20px]'>Price</h2>
                <span className='text-[#1D8338] 2xl:text-[20px]'>
                  {product.price}
                </span>
              </p>
            </div>

            <div className='space-y-[10px]'>
              <h2 className='text-[20px] font-bold'>Description</h2>
              <p className='2xl:text-[18px] text-[14px'>
                {product.description}
              </p>
              <button
                onClick={onMakeOffer}
                className=' w-full max-h-[56px] p-[10px] hover:bg-[#2c7125]  hover:cursor-pointer  bg-[#3D8236] rounded-[12px] text-[#FFFFFF] font-normal text-[14px] lg:text-[20px] flex justify-center items-center'
              >
                Make an Offer
              </button>
            </div>
          </section>
        </section>

        <div className='flex justify-between items-center mt-4'>
          <h2 className='2xl:text-[28px] text-[22px] text-black/80 font-bold'>
            Customer Reviews
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            disabled={hasReviewed}
            className='flex gap-2 2xl:text-[20px] text-[15px] font-normal justify-center items-center border-1 rounded-[8px] px-[10px]'
          >
            <Icon
              icon='material-symbols-light:add-rounded'
              width='28'
              height='28'
              className='transition duration-[.5s] hover:rotate-90 '
            />
            {hasReviewed ? "Review Submitted" : "Add Review"}
          </button>
        </div>

        {showReviewForm && !hasReviewed && (
          <div className='my-4 border rounded-xl p-4 space-y-3'>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={Star}
                  alt={`${star} star`}
                  className='w-6 h-6 cursor-pointer'
                  style={{
                    opacity: star <= rating ? 1 : 0.3,
                    filter: `drop-shadow(0 0 2px ${getStarColor(star)})`,
                  }}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              placeholder='Write your review...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full border rounded p-2'
              rows={3}
            />
            <button
              disabled={submitting}
              onClick={handleAddReview}
              className={`px-4 py-2 ${
                submitting ? "bg-gray-400" : "bg-[#3D8236] hover:bg-[#2c7125]"
              } text-white rounded`}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}

        <div className='mt-4 space-y-4'>
          {allReviews.length > 0 ? (
            allReviews.map((review, index) => (
              <div key={index} className='border rounded-[12px] p-[10px]'>
                <div className='flex justify-between'>
                  <h3 className='text-lg font-semibold'>{review.reviewer}</h3>
                  <div className='flex items-center gap-1'>
                    {[...Array(review.rating)].map((_, i) => (
                      <img
                        key={i}
                        src={Star}
                        alt='star'
                        className='w-4 h-4'
                        style={{
                          filter: `drop-shadow(0 0 2px ${getStarColor(
                            review.rating
                          )})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className='text-sm text-gray-600'>{review.date}</p>
                <p className='mt-1 text-[16px]'>{review.comment}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No reviews yet.</p>
          )}
        </div>

        {makeOffer && (
          <MakeOffer product={product} onOff={() => setMakeOffer(false)} />
        )}
      </section>
    </main>
  );
};

export default AddListingModal;
