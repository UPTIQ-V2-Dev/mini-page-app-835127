import prisma from '../client.ts';
import { Contact, Prisma } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Contact>}
 */
const createContact = async (
    name: string,
    email: string,
    subject: string,
    message: string,
    userId?: number
): Promise<Contact> => {
    return prisma.contact.create({
        data: {
            name,
            email,
            subject,
            message,
            userId
        }
    });
};

/**
 * Query for contacts
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContacts = async <Key extends keyof Contact>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt', 'userId'] as Key[]
): Promise<Pick<Contact, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const contacts = await prisma.contact.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return contacts as Pick<Contact, Key>[];
};

/**
 * Get contact by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Contact, Key> | null>}
 */
const getContactById = async <Key extends keyof Contact>(
    id: number,
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt', 'userId'] as Key[]
): Promise<Pick<Contact, Key> | null> => {
    return (await prisma.contact.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<Contact, Key> | null>;
};

/**
 * Update contact by id
 * @param {number} contactId
 * @param {Object} updateBody
 * @returns {Promise<Contact>}
 */
const updateContactById = async <Key extends keyof Contact>(
    contactId: number,
    updateBody: Prisma.ContactUpdateInput,
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt', 'userId'] as Key[]
): Promise<Pick<Contact, Key> | null> => {
    const contact = await getContactById(contactId, ['id']);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    const updatedContact = await prisma.contact.update({
        where: { id: contact.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedContact as Pick<Contact, Key> | null;
};

/**
 * Delete contact by id
 * @param {number} contactId
 * @returns {Promise<Contact>}
 */
const deleteContactById = async (contactId: number): Promise<Contact> => {
    const contact = await getContactById(contactId);
    if (!contact) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
    }
    await prisma.contact.delete({ where: { id: contact.id } });
    return contact;
};

export default {
    createContact,
    queryContacts,
    getContactById,
    updateContactById,
    deleteContactById
};