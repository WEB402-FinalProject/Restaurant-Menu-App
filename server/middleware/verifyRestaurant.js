function verifyRestaurantOwnership(req, res, next) {
  const resourceRestaurantId = req.headers['x-restaurant-id'] || req.body.restaurantId || req.params.restaurantId;

  if (!resourceRestaurantId) {
    return res.status(400).json({ error: "Restaurant ID is required" });
  }

  req.restaurantId = resourceRestaurantId;

  next();
}

module.exports = verifyRestaurantOwnership;
