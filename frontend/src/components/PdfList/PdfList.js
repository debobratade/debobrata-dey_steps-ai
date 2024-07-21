import React, { useEffect, useState } from 'react';
import './PdfList.css'
const PDFList = () => {
    const [pdfList, setPdfList] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const storedData = JSON.parse(localStorage.getItem('data'));
            setData(storedData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchPDFs = async () => {
            if (data && data.id) {
                try {
                    const response = await fetch(`http://localhost:5000/getpdf?id=${data.id}`);
                    const result = await response.json();
                    if (Array.isArray(result)) {
                        const pdfsWithFileName = result.map(pdf => ({
                            ...pdf,
                            fileName: pdf.filepath.split('-').pop() // Extract the file name
                        }));
                        setPdfList(pdfsWithFileName);
                    } else {
                        console.error('Expected an array, but got:', result);
                    }
                } catch (error) {
                    console.error('Error fetching PDFs:', error);
                }
            }
        };

        fetchPDFs();
    }, [data]);

    const handleViewPDF = async (filePath) => {
        try {
            const response = await fetch(`http://localhost:5000/viewpdf?filepath=${encodeURIComponent(filePath)}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            } else {
                console.error('Error fetching PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };


    const handleDeletePDF = async (fileId) => {
        try {
            const response = await fetch(`http://localhost:5000/deletepdf?id=${fileId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                setPdfList(prevList => prevList.filter(pdf => pdf.pdfid !== fileId));
            } else {
                console.error('Deletion failed:', result.error);
            }
        } catch (error) {
            console.error('Error deleting PDF:', error);
        }
    };


    return (
        <div className='mainwrapper'>
            <div className='pdf-list'>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>File Name</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pdfList.map((pdf, index) => (
                                <tr key={pdf.doctorid}>
                                    <td>{index + 1}</td>
                                    <td>{pdf.fileName}</td>
                                    <td>
                                        <button className='view' onClick={() => handleViewPDF(pdf.filepath)}>View</button>
                                    </td>
                                    <td>
                                        <button className='delete' onClick={() => handleDeletePDF(pdf.pdfid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      );
    };
    

export default PDFList;
