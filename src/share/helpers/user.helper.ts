import { account, OAuthProvider } from '@/share/lib/appwrite';

export const loginWithGitHub = ({ error }) => {
  account.createOAuth2Session(
    OAuthProvider.Github,
    'http://localhost:3000/account',
    `http://localhost:3000/auth/${error}`,
    ['repo', 'user']
  );
};
