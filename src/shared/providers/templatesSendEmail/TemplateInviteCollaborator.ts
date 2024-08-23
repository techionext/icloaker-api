import { env } from '@shared/Util/Env/Env';

interface IInviteCollaborator {
  inviteId: string;
  hasAccount: boolean;
}

export const TemplateInviteCollaborator = ({ inviteId, hasAccount }: IInviteCollaborator) => {
  return `
    <div class="content">
      <h1>Participe do ICloaker!</h1>
      <p>Olá,</p>
      <p>Você foi convidado para participar do ICloaker! Ao aceitar este convite, você terá acesso a todas as funcionalidades e recursos que esta empresa oferece através de nossa plataforma.</p>
      <p>Clique no botão abaixo para aceitar o convite e começar a colaborar com sua equipe no ICloaker.</p>

      <a href="${env.URLS.FRONT_END_BASE_URL}/collaborator-invite?inviteId=${inviteId}&hasAccount=${hasAccount}" class="btn">Aceitar Convite</a>

      <p>Se você não estava esperando por este convite ou se acha que houve um erro, por favor, entre em contato com nossa equipe de suporte.</p>
      <p>Aguardamos sua participação e desejamos muito sucesso em sua nova jornada com o ICloaker!</p>
    </div>
  `;
};
