import Link from "next/link";
import data from "@/data.json";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Team</h1>
      {data.map((employee) => (
        <Link
          key={employee.employee_id}
          href={`/employee/${employee.employee_id}`}
          className="block border p-4 rounded-xl mb-4 hover:bg-gray-100"
        >
          <h2>{employee.name}</h2>
          <p>{employee.role}</p>
        </Link>
      ))}
    </main>
  );
}