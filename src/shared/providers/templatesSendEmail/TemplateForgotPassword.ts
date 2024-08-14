import { env } from '@shared/Util/Env/Env';

interface IForgotPassword {
  id: string;
  name: string;
}

export const TemplateForgotPassword = ({ id, name }: IForgotPassword) => `
<div>
      <p style="padding-bottom: 12px;">
        Olá, ${name}
      </p>

      <div>
        <p style="padding-bottom: 4px; font-size: 16px;">
          Você solicitou a recuperação de senha no Member Area 🔑🔓
        </p>
        <p style="padding-bottom: 4px; font-size: 14px;">
          Você pode recuperar sua senha em <strong>30 minutos</strong> após solicitar,
          caso não tenha feito o pedido de recuperação de senha desconsiderar email
        </p>
      </div>  

      <div>
        <a target="_blank" href=${env.LINK_RECOVER_PASSWORD}${id}>
          <button style="
                background-color: #3980f5;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
              ">
            Recuperar senha
          </button>
        </a>
      </div>
</div>
`;
