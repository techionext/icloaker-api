interface ITemplateCardCore {
  content: string;
}

export const TemplateCardCore = ({ content }: ITemplateCardCore) => `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #F1F1F1;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #24b148;
            padding: 10px;
            text-align: center;
        }
        .header img {
            width: 100%;
            max-width: 600px;
        }
        .content {
            padding: 20px;
            text-align: left;
            background-color: #FFFFFF;
            border-radius: 10px;
        }
        .content h1 {
            color: #333333;
            font-size: 24px;
        }
        .content p {
            color: #555555;
            line-height: 1.5;
        }
        .content .btn {
            display: inline-block;
            background-color: #24b148;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            padding: 10px;
            background-color: #FFFFFF;
            text-align: center;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .footer img {
            max-width: 120px;
        }
        .footer p {
            color: #555555;
            font-size: 14px;
        }
        .footer a {
            color: #24b148;
            text-decoration: none;
        }
        .footer .disclaimer {
            font-size: 12px;
            color: #888888;
            margin-top: 10px;
        }
    </style>
  </head>
  <body>
    <div class="container">

        ${content}

        <div class="footer">
          <div>
            <img src="logo.png" alt="ICloaker Logo">
          </div>

          <div>
            <p>Agradecemos por utilizar o ICloaker!</p>
            <p>Se precisar de ajuda, entre em contato com nosso <a href="#">Suporte</a>.</p>
            <p class="disclaimer">Este é um e-mail automático, por favor, não responda.</p>
          </div>
        </div>

    </div>   
  </body>
</html>
`;
