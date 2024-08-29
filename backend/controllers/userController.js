import { Bill } from "../models/billSchema.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();

    if (role === "tenant") {
      const bill = new Bill({
        amount: 500,
        dueDate: new Date(),
        status: "pending",
        userId: user._id,
        billType: "security",
      });

      await bill.save();

      user.bills.push(bill._id);
      await user.save();

      return res.status(201).json({
        status: "Success",
        message: "Successfully created user and bill",
        data: user,
        bill,
      });
    }

    return res.status(201).json({
      status: "Success",
      message: "Successfully created user",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "Error while creating user",
    });
  }
};

export const allUser = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to view this.",
      });
    }

    const users = await User.find();

    const usersWithBills = await Promise.all(
      users.map(async (user) => {
        const bills = await Bill.find({ userId: user._id }).select(
          "billType status"
        );
        return {
          ...user.toObject(),
          bills,
        };
      })
    );

    if (usersWithBills.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "No users found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully fetched users with bills",
      data: usersWithBills,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Error while fetching users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      status: "Forbidden",
      message: "You do not have permission to view this",
    });
  }
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully fetched user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Error while fetching user",
      error: error.message,
    });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to view this",
      });
    }

    const allBills = await Bill.find().populate("userId", "name");

    if (allBills.length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Successfully fetched all bills",
        data: allBills,
      });
    } else {
      res.status(404).json({ status: "Not Found", message: "No bills found" });
    }
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const getCurrentUserBills = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("bills");
    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Bills Fetched successfully",
      data: user.bills,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUserBill = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 
    const userId = req.user.id; 

    console.log(req.user)

    if (!["paid", "pending"].includes(status)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid status value.",
      });
    }

    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(404).json({
        status: "Error",
        message: "Bill not found.",
      });
    }

    if (bill.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to update this bill.",
      });
    }

    bill.status = status;
    await bill.save();

    return res.status(200).json({
      status: "Success",
      message: "Bill status updated successfully.",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Server Error",
      error: error.message,
    });
  }
};


export const updateUser = async (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.status(403).json({
      status: "Forbidden",
      message: "You do not have permission to view this",
    });
  }

  try {
    const { id } = req.params;
    const { role: newRole, status: newStatus } = req.body;

    if (newRole && !["admin", "tenant"].includes(newRole)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid role value.",
      });
    }
    if (newStatus && !["active", "vecated"].includes(newStatus)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid status value.",
      });
    }

    const user = await User.findById(id).populate("bills");

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found.",
      });
    }

    if (newStatus === "vecated") {
      const unpaidBills = user.bills.filter((bill) => bill.status !== "paid");

      if (unpaidBills.length > 0) {
        return res.status(400).json({
          status: "Error",
          message: "Cannot vacate user. All bills must be paid.",
        });
      }

      await Bill.deleteMany({ userId: user._id });
      user.bills = [];
    }

    if (newRole) {
      user.role = newRole;
    }

    if (newStatus) {
      user.status = newStatus;
    }

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Successfully updated user role and/or status",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Server Error" });
  }
};
