"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      alert("Enter email id");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://otp-sending-server-production.up.railway.app/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send OTP");
        return;
      }

      localStorage.setItem("email", email);
      router.push("/car/login/otp");

    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Login to SeaNeB Autos
        </h1>

        <input
          type="email"
          placeholder="Enter email id"
          className="w-full border p-2 mb-4 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-2xl"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
