const commentAboutUseVAlidationShema = require("../../core/utility/commentAboutUse-validation");
const sendEmail = require("../../core/utility/send-email");
const Comment = require("../../models/level1/commentAboutUse-models");
const addCommentAboutUse = async (req, res, next) => {
  if (req.body) {
    const { fullName, email, message } = req.body;
    const validation = commentAboutUseVAlidationShema.safeParse(req.body);
    if (!validation.success) {
      const errors = validation.error.flatten();
      return res.status(400).json({ message: errors.fieldErrors });
    } else {
      try {
        const sendEmailStatus = await sendEmail(fullName, email, message);
        if (sendEmailStatus.success) {
          const newComment = new Comment({
            fullName: fullName,
            email: email,
            message: message,
          });
          await newComment.save();
          return res.status(200).json({ message: "نظرتان با موفقیت ثبت شد" });
        } else {
          return res
            .status(401)
            .json({
              message:
                "خطایی هنگام فرستادن ایمیل به وجود اومد، لطفا بع از 10 ثانیه دوباره تلاش کنید",
            });
        }
      } catch (error) {
        return res.status(500).json({ message: "ارور سمت سرور" });
      }
    }
  } else {
    return res
      .status(400)
      .json({ message: "لطفا تمامی فیلدهارا با دقت پرکنید" });
  }
};

exports.commentAboutUse = {
  addCommentAboutUse,
};
