import {
  AuthLayout,
  LoginForm,
} from "@/components/auth";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your ZentStay account"
    >
      <LoginForm />
    </AuthLayout>
  );
}