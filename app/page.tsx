import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          width={48}
          height={48}
          className="mx-auto w-auto"
          src="/youchat.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
          Sign in to your account
        </h2>
      </div>
    </div>
  );
}
