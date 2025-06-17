import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";
import toast, { Toaster } from "react-hot-toast";

const BuyersProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    photoURL: "",
  });

  const [editState, setEditState] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const imgbbApiKey = "337c1b7d614d9e354d1aaaf93793d4a8";

  const getInitialsAvatar = () => {
    const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(
      0
    )}`;
    return `https://ui-avatars.com/api/?name=${initials}&background=3D8236&color=fff&size=400&rounded=true`;
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const photoURL = data.photoURL || user.photoURL || "";
          const fullName = data.name || user.displayName || "";
          const [firstName, ...rest] = fullName.split(" ");
          const lastName = rest.join(" ");

          const userInfo = {
            firstName: data.firstName || firstName || "",
            lastName: data.lastName || lastName || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            photoURL: photoURL,
          };

          setFormData(userInfo);
          setPreviewImage(photoURL || getInitialsAvatar());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error loading profile data");
      }
    };

    fetchUserData();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  const handleEditToggle = (field) => {
    setEditState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setHasChanges(true);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setShowCamera(true);
    } catch (err) {
      toast.error("Camera access failed. Please check permissions.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const uploadToImgBB = async (blob, retries = 2) => {
    if (!navigator.onLine) {
      throw new Error("No internet connection");
    }

    const formData = new FormData();
    formData.append("image", blob);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading to imgBB:", error);

      if (retries > 0) {
        toast.warning(`Upload failed. Retrying (${retries} attempts left)...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return uploadToImgBB(blob, retries - 1);
      }

      throw new Error(
        error.name === "AbortError"
          ? "Upload timed out. Please try again."
          : "Failed to upload image. Please check your connection."
      );
    }
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            toast.error("Failed to capture photo");
            return;
          }

          setIsUploading(true);

          try {
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);

            const imgBBUrl = await uploadToImgBB(blob);
            setFormData((prev) => ({ ...prev, photoURL: imgBBUrl }));
            setHasChanges(true);
            toast.success("Profile photo updated!");
          } catch (error) {
            console.error("Photo upload failed:", error);
            toast.error(error.message);
          } finally {
            setIsUploading(false);
            stopCamera();
          }
        },
        "image/jpeg",
        0.85
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);

      const imgBBUrl = await uploadToImgBB(file);

      setFormData((prev) => ({ ...prev, photoURL: imgBBUrl }));
      setHasChanges(true);
      toast.success("Profile photo updated!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      setShowImageOptions(false);
    }
  };

  const handleSaveClick = async () => {
    if (!hasChanges) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to save changes");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        photoURL: formData.photoURL || "",
      });

      // Update auth profile if photoURL changed
      if (user.photoURL !== formData.photoURL) {
        await updateProfile(user, {
          photoURL: formData.photoURL,
        });
      }

      toast.success("Profile updated successfully!");
      setHasChanges(false);
      setEditState({});
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const renderField = (label, name, type = "text") => (
    <div className='mb-4'>
      <div className='flex justify-between items-center mb-1'>
        <label htmlFor={name} className='text-gray-700 font-medium'>
          {label}
        </label>
        <button
          onClick={() => handleEditToggle(name)}
          className='text-primary flex items-center gap-1 hover:text-primary-dark'
        >
          <Icon icon='material-symbols:edit-outline' />
          {editState[name] ? "Done" : "Edit"}
        </button>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        disabled={!editState[name]}
        className={`w-full px-4 py-3 rounded-lg border ${
          editState[name] ? "border-primary" : "border-gray-300"
        } focus:ring focus:ring-primary outline-none transition-all`}
      />
    </div>
  );

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 relative'>
      <Toaster position='top-right' />

      {isUploading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white p-6 rounded-lg max-w-sm w-full text-center'>
            <div className='h-8 w-8 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='font-medium'>Uploading Image</p>
            <p className='text-sm text-gray-500 mt-1'>Please wait...</p>
          </div>
        </div>
      )}

      <div className='bg-white rounded-xl shadow-md'>
        <div className='md:flex'>
          {/* Profile Photo Section */}
          <div className='md:w-1/3 p-6 bg-gray-50 flex flex-col items-center'>
            <div className='relative mb-4'>
              <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg'>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = getInitialsAvatar();
                    }}
                  />
                ) : (
                  <img
                    src={getInitialsAvatar()}
                    alt='Initials'
                    className='w-full h-full object-cover'
                  />
                )}
              </div>
            </div>

            <div className='relative'>
              <button
                onClick={() => setShowImageOptions(!showImageOptions)}
                disabled={isUploading}
                className={`${
                  isUploading
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
              >
                <Icon icon='ic:baseline-cloud-upload' />
                {formData.photoURL ? "Change Photo" : "Upload Photo"}
              </button>

              {showImageOptions && (
                <div className='absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200'>
                  <button
                    onClick={() => {
                      fileInputRef.current.click();
                      setShowImageOptions(false);
                    }}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center'
                  >
                    <Icon icon='ic:baseline-insert-photo' className='mr-2' />
                    Choose from device
                  </button>
                  <button
                    onClick={() => {
                      startCamera();
                      setShowImageOptions(false);
                    }}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center'
                  >
                    <Icon icon='mdi:camera' className='mr-2' />
                    Take photo
                  </button>
                </div>
              )}
            </div>

            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
              ref={fileInputRef}
              disabled={isUploading}
            />

            <div className='mt-4 text-center'>
              <h3 className='text-xl font-semibold text-gray-800'>
                {formData.firstName} {formData.lastName}
              </h3>
              <p className='text-gray-600'>{formData.email}</p>
            </div>
          </div>

          {/* Profile Info Form */}
          <div className='md:w-2/3 p-8'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
              Profile Information
            </h2>

            <div className='grid md:grid-cols-2 gap-6'>
              {renderField("First Name", "firstName")}
              {renderField("Last Name", "lastName")}
            </div>

            {renderField("Email Address", "email", "email")}
            {renderField("Phone Number", "phone", "tel")}
            {renderField("Address", "address")}

            <div className='mt-8 text-right'>
              <button
                onClick={handleSaveClick}
                disabled={!hasChanges || isUploading}
                className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                  hasChanges && !isUploading
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isUploading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
          <div className='bg-white p-6 rounded-lg max-w-md w-full'>
            <h3 className='text-xl font-bold mb-4'>Take a Photo</h3>
            <div className='relative'>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className='w-full mb-4 rounded border border-gray-200'
              />
              <div className='absolute inset-0 border-4 border-white rounded pointer-events-none'></div>
            </div>
            <canvas ref={canvasRef} className='hidden' />
            <div className='flex justify-center gap-4'>
              <button
                onClick={capturePhoto}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center'
              >
                <Icon icon='mdi:camera' className='mr-2' />
                Capture
              </button>
              <button
                onClick={stopCamera}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyersProfile;
