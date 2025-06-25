export default function HeroSection(){
    return(
        // {/* Bagian Sambutan */}
                <section className="w-full h-screen flex flex-row flex-wrap sm:flex-nowrap">
                <div className="w-full sm:w-[80%]  sm:h-full flex flex-col sm:items-center  mx-10 my-10 sm:my-[100px]">
                  <h2 className="text-3xl sm:text-6xl font-semibold font-inter mb-4">Welcome to SEA Catering</h2>
                  <p className="text-sm sm:text-lg font-inter">
                    We are a catering service that provides healthy, customizable food, with fast delivery to all major cities in Indonesia. SEA Catering is here to support your healthy lifestyle, anytime and anywhere.
                  </p>
                </div>
                <div className="w-full h-full">
                <img className="object-cover w-full  sm:h-full mask-background-x-between-70-90" src="/Images/HeroSection.png" alt="Catering" />
                </div>
                </section>
    )
}