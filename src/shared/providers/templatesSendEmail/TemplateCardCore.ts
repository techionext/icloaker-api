interface ITemplateCardCore {
  content: string;
}

export const TemplateCardCore = ({ content }: ITemplateCardCore) => `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <html>
    <body style="
      background: #eff7ff;
      font-family: Arial, Helvetica, sans-serif;
  
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      "
    >
      <div style="
          background-color: white;
          color: rgb(0, 0, 0);
  
          min-width: 400px;
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
          border-radius: 8px;
        ">
          <div style="display: flex; border-bottom: 1px solid rgb(161, 161, 161); padding-bottom: 12px;">
            <p style=" margin-left: 8px; text-align: center; font-weight: 600;">
              Bem vindo a Member Area.
            </p>
          </div>
  
            <div style="padding: 8px;">
              ${content}
            </div>

            <div style="border-top: 1px solid rgb(204, 204, 204); padding-top: 12px; margin-top: 16px;">
              <p style="margin: 4px 0;">Atenciosamente,</p>
              <p style="margin: 4px 0;">Member Area</p>
              <p style="margin: 4px 0;">(xx) x-xxxx-xxxx</p>
            </div>
          </div>
        </body>
    </html>
`;
