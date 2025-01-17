import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterAbleFields } from './blog.constant';
import { BlogService } from './blog.service';

const createBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const BlogData = req.body;
    const user = req.user as JwtPayload;
    const result = await BlogService.createBlog({
      ...BlogData,
      authorId: user.userId,
    });
    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Created successfully!',
      data: result,
    });
  },
);

const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...blogFilterAbleFields]);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BlogService.getAllBlog(filters, paginationOptions);

  sendResponse<Omit<Blog, 'content'>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BlogService.getSingleBlog(id);

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog retrieved  successfully!',
      data: result,
    });
  },
);

const updateBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;
    const user = req.user as JwtPayload;
    const result = await BlogService.updateBlog(
      id,
      updateAbleData,
      user.userId,
    );

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Updated successfully!',
      data: result,
    });
  },
);
const deleteBlog: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BlogService.deleteBlog(id);

    sendResponse<Blog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully!',
      data: result,
    });
  },
);

export const BlogController = {
  getAllBlog,
  createBlog,
  updateBlog,
  getSingleBlog,
  deleteBlog,
};
