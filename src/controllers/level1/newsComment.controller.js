const { dateGenerator } = require("../../core/utility/date-generator");
const tokenDeCoded = require("../../core/utility/tokenDeCoded");
const {
  NewsCommentSchema,
  NewsCommentReplaySchema,
} = require("../../models/level1/newsComment.model");
const ProductAndNewsLikeAndDeslikeActonSchema = require("../../models/level1/ProductAndNewsLikeAndDeslikeActon.model");
// ProductAndNewsLikeAndDeslikeActonSchema
// const productAndNewsLikeAndDeslikeActonSchema = require("../../models/level1/")

const createNewsComment = async (req, res, next) => {
  if (req.body) {
    const { title, description } = req.body;
    if (title != "" && description != "") {
      try {
        const { NewsId } = req.params;
        const newComment = new NewsCommentSchema({
          userPic: "",
          userName: "",
          newsId: NewsId,
          title,
          description,
          likeCount: "0",
          desLikeCount: "0",
          createAt: dateGenerator(),
        });
        await newComment.save();
        return res.status(201).json({ message: "کامنت با موفقیت ثبت شد" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "ارور سمت سرور", message2: error.message });
      }
    } else {
      return res
        .status(400)
        .json({ message: "فیلدها خالیست، لطفا تمامی فیلدهارا با دقت پرکنید" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "فیلدها خالیست، لطفا تمامی فیلدهارا با دقت پرکنید" });
  }
};

const getNewsCommentList = async (req, res, next) => {
  try {
    const { NewsId } = req.params;
    const findCommentData = await NewsCommentSchema.find({ newsId: NewsId });
    return res
      .status(200)
      .json({ data: findCommentData, totalCount: findCommentData.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const createNewsCommentReplay = async (req, res, next) => {
  if (req.body) {
    const { title, description } = req.body;
    if (title != "" && description != "") {
      try {
        const { NewsId, CommentId } = req.params;
        const newReplay = new NewsCommentReplaySchema({
          newsId: NewsId,
          commentId: CommentId,
          title,
          description,
          desLikeCount: "0",
          likeCount: "0",
          userName: "",
          userPic: "",
          createAt: dateGenerator(),
        });
        await newReplay.save();
        return res.status(201).json({ message: "ریپلای با موفقیت ثبت شد" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "ارور سمت سرور", message2: error.message });
      }
    }
  } else {
    return res
      .status(400)
      .json({ message: "فیلدها خالیست، لطفا تمامی فیلدهارا با دقت پرکنید" });
  }
};

const getNewsReplay = async (req, res, next) => {
  try {
    const { NewsId, CommentId } = req.params;
    const findReplayData = await NewsCommentReplaySchema.find({
      newsId: NewsId,
      commentId: CommentId,
    });
    return res
      .status(200)
      .json({ data: findReplayData, totalCount: findReplayData.length });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "ارور سمت سرور", message2: error.message });
  }
};

const updateCommentLike = async (commentId, likeCount, deslikeCount) => {
  await NewsCommentSchema.updateOne(
    { _id: commentId },
    {
      likeCount: likeCount,
      desLikeCount: deslikeCount,
    }
  );
};

const likeComment = async (req, res, next) => {
  try {
    const { NewsId, CommentId } = req.params;
    const userId = tokenDeCoded(req).payload.id;

    const result = await ProductAndNewsLikeAndDeslikeActonSchema.updateOne(
      {
        targetId: NewsId,
        commentId: CommentId,
      },
      {
        $pull: { deslikeDB: userId },
        $addToSet: { likeDB: userId },
      },
      { upsert: true }
    );

    if (result.matchedCount && result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "شما قبلاً این کامنت را لایک کرده‌اید" });
    }

    const likeDoc = await ProductAndNewsLikeAndDeslikeActonSchema.findOne({
      targetId: NewsId,
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


const dislikeComment = async (req, res, next) => {
  try {
    const { NewsId, CommentId } = req.params;
    const userId = tokenDeCoded(req).payload.id;

    const result = await ProductAndNewsLikeAndDeslikeActonSchema.updateOne(
      {
        targetId: NewsId,
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

    const likeDoc = await ProductAndNewsLikeAndDeslikeActonSchema.findOne({
      targetId: NewsId,
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
  createNewsComment,
  getNewsCommentList,
  createNewsCommentReplay,
  getNewsReplay,
  likeComment,
  dislikeComment
};
