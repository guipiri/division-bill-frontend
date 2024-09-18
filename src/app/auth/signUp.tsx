import { Auth } from '@/src/components/Auth';

export default function SignUpScreen() {
  return (
    <Auth.AuthRoot>
      {/* <Auth.AuthTitle></Auth.AuthTitle> */}
      <Auth.AuthForm type="signup" />
      <Auth.GoogleButton />
    </Auth.AuthRoot>
  );
}
