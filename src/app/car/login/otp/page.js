"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyOtp = async () => {
    if (otp.length !== 4) {
      alert("Enter valid 4-digit OTP");
      return;
    }

    const email = localStorage.getItem("email");

    if (!email) {
      alert("Email missing, please login again");
      router.push("/car/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://otp-sending-service-1.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      // store token from backend
      localStorage.setItem("token", data.token);

      alert("OTP verified successfully");
      router.push("/car");

    } catch (error) {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-2 mb-4 rounded text-black"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-2xl"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
