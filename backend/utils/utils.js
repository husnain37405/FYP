// // image uploading imports
// import path from 'path';
// import fs from 'fs';
// import fetch from 'node-fetch';
// const __dirname = path.resolve();

// export const imageUploading = async ({ image, folder }) => {
//     let imageData;
//     let fileName;
//     let uri = `http://localhost:5000/static/uploads/${folder}/`;

//     if (typeof image === 'string' && image.startsWith('http')) {
//         // Fetch image from URL
//         const response = await fetch(image);
//         const buffer = await response.buffer();
//         imageData = buffer.toString('base64');
//         fileName = `${Date.now()}.png`;
//     } else if (typeof image === 'string') {
//         const base64ToArray = image.split(';base64,');
//         imageData = base64ToArray[1];
//         const prefix = base64ToArray[0];
//         const extension = prefix.replace(/^data:image\//, '');
//         fileName = `${Date.now()}.${extension}`;
//     } else {
//         throw new Error('Invalid image format');
//     }

//     const imagePath = path.join(__dirname, `./public/uploads/${folder}`, fileName);
//     const filePath = path.resolve(imagePath);
//     fs.writeFileSync(filePath, imageData, { encoding: 'base64' });

//     // Full URL to the uploaded image
//     const fullUrl = ` ${uri}${fileName}`;

//     return fullUrl;
// };
////////////////////////////////////////

// import path from 'path';
// import fs from 'fs';
// import fetch from 'node-fetch';
// const __dirname = path.resolve();

// export const imageUploading = async ({ image, folder }) => {
//   try {
//     let imageData;
//     let fileName;
//     let uri = `http://localhost:5000/static/uploads/${folder}/`;

//     // Check if image is a URL
//     if (typeof image === 'string' && image.startsWith('http')) {
//       // Fetch image from URL
//       const response = await fetch(image);
//       if (!response.ok) {
//         throw new Error('Failed to fetch the image');
//       }
//       const buffer = await response.buffer();
//       imageData = buffer.toString('base64');
//       fileName = `${Date.now()}.png`;
//     } else if (typeof image === 'string') {
//       // Handle base64-encoded image
//       const base64ToArray = image.split(';base64,');
//       if (base64ToArray.length < 2) {
//         throw new Error('Invalid base64 image format');
//       }
//       imageData = base64ToArray[1];
//       const prefix = base64ToArray[0];
//       const extension = prefix.replace(/^data:image\//, '');
//       fileName = `${Date.now()}.${extension}`;
//     } else {
//       throw new Error('Invalid image format');
//     }

//     // Ensure the upload directory exists
//     const uploadPath = path.join(__dirname, `./public/uploads/${folder}`);
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     const imagePath = path.join(uploadPath, fileName);
//     const filePath = path.resolve(imagePath);

//     // Write the file
//     fs.writeFileSync(filePath, imageData, { encoding: 'base64' });

//     // Return the full URL to the uploaded image
//     const fullUrl = `${uri}${fileName}`;
//     return fullUrl;
//   } catch (error) {
//     console.error('Error uploading image:', error.message);
//     throw error;  // Re-throw to be handled by the calling function
//   }
// };

import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
const __dirname = path.resolve();

export const imageUploading = async ({ image, folder }) => {
  try {
    let imageData;
    let fileName;
    let uri = `http://localhost:5000/static/uploads/${folder}/`;

    // Check if image is a URL
    if (typeof image === 'string' && image.startsWith('http')) {
      // Fetch image from URL
      const response = await fetch(image);
      if (!response.ok) {
        throw new Error('Failed to fetch the image');
      }
      const buffer = await response.buffer();
      imageData = buffer.toString('base64');
      fileName = `${Date.now()}.png`;  // Default extension as PNG
    } else if (typeof image === 'string') {
      // Handle base64-encoded image
      const base64ToArray = image.split(';base64,');
      if (base64ToArray.length < 2) {
        throw new Error('Invalid base64 image format');
      }
      imageData = base64ToArray[1];
      const prefix = base64ToArray[0];
      const extensionMatch = prefix.match(/image\/(\w+)/);
      if (!extensionMatch) {
        throw new Error('Unsupported image format');
      }
      const extension = extensionMatch[1];  // Extract the image extension
      fileName = `${Date.now()}.${extension}`;
    } else {
      throw new Error('Invalid image format');
    }

    // Ensure the upload directory exists
    const uploadPath = path.join(__dirname, `./public/uploads/${folder}`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const imagePath = path.join(uploadPath, fileName);
    const filePath = path.resolve(imagePath);

    // Write the file
    fs.writeFileSync(filePath, imageData, { encoding: 'base64' });

    // Return the full URL to the uploaded image
    const fullUrl = `${uri}${fileName}`;
    return fullUrl;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;  // Re-throw to be handled by the calling function
  }
};
