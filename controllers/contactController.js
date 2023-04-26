import expressAsyncHandler from "express-async-handler";
import { ContactModel } from "../models/contactModel.js";

/**
 * @desc Get All Contacts
 * @route GET api/contacts
 * @access private
 */
const getContacts = expressAsyncHandler(async (req, res) => {
    const contacts = await ContactModel.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

/**
 * @desc Create Contact
 * @route POST api/contacts
 * @access private
 */
const createContact = expressAsyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const newContact = await ContactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(newContact);
});

/**
 * @desc Get Contact
 * @route GET api/contacts/:id
 * @access private
 */
const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found.");
    }
    res.status(200).json(contact);
});

/**
 * @desc Update Contact
 * @route PUT api/contacts/:id
 * @access private
 */
const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found.");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Dose not have access to this contact.");
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

/**
 * @desc Delete Contact
 * @route DELETE api/contacts/:id
 * @access private
 */
const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found.");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Dose not have access to this contact.");
    }

    // await ContactModel.findByIdAndDelete(req.params.id);
    await ContactModel.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
