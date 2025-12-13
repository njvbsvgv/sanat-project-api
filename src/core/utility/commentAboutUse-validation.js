const { z } = require("zod");

const commentAboutUseVAlidationShema = z.object({
    fullName: z.string().trim().min(1, "لطفا نام را به درستی وارد نمایید"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "ایمیل معتبر نیست"),
    message: z.string().min(1, "لطفا متن دیدگاه را وارد کنید")
})

module.exports = commentAboutUseVAlidationShema