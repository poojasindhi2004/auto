
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    router.push(
      `/car?search=${search}&budget=${budget}&location=${location}`
    );
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <Image
        src="/images/creta.jpg"
        alt="Hero Car"
        fill
        className="object-cover opacity-60"
        priority
      />

      <div className="relative text-center w-full px-4">
        <h1 className="text-5xl font-bold">
          Buy & Sell Cars with Trusted Dealers
        </h1>

        <p className="mt-4">
          Verified dealers • Easy booking • Secure platform
        </p>

        <div className="mt-10 bg-white rounded-xl p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by car name"
            className="flex-1 border p-2 rounded text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded text-black"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Budget</option>
            <option value="5">Under 5 Lakhs</option>
            <option value="10">Under 10 Lakhs</option>
            <option value="20">Under 20 Lakhs</option>
          </select>

          <select
            className="border p-2 rounded text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Area</option>
            <option value="ahmedabad">Ahmedabad</option>
            <option value="vadodara">Vadodara</option>
            <option value="anand">Anand</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white"
          >
            Search Cars
          </button>

          
        </div>

    <div className="mt-6 space-x-4">
          <a
            href="car"
            className="bg-blue-600 px-6 py-3 rounded"
          >
            Browse Cars
          </a>

          <a
            href="car/login"
            className="border px-6 py-3 rounded"
          >
            Become a Dealer
          </a>
        </div>
        
      </div>
    </section>
  );
}
