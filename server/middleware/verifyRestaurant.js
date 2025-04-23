function verifyRestaurantOwnership(req, res, next) {
    const userRestaurantId = req.user.restaurantId;
    const resourceRestaurantId = req.body.restaurantId || req.params.restaurantId;
  
    if (!resourceRestaurantId) {
      return res.status(400).json({ error: "Restaurant ID is required" });
    }
  
    if (String(userRestaurantId) !== String(resourceRestaurantId)) {
      return res.status(403).json({ error: "Unauthorized access to this restaurant's data" });
    }
  
    next();
  }
  
  module.exports = verifyRestaurantOwnership;
  