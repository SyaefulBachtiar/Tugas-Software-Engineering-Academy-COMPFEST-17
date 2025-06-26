// import Button from "./Button";

// export default function HeroSection(){
//     return(
//         // {/* Bagian Sambutan */}
//                 <section className="w-full h-screen flex flex-row flex-wrap sm:flex-nowrap my-[80px] sm:my-0">
//                 <div className="w-full sm:w-[80%]  sm:h-full flex flex-col sm:items-center  mx-10 -my-[200px]">
//                   <h2 className="text-3xl sm:text-6xl font-semibold font-inter mb-4">Welcome to SEA Catering</h2>
//                   <p className="text-sm sm:text-lg font-inter">
//                     We are a catering service that provides healthy, customizable food, with fast delivery to all major cities in Indonesia. SEA Catering is here to support your healthy lifestyle, anytime and anywhere.
//                   </p>
//                   <div className="w-full flex justify-end my-10">
//                   <Button
//                   link={'/menu'}
//                   text={'See Menu'}
//                   />
//                   </div>
//                 </div>
//                 <div className="w-full h-full">
//                 <img className="object-cover w-full  sm:h-full mask-background-x-between-70-90" src="/Images/HeroSection.png" alt="Catering" />
//                 </div>
//                 </section>
//     )
// }

import Button from "./Button";

export default function HeroSection() {
  return (
    <section className="w-full h-screen flex flex-col sm:flex-row px-6 sm:px-16 gap-10 items-center sm:gap-10">
      {/* Text Section */}
      <div className="w-full sm:w-1/2 flex flex-col sm:items-start text-left">
        <h2 className="text-3xl sm:text-5xl font-semibold font-inter mb-6 leading-tight">
          Welcome to <span className="text-primary">SEA Catering</span>
        </h2>
        <p className="text-sm sm:text-lg font-inter text-gray-700 max-w-xl">
          We are a catering service that provides healthy, customizable food, with fast delivery to all major cities in Indonesia. SEA Catering is here to support your healthy lifestyle, anytime and anywhere.
        </p>
        <div className="mt-8 flex justify-end w-full px-10">
          <Button link="/menu" text="See Menu" />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full sm:w-1/2 h-[300px] sm:h-full flex items-center justify-center">
        <img
          src="/Images/HeroSection.png"
          alt="Catering"
          className="object-cover w-full h-full rounded-xl shadow-lg mask-background-x-between-70-90"
        />
      </div>
    </section>
  );
}
