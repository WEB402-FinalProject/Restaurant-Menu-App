const express = require('express');
const requireAuth = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const Order = require('../models/Order');

const router = express.Router();
router.use(requireAuth);

// GET /api/dashboard/:restaurantId
router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterdayStart = new Date(new Date().setDate(new Date().getDate() - 1));
  const yesterdayEnd = new Date(yesterdayStart);
  yesterdayEnd.setHours(23, 59, 59, 999);

  try {
    // Total Orders
    const totalOrders = await Order.countDocuments({ restaurantId: restaurantObjectId });

    // Total Revenue
    const totalRevenueData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "menus",
          localField: "items.itemId",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$items.quantity", "$itemDetails.price"] } }
        }
      }
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    // Orders Today
    const ordersToday = await Order.countDocuments({
      restaurantId: restaurantObjectId,
      createdAt: { $gte: todayStart, $lte: new Date() }
    });

    // Average Order Value
    const averageOrderValueData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "menus",
          localField: "items.itemId",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" },
      {
        $group: {
          _id: "$_id",
          total: { $sum: { $multiply: ["$items.quantity", "$itemDetails.price"] } }
        }
      },
      {
        $group: {
          _id: null,
          avg: { $avg: "$total" }
        }
      }
    ]);
    const averageOrderValue = averageOrderValueData[0]?.avg || 0;

    // Items Sold
    const itemsSoldData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId } },
      { $unwind: "$items" },
      { $group: { _id: null, totalItems: { $sum: "$items.quantity" } } }
    ]);
    const itemsSold = itemsSoldData[0]?.totalItems || 0;

    // Returned Orders
    const returnedOrders = await Order.countDocuments({ restaurantId: restaurantObjectId, status: 'returned' });

    // Pending Orders
    const pendingOrders = await Order.countDocuments({ restaurantId: restaurantObjectId, status: 'pending' });

    // Delivered Orders
    const deliveredOrders = await Order.countDocuments({ restaurantId: restaurantObjectId, status: 'delivered' });

    // Cancelled Orders
    const cancelledOrders = await Order.countDocuments({ restaurantId: restaurantObjectId, status: 'cancelled' });

    // Top Selling Item
    const topItemData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.itemId",
          total: { $sum: "$items.quantity" }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "menus",
          localField: "_id",
          foreignField: "_id",
          as: "item"
        }
      },
      { $unwind: "$item" },
      {
        $project: {
          _id: 0,
          name: "$item.name"
        }
      }
    ]);
    const topItem = topItemData[0]?.name || "N/A";

    // Today vs Yesterday Comparison
    const todayData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId, createdAt: { $gte: todayStart } } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" }, totalItems: { $sum: { $sum: "$items.quantity" } } } }
    ]);
    const todayMetrics = todayData[0] || { totalOrders: 0, totalRevenue: 0, totalItems: 0 };

    const yesterdayData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId, createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" }, totalItems: { $sum: { $sum: "$items.quantity" } } } }
    ]);
    const yesterdayMetrics = yesterdayData[0] || { totalOrders: 0, totalRevenue: 0, totalItems: 0 };

    // Hourly Sales Breakdown (for Today)
    const hourlyData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId, createdAt: { $gte: todayStart } } },
      { $project: { hour: { $hour: "$createdAt" }, totalPrice: 1 } },
      { $group: { _id: "$hour", totalRevenue: { $sum: "$totalPrice" } } },
      { $sort: { _id: 1 } }
    ]);

    // Weekly Sales Trend (Past Week)
    const lastWeekStart = new Date(new Date().setDate(new Date().getDate() - 7));
    const weeklyData = await Order.aggregate([
      { $match: { restaurantId: restaurantObjectId, createdAt: { $gte: lastWeekStart } } },
      { $project: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, totalPrice: 1 } },
      { $group: { _id: "$date", totalRevenue: { $sum: "$totalPrice" } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      metrics: [
        { title: "Total Orders", value: totalOrders },
        { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
        { title: "Orders Today", value: ordersToday },
        { title: "Average Order Value", value: `$${averageOrderValue.toFixed(2)}` },
        { title: "Items Sold", value: itemsSold },
        { title: "Returned Orders", value: returnedOrders }
      ],
      additionalMetrics: [
        { title: "Pending Orders", value: pendingOrders },
        { title: "Delivered Orders", value: deliveredOrders },
        { title: "Cancelled Orders", value: cancelledOrders },
        { title: "Top Selling Item", value: topItem }
      ],
      comparison: {
        totalOrders: { today: todayMetrics.totalOrders, yesterday: yesterdayMetrics.totalOrders },
        totalRevenue: { today: todayMetrics.totalRevenue, yesterday: yesterdayMetrics.totalRevenue },
        totalItemsSold: { today: todayMetrics.totalItems, yesterday: yesterdayMetrics.totalItems }
      },
      hourlySales: hourlyData,
      weeklySales: weeklyData
    });

  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
