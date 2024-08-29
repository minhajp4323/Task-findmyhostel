import { Bill } from "../models/billSchema.js";
import { joiBillSchema } from "../models/JoiValidateSchema.js";
import { User } from "../models/userModel.js";

export const createBill = async (req, res) => {
  const { value, error } = joiBillSchema.validate(req.body);

  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to create this resource.",
      });
    }

    if (error) {
      return res.status(400).json({
        status: "Error",
        message: "Error while creating bills",
        error: error.details[0].message,
      });
    }

    const bill = await Bill.create({ ...value });

    const user = await User.findById(req.body.userId); 
    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    user.bills.push(bill._id);
    await user.save();

    res.status(201).json({
      status: "Success",
      message: "Successfully created bill and associated it with the user",
      data: bill,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Server Error", error: error.message });
  }
};

export const filterBills = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to view this resource.",
      });
    }

    const allBills = await Bill.find();

    const totalPaid = allBills.filter((bill) => bill.status === "paid");
    const totalPending = allBills.filter((bill) => bill.status === "paid");
    const totalSecurity = allBills.filter(
      (bill) => bill.billType === "security"
    );
    const totalOthers = allBills.filter((bill) => bill.billType === "other");

    res.status(200).json({
      status: "Success",
      message: "Successfully fetched all bills",
      data: { allBills, totalPaid, totalPending, totalSecurity, totalOthers },
    });
  } catch (error) {
    res.status(500).json({ status: "Errro", message: "Server Error" });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to edit this resource.",
      });
    }

    const billId = req.params.id;
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(404).json({
        status: "Error",
        message: "Bill not found",
      });
    }

    if (req.body.billType) {
      bill.billType = req.body.billType;
    }
    if (req.body.status) {
      bill.status = req.body.status;
    }
    // console.log(bill);

    await bill.save();

    res.status(200).json({
      status: "Success",
      message: "Successfully updated bill",
      data: bill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Server Error" });
  }
};
