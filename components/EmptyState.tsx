"use client";

const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex items-center justify-center bg-gray-100">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 font-semibold text-2xl text-gray-900">
          Select a Chat or start a new conversation!
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
