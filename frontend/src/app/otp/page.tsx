import {
  AuthLayout,
  OtpForm,
} from "@/components/auth";

export default function OtpPage() {
  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the verification code sent to your email"
    >
      <OtpForm />
    </AuthLayout>
  );
}