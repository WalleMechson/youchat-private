const Seperator = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <AuthSocialButton />
      </div>
    </div>
  );
};

export default Seperator;
