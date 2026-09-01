import {
  AuthLayout,
  RegisterForm,
} from "@/components/auth";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with ZentStay"
    >
      <RegisterForm />
    </AuthLayout>
  );
}