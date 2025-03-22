import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
import bcrypt from "bcryptjs";
dotenv.config();
import express from "express";
import sgMail from "@sendgrid/mail";

export const newTranslationOrder = async (req, res, next) => {
  try {
    const {
      fileLanguge,
      translationLanguges,
      methodOfDelivery,
      notes,
      Address,
    } = req.body;
    const files = req.files;
    let filename;
    const { userId } = req.user;

    if (!fileLanguge || !translationLanguges || !methodOfDelivery || !files) {
      return res.status(400).json({
        message: "All inputs are required",
      });
    }

    if (methodOfDelivery == "Home" && !Address) {
      return res.status(400).json({
        message: "AddressId is required when methodOfDelivery is 'Home'",
      });
    }

    filename = files.otherDocs.map((file) => {
      return file.filename;
    });

    const newOrder = await prisma.orders.create({
      data: {
        userid: userId,
        type: "Translation",
        delivery: methodOfDelivery,
        paymentStatus: "no payment",
        status: "pending",
        files: filename,
        Address: Address || null,
      },
    });

    res.status(201).json({
      message: "Order uploaded successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
