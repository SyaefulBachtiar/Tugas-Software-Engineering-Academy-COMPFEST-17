export default function Contact(){
    return(
        //   {/* Kontak */}
        <section className="w-full h-screen flex justify-center py-[230px] bg-[#ffd194]">
          <h2 className="text-2xl font-semibold mb-4 font-inter">Contact Detail</h2>
        <div className="flex flex-col my-[50px] gap-10 font-inter">

          <p className="text-lg flex gap-5 items-center">
            <i className="fas fa-user"></i>
            <p>Manajer: Brian</p>
            </p>
          <p className="text-lg flex gap-5 items-center">
            <i className="fas fa-phone"></i>
            <a href="https://wa.me/08123456789">08123456789</a>
          </p>
        </div>
        </section>
    )
}