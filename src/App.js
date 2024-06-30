import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const pdfRef = useRef();
  const handleClick = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('generated.pdf');
  };
  return (
    <>
    <div ref={pdfRef} style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
    <h1>Hello, this is an HTML template!</h1>
    <p>You can include any HTML content here, including <strong>bold text</strong>, <em>italic text</em>, and even images.</p>
    <p>This content will be converted to a PDF.</p>
  </div>
    <button className="click me" onClick={handleClick} >SAVE PDF</button>
    </>
  );
}

export default App;
