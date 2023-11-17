// middlewares/commonResponse.js
const success = (res, data) => {
    res.status(200).json({
      success: true,
      message: "OK",
      data: data,
      error: null,
    });
  };
  
  module.exports = {
    success,
  };
  