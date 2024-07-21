const path = require('path');
const fs = require('fs');
const { PDF } = require('../models/pdf');

const deletePdf = async (req, res) => {
    try {
        const fileId = req.query.id;

        if (!fileId) {
            return res.status(400).json({ error: 'File ID is required' });
        }

        // Find the PDF record by ID
        const pdfRecord = await PDF.findByPk(fileId);

        if (!pdfRecord) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Split the file path to find the directory structure
        const filePathParts = pdfRecord.filepath.split(path.sep);

        if (filePathParts.length < 2) {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        // Construct the full path to the file
        const uploadsDir = path.resolve(__dirname, '../uploads');
        const userFolder = filePathParts[1]; // e.g., '2'
        const fileName = filePathParts.slice(2).join(path.sep); // e.g., '1721459888203-Full stack take home assessment.pdf'
        const fullPath = path.join(uploadsDir, userFolder, fileName);

        // Delete the file from the file system
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        // Optionally, remove the user folder if it's empty
        const userFolderPath = path.join(uploadsDir, userFolder);
        const files = fs.readdirSync(userFolderPath);
        if (files.length === 0) {
            fs.rmdirSync(userFolderPath);
        }

        // Delete the PDF record from the database
        await pdfRecord.destroy();

        return res.status(200).json({ success: true, message: 'File deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { deletePdf };
