import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <div className="border rounded shadow hover:shadow-lg transition">
      <Image
        src={car.image}
        alt={car.model}
        width={300}
        height={200}
      />

      <div className="p-4">
        <h3 className="font-semibold">
          {car.brand} {car.model}
        </h3>

        <p className="text-blue-600 font-bold">
          ₹{car.price}
        </p>


        <Link href={`/car/${car.id}`}>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
