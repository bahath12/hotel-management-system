

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
  
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select a valid image file."));
      return;
    }

   
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      reject(new Error("Image must be smaller than 2MB."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });
}