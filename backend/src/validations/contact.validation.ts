import Joi from 'joi';

const createContact = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    })
};

const getContacts = {
    query: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
        subject: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getContact = {
    params: Joi.object().keys({
        contactId: Joi.number().integer()
    })
};

const updateContact = {
    params: Joi.object().keys({
        contactId: Joi.number().integer()
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            email: Joi.string().email(),
            subject: Joi.string(),
            message: Joi.string()
        })
        .min(1)
};

const deleteContact = {
    params: Joi.object().keys({
        contactId: Joi.number().integer()
    })
};

export default {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
};