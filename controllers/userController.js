exports.getAllUsers = (req, res) => {
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route is not yet implemented.',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route is not yet implemented.',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route is not yet implemented.',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This route is not yet implemented.',
  });
};
