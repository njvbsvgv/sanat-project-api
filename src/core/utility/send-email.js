const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const damin = process.env.FROM_EMAIL;
const adminEmail = process.env.ADMIN_EMAIL;
const sendEmail = async (fullName, emailAddress, message) => {
  try {
    const sendedEmail = await resend.emails.send({
      from: damin,
      to: adminEmail,
      subject: `پیام جدید از ${fullName}`,
      html: `<div style="font-family: 'Segoe UI', sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
      <div style="background-color: #007bff; color: #fff; padding: 18px 24px; text-align: center; font-size: 20px; font-weight: bold;">
        پیام جدید از فرم تماس وب‌سایت
      </div>

      <div style="padding: 24px; line-height: 1.8; color: #333;">
        <p><strong>👤 نام فرستنده:</strong> ${fullName}</p>
        <p><strong>📧 ایمیل کاربر:</strong> ${emailAddress}</p>
        <p><strong>💬 پیام:</strong></p>
        <div style="background-color: #f1f3f5; padding: 16px; border-radius: 8px; white-space: pre-line; font-size: 15px;">
          ${message}
        </div>
      </div>

      <div style="background-color: #f9f9f9; text-align: center; padding: 16px; font-size: 13px; color: #777;">
        <p>این ایمیل به صورت خودکار از طریق وب‌سایت شما ارسال شده است.</p>
        <p>© ${new Date().getFullYear()} YourCompany. All rights reserved.</p>
      </div>
    </div>
  </div>`,
    });
    console.log("sendedEmail ==>", sendedEmail);
    if (!sendedEmail.error) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

module.exports = sendEmail;