import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type EditStudentPageProps = {
  params: Promise<{ id: string }>;
};

const labelClass = "mb-2 block text-sm font-medium text-sky-900";
const inputClass =
  "w-full rounded-md border border-sky-200 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

async function updateStudent(studentId: number, formData: FormData) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.update({
    where: { id: studentId },
    data: { studentCode, name, email: email || null, major, year },
  });

  revalidatePath("/student");
  redirect("/student");
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;
  const studentId = Number(id);

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return (
      <main className="min-h-screen bg-sky-50 p-6">
        <h1 className="mx-auto max-w-2xl text-2xl font-bold text-orange-600">
          ไม่พบข้อมูลนักศึกษา
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sky-50">
      <div className="border-b-4 border-orange-500 bg-sky-700 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-white">แก้ไขนักศึกษา</h1>
          <p className="mt-2 text-sky-100">
            แก้ไขข้อมูลนักศึกษา ID:{" "}
            <strong className="text-orange-300">{student.id}</strong>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl p-6">
        <form
          action={async (formData) => {
            "use server";
            await updateStudent(studentId, formData);
          }}
          className="space-y-5 rounded-lg border border-sky-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="studentCode" className={labelClass}>
              รหัสนักศึกษา
            </label>
            <input
              id="studentCode"
              type="text"
              name="studentCode"
              defaultValue={student.studentCode}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="name" className={labelClass}>
              ชื่อ-นามสกุล
            </label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={student.name}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={student.email ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="major" className={labelClass}>
              สาขา
            </label>
            <input
              id="major"
              type="text"
              name="major"
              defaultValue={student.major}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="year" className={labelClass}>
              ชั้นปี
            </label>
            <input
              id="year"
              type="number"
              name="year"
              defaultValue={student.year}
              min="1"
              max="8"
              required
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-5 py-2 font-medium text-white hover:bg-orange-600"
            >
              บันทึกการแก้ไข
            </button>

            <Link
              href="/student"
              className="rounded-md border border-sky-300 px-5 py-2 font-medium text-sky-700 hover:bg-sky-50"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}