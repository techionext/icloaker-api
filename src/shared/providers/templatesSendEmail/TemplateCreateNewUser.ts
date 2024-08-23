import { env } from '@shared/Util/Env/Env';

interface ICreateNewUser {
  emailId: string;
  name: string;
}

export const TemplateCreateNewUser = ({ name, emailId }: ICreateNewUser) => `
<div>
    <div class="content">
      <h1>Seja bem vindo ao ICloaker!</h1>
      <p>Olá, ${name}</p>
      <p>Sua conta foi criada com sucesso e agora você está pronto(a) para começar a usar todos os recursos disponíveis.</p>
      <p>Para fazer login, basta clicar no botão abaixo:</p>

      <a href="${env.URLS.FRONT_END_BASE_URL}/magic-link/${emailId}" class="btn">Acessar Minha Conta</a>

      <p>Este Magic Link é seguro e permite que você acesse sua conta sem precisar de senha. Simples e rápido!</p>
      <p>Aguardamos sua participação e desejamos muito sucesso em sua nova jornada com o ICloaker!</p>
    </div>
</div>
`;
