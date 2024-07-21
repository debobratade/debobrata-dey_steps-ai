const path = require('path');
const fs = require('fs');

const viewpdf = async (req, res) => {
    try {
        const filePath = req.query.filepath;

        if (!filePath) {
            return res.status(400).json({ error: 'File path is required' });
        }

        // Split the file path to get the directory and file name
        const pathParts = filePath.split('\\');
        
        // Ensure the pathParts array has at least two elements
        if (pathParts.length < 2) {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        // Extract the directory and file name
        const directory = pathParts[1]; 
        const fileName = pathParts.slice(2).join('\\'); 

        // Construct the full path
        const fullPath = path.resolve(__dirname, '../uploads', directory, fileName);

        // Check if the file exists
        if (fs.existsSync(fullPath)) {
            res.sendFile(fullPath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { viewpdf };
