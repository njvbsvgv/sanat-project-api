const {
  ProductCommentSchema: CommentDB,
  ProductCommentReplaySchema,
} = require("../../models/level1/productComment.model");
// const productAndNewsLikeAndDeslikeActonSchema = require("../../models/level1/")
const { dateGenerator } = require("../../core/utility/date-generator");
// const LikeAndDeslikeModel = require("../../models/level1/ProductAndNewsLikeAndDeslikeActon.model");
const tokenDeCoded = require("../../core/utility/tokenDeCoded");

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
        return res.status(400).json({
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

const updateCommentLike = async (commentId, likeCount, deslikeCount) => {
  await CommentDB.updateOne(
    { _id: commentId },
    {
      likeCount: likeCount,
      desLikeCount: deslikeCount,
    }
  );
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
        return res.status(400).json({
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

const likeComment = async (req, res, next) => {
  try {
    const { ProductId, CommentId } = req.params;
    const userId = tokenDeCoded(req).payload.id;

    const result = await LikeAndDeslikeModel.updateOne(
      {
        targetId: ProductId,
        commentId: CommentId,
      },
      {
        $pull: { deslikeDB: userId }, // اگر دیسلایک شده بود حذف می‌کند
        $addToSet: { likeDB: userId }, // به لایک‌ها اضافه می‌کند (بدون تکرار)
      },
      { upsert: true } // اگر سند وجود نداشت، می‌سازد
    );

    // اگر قبلاً لایک کرده بود
    if (result.matchedCount && result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "شما قبلاً این کامنت را لایک کرده‌اید" });
    }

    const likeDoc = await LikeAndDeslikeModel.findOne({
      targetId: ProductId,
      commentId: CommentId,
    });

    await updateCommentLike(
      CommentId,
      likeDoc.likeDB.length,
      likeDoc.deslikeDB.length
    );

    return res.status(201).json({ message: "لایک با موفقیت انجام شد" });
  } catch (error) {
    return res.status(500).json({
      message: "ارور سمت سرور",
      error: error.message,
    });
  }
};

const deslikeComment = async (req, res, next) => {
  try {
    const { ProductId, CommentId } = req.params;
    const userId = tokenDeCoded(req).payload.id;

    const result = await LikeAndDeslikeModel.updateOne(
      {
        targetId: ProductId,
        commentId: CommentId,
      },
      {
        $pull: { likeDB: userId },
        $addToSet: { deslikeDB: userId },
      },
      { upsert: true }
    );

    if (result.matchedCount && result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "شما قبلاً این کامنت را دیسلایک کرده‌اید" });
    }

    const likeDoc = await LikeAndDeslikeModel.findOne({
      targetId: ProductId,
      commentId: CommentId,
    });

    await updateCommentLike(
      CommentId,
      likeDoc.likeDB.length,
      likeDoc.deslikeDB.length
    );

    return res.status(201).json({ message: "دیسلایک با موفقیت انجام شد" });
  } catch (error) {
    return res.status(500).json({
      message: "ارور سمت سرور",
      error: error.message,
    });
  }
};

module.exports = {
  createNewComment,
  getAllProductCommentList,
  createNewCommentReplay,
  getAllProductCommentReplayList,
  likeComment,
  deslikeComment,
};
