const {
  ProductCommentSchema: CommentDB,
  ProductCommentReplaySchema,
} = require("../../models/level1/productComment.model");
const { dateGenerator } = require("../../core/utility/date-generator");

const createNewComment = async (req, res, next) => {
  if (req.body) {
    try {
      const { ProductId } = req.params;
      const { title, description } = req.body;
      if (title.trim() != "" && description.trim() != "") {
        const newComment = new CommentDB({
          userPic: "null",
          userName: "کاربر",
          createAt: dateGenerator(),
          title: title,
          description: description,
          productId: ProductId,
          desLikeCount: "0",
          likeCount: "0",
        });
        await newComment.save();
        return res.status(201).json({ message: "نطر جدید با موفقیت ساخته شد" });
      } else {
        return res
          .status(400)
          .json({
            message: "فیلدها خالیست، لطفا تمامی فیلدهارا با دفت پرکنید",
          });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "مشکلی پیش اومده", message2: error.message });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllProductCommentList = async (req, res, next) => {
  try {
    const { ProductId } = req.params;
    const commentList = await CommentDB.find({ productId: ProductId });
    return res
      .status(200)
      .json({ data: commentList, totalCount: commentList.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی پیش آمده", message2: error.message });
  }
};

const createNewCommentReplay = async (req, res, next) => {
  if (req.body) {
    try {
      const { ProductId, CommentId } = req.params;
      const { title, description } = req.body;
      if (title.trim() != "" && description.trim() != "") {
        const newComment = new ProductCommentReplaySchema({
          userPic: "null",
          userName: "کاربر",
          createAt: dateGenerator(),
          title: title,
          description: description,
          productId: ProductId,
          commentId: CommentId,
          desLikeCount: "0",
          likeCount: "0",
        });
        await newComment.save();
        return res.status(201).json({ message: "نطر جدید با موفقیت ساخته شد" });
      } else {
        return res
          .status(400)
          .json({
            message: "فیلدها خالیست، لطفا تمامی فیلدهارا با دفت پرکنید",
          });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "مشکلی پیش اومده", message2: error.message });
    }
  } else {
    return res.status(400).json({ message: "فیلدها خالیست" });
  }
};

const getAllProductCommentReplayList = async (req, res, next) => {
  try {
    const { ProductId, CommentId } = req.params;
    const replayList = await ProductCommentReplaySchema.find({
      productId: ProductId,
      commentId: CommentId,
    });
    return res
      .status(200)
      .json({ data: replayList, totalCount: replayList.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "مشکلی پیش آمده", message2: error.message });
  }
};

module.exports = {
  createNewComment,
  getAllProductCommentList,
  createNewCommentReplay,
  getAllProductCommentReplayList,
};
