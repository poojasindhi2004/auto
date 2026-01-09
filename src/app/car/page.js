"use client"; // ensures this is a client component

import { useSearchParams } from "next/navigation";
import CarCard from "./components/CarCard";

// Sample car data
const cars = [
  {
    id: 1,
    brand: "Hyundai",
    model: "Creta",
    price: 1500000,
    location: "ahmedabad",
    image: "/creta.jpg",
  },
  {
    id: 2,
    brand: "Toyota",
    model: "Fortuner",
    price: 3500000,
    location: "vadodara",
    image: "/fortuner.jpg",
  },
];

export default function CarPage() {
  // safe to useSearchParams because this is now a client component
  const searchParams = useSearchParams();

  // get query parameters
  const search = searchParams.get("search") || "";
  const budget = searchParams.get("budget");
  const location = searchParams.get("location");

  // filter cars based on query params
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());

    const matchesBudget = budget ? car.price <= budget * 100000 : true;
    const matchesLocation = location
      ? car.location.toLowerCase() === location.toLowerCase()
      : true;

    return matchesSearch && matchesBudget && matchesLocation;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Cars</h2>

      {filteredCars.length === 0 ? (
        <p>No cars found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
