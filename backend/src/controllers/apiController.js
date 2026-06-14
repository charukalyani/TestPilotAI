const axios = require("axios");

exports.testApi = async (req, res) => {
  try {
    const { method, url, headers, body } = req.body;

    const start = Date.now();

    const response = await axios({
      method,
      url,
      headers,
      data: body,
    });

    const end = Date.now();

    res.json({
      status: response.status,
      time: `${end - start}ms`,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error:
        error.response?.data ||
        error.message,
    });
  }
};