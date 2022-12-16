import imageCompression from 'browser-image-compression';

interface CompressionOption {
  maxSizeMB: number;
  maxWidthOrHeight: number;
}

const compressionOption: CompressionOption = {
  maxSizeMB: 3,
  maxWidthOrHeight: 1920,
};

const imageResize = async (image: File) => {
  try {
    const compressedImage = await imageCompression(image, compressionOption);
    return compressedImage;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Image compression failed');
    }
  }
};

export default imageResize;
