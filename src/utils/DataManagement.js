import { jsPDF } from 'jspdf';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };

    img.onerror = reject;
    img.src = url;
  });
};

const addBookToPDF = async (doc, book, y) => {
    const imgHeight = 50;
    const lineHeight = 10;
    const verticalPadding = 5;
  
    if (y + imgHeight + lineHeight > doc.internal.pageSize.height) {
      doc.addPage();
      y = 10; 
    }
  
    doc.text(`${book.title} - ${book.author}`, 10, y);
    y += lineHeight;
  
    if (book.image) {
      const imageData = await loadImage(book.image);
      doc.addImage(imageData, 'PNG', 10, y, imgHeight, imgHeight);
      y += imgHeight + verticalPadding;
    }
  
    return y; 
  };
  
  export const exportDataToPDF = async (books) => {
    const doc = new jsPDF();
    let y = 10;
  
    for (const book of books) {
      y = await addBookToPDF(doc, book, y);
    }
  
    doc.save('books.pdf');
  };
  
