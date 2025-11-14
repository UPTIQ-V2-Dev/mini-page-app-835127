import { contactService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createContact = catchAsync(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const contact = await contactService.createContact(name, email, subject, message);
    
    // Generate a unique ID in the format specified in the API spec
    const uniqueId = `contact-${Date.now()}`;
    
    res.status(httpStatus.CREATED).send({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        id: uniqueId
    });
});

const getContacts = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['name', 'email', 'subject']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await contactService.queryContacts(filter, options);
    res.send(result);
});

const getContact = catchAsyncWithAuth(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    res.send(contact);
});

const updateContact = catchAsyncWithAuth(async (req, res) => {
    const contact = await contactService.updateContactById(req.params.contactId, req.body);
    res.send(contact);
});

const deleteContact = catchAsyncWithAuth(async (req, res) => {
    await contactService.deleteContactById(req.params.contactId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
};