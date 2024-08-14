import { env } from '@shared/Util/Env/Env';

interface ICreateNewUser {
  name: string;
  email: string;
  password: string;
}

export const TemplateCreateNewUser = ({ name, email, password }: ICreateNewUser) => `
<div>
<p style="padding-bottom: 12px;">
  Olá, ${name}
</p>


<p style="padding-bottom: 4px; font-size: 16px;">
  Seja bem vindo a Member area, clicando no botão abaixo você acessará nossa plataforma
</p>

<div>
  <h2>Dados de login</h2>
  <p>Email: ${email}</p>
  <p>Senha: ${password}</p>
</div>

<div>
  <a target="_blank" href=${env.LINK_LOGIN}>
    <button style="
          background-color: #3980f5;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        ">
      Acessar plataforma
    </button>
  </a>
</div>
</div>
`;
