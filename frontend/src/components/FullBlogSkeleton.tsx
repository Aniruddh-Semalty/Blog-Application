export const FullBlogSkeleton = () => {
  return (
    <div className="animate-pulse p-20">
      <div className="grid grid-cols-12">
        <div className="bg-gray-200 h-16  col-span-8 rounded-full mb-20"></div>
        {/* <div className="bg-gray-200 col-span-3 ml-2 rounded-full h-52"></div> */}
        <div className="col-span-4">
        <div className="ml-20 w-8 h-8 rounded-full  bg-gray-200 border "></div>
        <div className="rounded-full  bg-gray-200 h-4 w-1/2 ml-20 mt-6"></div>
        </div>
      </div>
      <div className="grid grid-cols-9">
      <div className="bg-gray-200 col-span-6 h-6 mb-2 rounded-full "></div>
      <div className="bg-gray-200 col-span-5 h-6 mb-2 rounded-full"></div>
      <div className="bg-gray-200 col-span-6 h-6 mb-2 rounded-full"></div>
      <div className="bg-gray-200 col-span-4 h-6 mb-2 rounded-full"></div>
      <div className="bg-gray-200 col-span-6 h-6 mb-2 rounded-full"></div>
      <div className="bg-gray-200 col-span-6 h-6 mb-2 rounded-full"></div>
      </div>
    </div>
  );
};
