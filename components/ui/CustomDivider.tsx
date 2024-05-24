const CustomDivider = () => {
  return (
    <div className="relative py-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-white text-lg text-gray-700">★</span>
      </div>
    </div>
  );
};

export default CustomDivider;
