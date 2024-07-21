const { PDF } = require("../models/pdf");

const getPdf = async (req, res) => {
  try {
    const userId = req.query.id;
    const pdfs = await PDF.findAll({
      where: { doctorid: userId },
      attributes: ['filepath', 'pdfid'],
    });
    return res.status(200).json(pdfs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getPdf };
