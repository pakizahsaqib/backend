module.exports = (res, result) => {
  try {
    console.log("======>: ", res, result);
    if (result.error) {
      throw result.error;
    }
    return res.send({
      status: 200,
      message: "Operation Successful",
      data: result.data,
      error: {},
    });
  } catch (error) {
    return res.send({
      status: 400,
      data: {},
      error: error,
    });
  }
};
