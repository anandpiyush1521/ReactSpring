package com.application.server.helpers;

public class EmailTemplate {
    
    public static String getEmailTemplateForVerifyUser(String firstName, String otp) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "body {" +
                "    font-family: Arial, sans-serif;" +
                "    background-color: #f4f4f4;" +
                "    margin: 0;" +
                "    padding: 0;" +
                "}" +
                ".container {" +
                "    width: 100%;" +
                "    max-width: 600px;" +
                "    margin: 0 auto;" +
                "    background-color: #ffffff;" +
                "    padding: 20px;" +
                "    border-radius: 10px;" +
                "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" +
                "}" +
                ".header {" +
                "    text-align: center;" +
                "    padding: 10px 0;" +
                "    border-bottom: 1px solid #eeeeee;" +
                "}" +
                ".header h2 {" +
                "    margin: 0;" +
                "    color: #333333;" +
                "}" +
                ".content {" +
                "    padding: 20px;" +
                "}" +
                ".content p {" +
                "    font-size: 16px;" +
                "    color: #666666;" +
                "    line-height: 1.5;" +
                "}" +
                ".otp {" +
                "    font-size: 24px;" +
                "    font-weight: bold;" +
                "    color: #333333;" +
                "    text-align: center;" +
                "    margin: 20px 0;" +
                "}" +
                ".button {" +
                "    text-align: center;" +
                "    margin: 20px 0;" +
                "}" +
                ".button a {" +
                "    background-color: #007bff;" +
                "    color: #ffffff;" +
                "    padding: 10px 20px;" +
                "    text-decoration: none;" +
                "    border-radius: 5px;" +
                "    font-size: 16px;" +
                "}" +
                ".footer {" +
                "    text-align: center;" +
                "    padding: 10px 0;" +
                "    border-top: 1px solid #eeeeee;" +
                "    font-size: 14px;" +
                "    color: #aaaaaa;" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "    <div class=\"header\">" +
                "        <h2>Hello " + firstName + ",</h2>" +
                "    </div>" +
                "    <div class=\"content\">" +
                "        <p>Welcome to <i>PayerUp</i>.</p>" +
                "        <p>Here's the code that you need to use to activate your account:</p>" +
                "        <div class=\"otp\">" + otp + "</div>" +
                "        <p>Thank you,<br>PayerUp team</p>" +
                "    </div>" +
                "    <div class=\"footer\">" +
                "        <p>&copy; 2024 PayerUp. All rights reserved.</p>" +
                "    </div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    public static String getEmailTemplateForPasswordRecovery(String firstName, String otp) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "body {" +
                "    font-family: Arial, sans-serif;" +
                "    background-color: #f4f4f4;" +
                "    margin: 0;" +
                "    padding: 0;" +
                "}" +
                ".container {" +
                "    width: 100%;" +
                "    max-width: 600px;" +
                "    margin: 0 auto;" +
                "    background-color: #ffffff;" +
                "    padding: 20px;" +
                "    border-radius: 10px;" +
                "    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);" +
                "}" +
                ".header {" +
                "    text-align: center;" +
                "    padding: 10px 0;" +
                "    border-bottom: 1px solid #eeeeee;" +
                "}" +
                ".header h2 {" +
                "    margin: 0;" +
                "    color: #333333;" +
                "}" +
                ".content {" +
                "    padding: 20px;" +
                "}" +
                ".content p {" +
                "    font-size: 16px;" +
                "    color: #666666;" +
                "    line-height: 1.5;" +
                "}" +
                ".otp {" +
                "    font-size: 24px;" +
                "    font-weight: bold;" +
                "    color: #333333;" +
                "    text-align: center;" +
                "    margin: 20px 0;" +
                "}" +
                ".button {" +
                "    text-align: center;" +
                "    margin: 20px 0;" +
                "}" +
                ".button a {" +
                "    background-color: #007bff;" +
                "    color: #ffffff;" +
                "    padding: 10px 20px;" +
                "    text-decoration: none;" +
                "    border-radius: 5px;" +
                "    font-size: 16px;" +
                "}" +
                ".footer {" +
                "    text-align: center;" +
                "    padding: 10px 0;" +
                "    border-top: 1px solid #eeeeee;" +
                "    font-size: 14px;" +
                "    color: #aaaaaa;" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "    <div class=\"header\">" +
                "        <h2>Hello " + firstName + ",</h2>" +
                "    </div>" +
                "    <div class=\"content\">" +
                "        <p>Welcome to <i>PayerUp</i>.</p>" +
                "        <p>Here's the code that you need to use to reset your password: </p>" +
                "        <div class=\"otp\">" + otp + "</div>" +
                "        <p>Thank you,<br>PayerUp team</p>" +
                "    </div>" +
                "    <div class=\"footer\">" +
                "        <p>&copy; 2024 PayerUp. All rights reserved.</p>" +
                "    </div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
