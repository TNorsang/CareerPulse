import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex justify-center">
      <h1 className="text-black text-4xl">
        <Link href="/">Career Pulse</Link>
      </h1>
    </div>
  );
}
