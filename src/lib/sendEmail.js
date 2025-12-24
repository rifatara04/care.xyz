import nodemailer from "nodemailer";

export const sendBookingEmail = async (to, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Invoice - Booking Confirmed: ${bookingDetails.serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <table style="width: 100%; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">
          <tr>
            <td style="text-align: left; vertical-align: middle;">
              <h1 style="color: #3b82f6; margin: 0; font-family: Arial, sans-serif;">Care.xyz</h1>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <p style="color: #777; margin: 0; font-family: Arial, sans-serif;">
                Date: ${new Date().toLocaleDateString()}
              </p>
            </td>
          </tr>
        </table>
        <h3 style="color: #333;">Hello ${bookingDetails.buyerName},</h3>
        <p style="color: #555;">Thank you for your booking. Here is your official invoice for the requested service.</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Service Description</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Duration</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">${
                bookingDetails.serviceName
              }</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${
                bookingDetails.duration
              } Days</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;">${
                bookingDetails.totalCost
              } BDT</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background-color: #fefce8;">
              <td colspan="2" style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold;">Total Paid/Due:</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right; font-weight: bold; color: #c2410c;">${
                bookingDetails.totalCost
              } BDT</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px; padding: 15px; background-color: #f0f7ff; border-radius: 5px;">
          <p style="margin: 0; font-size: 14px; color: #1e40af;"><strong>Location:</strong> ${
            bookingDetails.buyerLocation
          }</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #1e40af;"><strong>Status:</strong> ${bookingDetails.status.toUpperCase()}</p>
        </div>

        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>Stay safe, stay with <a href='https://carexyz.vercel.app/' style="color: #3b82f6; text-decoration: none; font-weight: bold;">Care.xyz</a></p>
          <p>&copy; ${new Date().getFullYear()} Care.xyz. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
