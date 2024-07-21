const fs = require('fs');
const path = require('path');
const { PDF } = require('../models/pdf');

const uploadpdf = async (req, res) => {
    try {
        const { id } = req.body;
        const timestamp = new Date().toISOString();

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Define the new directory based on the user ID
        const newDir = `uploads/${id}`;

        // Create directory if it does not exist
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        // Define the new file path
        const newPath = path.join(newDir, req.file.filename);

        // Move the file to the new directory
        fs.renameSync(req.file.path, newPath);

        const saveData = await PDF.create({ doctorid: id, filepath: newPath, uploaddate: timestamp });
        res.json({
            message: 'File uploaded successfully',
            file: req.file,
            userId: id,
            filePath: newPath,
            timestamp
        });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { uploadpdf };
