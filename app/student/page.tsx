import Link from "next/link";
import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <main className="min-h-screen bg-sky-50">
      <div className="border-b-4 border-orange-500 bg-sky-700 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-white">
            Student Management
          </h1>
          <p className="mt-2 text-sky-100">
            จำนวนนักศึกษา:{" "}
            <strong className="text-orange-300">{students.length}</strong> คน
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <Link
          href="/student/create"
          className="mb-5 inline-block rounded-md bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          + เพิ่มนักศึกษา
        </Link>

        <div className="overflow-x-auto rounded-lg border border-sky-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-sky-100 text-sky-900">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">รหัสนักศึกษา</th>
                <th className="px-4 py-3 font-semibold">ชื่อ</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">สาขา</th>
                <th className="px-4 py-3 font-semibold">ชั้นปี</th>
                <th className="px-4 py-3 font-semibold">สถานะ</th>
                <th className="px-4 py-3 font-semibold">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-sky-100 hover:bg-orange-50"
                >
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3">{student.studentCode}</td>
                  <td className="px-4 py-3 font-medium text-sky-900">
                    {student.name}
                  </td>
                  <td className="px-4 py-3">{student.email ?? "-"}</td>
                  <td className="px-4 py-3">{student.major}</td>
                  <td className="px-4 py-3">{student.year}</td>
                  <td className="px-4 py-3">
                    {student.status ? (
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                        กำลังศึกษา
                      </span>
                    ) : (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        ไม่ใช้งาน
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/student/${student.id}/edit`}
                        className="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600"
                      >
                        แก้ไข
                      </Link>
                      <DeleteButton id={student.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}