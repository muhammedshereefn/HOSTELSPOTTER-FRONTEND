import axios from "axios";

// const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_USER = import.meta.env.VITE_CLOUDINARY_USER;



export const uploadImages = async (imagesFiles) => {
    console.log(imagesFiles);
    const imageUrls = [];

    for (const imageFile of imagesFiles) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_USER}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
            const imageUrl = res.data.url;
            imageUrls.push(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
    return imageUrls;
};
