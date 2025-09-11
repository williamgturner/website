export default function Cv() {
  return (
    <div className="flex flex-1 h-screen">
      <iframe
        src="/cv.pdf"
        className="
          mx-auto my-auto border-4 border-[#333]
          w-full h-full           
          lg:w-1/2 lg:h-[90%]  
        "
      />
    </div>
  );
}
