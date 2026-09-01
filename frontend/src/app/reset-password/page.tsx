import {
  AuthLayout,
  ResetPasswordForm,
} from "@/components/auth";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a strong password for your account"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}