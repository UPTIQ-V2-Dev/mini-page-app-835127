import { contactService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const contactSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
    createdAt: z.string(),
    userId: z.number().nullable()
});

const createContactTool: MCPTool = {
    id: 'contact_create',
    name: 'Create Contact',
    description: 'Create a new contact form submission',
    inputSchema: z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string(),
        message: z.string(),
        userId: z.number().optional()
    }),
    outputSchema: contactSchema,
    fn: async (inputs: { name: string; email: string; subject: string; message: string; userId?: number }) => {
        const contact = await contactService.createContact(
            inputs.name,
            inputs.email,
            inputs.subject,
            inputs.message,
            inputs.userId
        );
        return contact;
    }
};

const getContactsTool: MCPTool = {
    id: 'contact_get_all',
    name: 'Get All Contacts',
    description: 'Get all contact form submissions with optional filters and pagination',
    inputSchema: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        subject: z.string().optional(),
        sortBy: z.string().optional(),
        limit: z.number().int().optional(),
        page: z.number().int().optional()
    }),
    outputSchema: z.object({
        contacts: z.array(contactSchema)
    }),
    fn: async (inputs: { 
        name?: string; 
        email?: string; 
        subject?: string; 
        sortBy?: string; 
        limit?: number; 
        page?: number 
    }) => {
        const filter = pick(inputs, ['name', 'email', 'subject']);
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        const result = await contactService.queryContacts(filter, options);
        return { contacts: result };
    }
};

const getContactTool: MCPTool = {
    id: 'contact_get_by_id',
    name: 'Get Contact By ID',
    description: 'Get a single contact form submission by its ID',
    inputSchema: z.object({
        contactId: z.number().int()
    }),
    outputSchema: contactSchema,
    fn: async (inputs: { contactId: number }) => {
        const contact = await contactService.getContactById(inputs.contactId);
        if (!contact) {
            throw new Error('Contact not found');
        }
        return contact;
    }
};

const updateContactTool: MCPTool = {
    id: 'contact_update',
    name: 'Update Contact',
    description: 'Update contact form submission information by ID',
    inputSchema: z.object({
        contactId: z.number().int(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        subject: z.string().optional(),
        message: z.string().optional()
    }),
    outputSchema: contactSchema,
    fn: async (inputs: { 
        contactId: number; 
        name?: string; 
        email?: string; 
        subject?: string; 
        message?: string 
    }) => {
        const updateBody = pick(inputs, ['name', 'email', 'subject', 'message']);
        const contact = await contactService.updateContactById(inputs.contactId, updateBody);
        return contact;
    }
};

const deleteContactTool: MCPTool = {
    id: 'contact_delete',
    name: 'Delete Contact',
    description: 'Delete a contact form submission by its ID',
    inputSchema: z.object({
        contactId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { contactId: number }) => {
        await contactService.deleteContactById(inputs.contactId);
        return { success: true };
    }
};

export const contactTools: MCPTool[] = [
    createContactTool, 
    getContactsTool, 
    getContactTool, 
    updateContactTool, 
    deleteContactTool
];