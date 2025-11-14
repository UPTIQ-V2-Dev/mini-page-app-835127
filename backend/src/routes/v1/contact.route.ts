import { contactController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { contactValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Public route for submitting contact form
router
    .route('/')
    .post(validate(contactValidation.createContact), contactController.createContact);

// Admin-only routes for managing contacts
router
    .route('/admin')
    .get(auth('manageUsers'), validate(contactValidation.getContacts), contactController.getContacts);

router
    .route('/admin/:contactId')
    .get(auth('manageUsers'), validate(contactValidation.getContact), contactController.getContact)
    .patch(auth('manageUsers'), validate(contactValidation.updateContact), contactController.updateContact)
    .delete(auth('manageUsers'), validate(contactValidation.deleteContact), contactController.deleteContact);

export default router;

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form submission and management
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit contact form message
 *     description: Submit a contact form message. No authentication required.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the person submitting the form
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the person
 *               subject:
 *                 type: string
 *                 description: Subject of the message
 *               message:
 *                 type: string
 *                 description: The message content
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               subject: General Inquiry
 *               message: Hello, I have a question...
 *     responses:
 *       "201":
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Thank you for your message! We will get back to you soon.
 *                 id:
 *                   type: string
 *                   example: contact-1731579600000
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalError'
 */

/**
 * @swagger
 * /contact/admin:
 *   get:
 *     summary: Get all contact messages
 *     description: Only admins can retrieve all contact messages.
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by sender name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by sender email
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by message subject
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of contacts
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /contact/admin/{contactId}:
 *   get:
 *     summary: Get a contact message
 *     description: Only admins can fetch contact messages.
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Contact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a contact message
 *     description: Only admins can update contact messages.
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             example:
 *               name: John Updated
 *               email: john.updated@example.com
 *               subject: Updated Subject
 *               message: Updated message content
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Contact'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a contact message
 *     description: Only admins can delete contact messages.
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Contact ID
 *         name:
 *           type: string
 *           description: Sender's name
 *         email:
 *           type: string
 *           format: email
 *           description: Sender's email
 *         subject:
 *           type: string
 *           description: Message subject
 *         message:
 *           type: string
 *           description: Message content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the contact was created
 *         userId:
 *           type: integer
 *           nullable: true
 *           description: Associated user ID (optional)
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         subject: General Inquiry
 *         message: Hello, I have a question...
 *         createdAt: 2025-11-14T10:00:00Z
 *         userId: null
 */