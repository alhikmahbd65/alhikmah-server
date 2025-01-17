import { EUserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
const router = express.Router();

router.get('/', BookController.getAllBook);
router.get(
  '/get-single-book-by-name/:name',
  BookController.getSingleBookByName,
);
router.get('/get-books-by-search-text', BookController.getBooksBySearchText);
router.get('/get-related-book-by-name', BookController.getRelatedBookByName);
router.get('/get-content-structure', BookController.getContentStructure);
router.get('/:id', BookController.getSingleBook);
router.post(
  '/',
  auth(EUserRole.SUPER_ADMIN, EUserRole.ADMIN),
  validateRequest(BookValidation.createValidation),
  BookController.createBook,
);

router.patch(
  '/increase-share-count/:id',
  validateRequest(BookValidation.updateValidation),
  BookController.updateBookShareCount,
);
router.patch(
  '/:id',
  auth(EUserRole.SUPER_ADMIN, EUserRole.ADMIN),
  validateRequest(BookValidation.updateValidation),
  BookController.updateBook,
);
router.delete(
  '/:id',
  auth(EUserRole.SUPER_ADMIN, EUserRole.ADMIN),
  BookController.deleteBook,
);

export const BookRoutes = router;
