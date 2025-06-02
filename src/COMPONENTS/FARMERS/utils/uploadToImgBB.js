const uploadToImgBB = async (imageFile, apiKey) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;
};

export default uploadToImgBB;
