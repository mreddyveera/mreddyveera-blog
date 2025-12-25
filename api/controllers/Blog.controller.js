import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import { encode } from "entities";
import Category from "../models/category.model.js";
export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mreddyveera-mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
    });
    await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const blogid = req.params.blogid;
    // const {name,slug}=req.body;
    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) next(handleError(404, "Data not found."));
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blogid = req.params.blogid;
    const data = JSON.parse(req.body.data);
    const blog = await Blog.findById(blogid);

    let featuredImage = blog.featuredImage;
    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mreddyveera-mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    blog.featuredImage = featuredImage;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name role slug")
      .populate("category", "name")
      .sort({ created_at: -1 })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "name role slug")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getRelatedBlogs = async (req, res, next) => {
  try {
    const { category, slug } = req.params;
    const categoryData = await Category.findOne({ name: category });

    if (!categoryData) {
      return next(handleError(404, "Category data not found"));
    }
    const categoreyid = categoryData._id;

    const blog = await Blog.find({ category: categoreyid, slug: { $ne: slug } })
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const categoryData = await Category.findOne({ name: category }).lean();
    if (!categoryData) {
      return next(handleError(404, "Category data not found"));
    }

    const blogs = await Blog.find({ category: categoryData._id })
      .populate("category", "name") // 🔥 THIS IS THE KEY LINE
      .populate("author", "name role slug")
      .lean()
      .exec();
      

    res.status(200).json({
      blog: blogs,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    
    const blogs = await Blog.find({ title:{$regex:q, $options:'i'} })
      .populate("author", "name avatar role").populate('category','name slug') // 🔥 THIS IS THE KEY LINE
      .lean()
      .exec();
      console.log(blogs);

    res.status(200).json({
      blog: blogs,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};