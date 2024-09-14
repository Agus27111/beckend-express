

module.exports = (err, req, res, next) => {

    // Tangani error validasi
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message
        });
    }

    // Tangani error lainnya
    res.status(500).json({
        message: 'Internal Server Error'
    });
};
