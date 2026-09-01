import {
  AuthLayout,
  ForgotPasswordForm,
} from "@/components/auth";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive an OTP"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}