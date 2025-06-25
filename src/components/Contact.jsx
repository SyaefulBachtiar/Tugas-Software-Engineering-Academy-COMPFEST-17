export default function Contact(){
    return(
        //   {/* Kontak */}
        <section className="w-full h-screen flex justify-center py-[230px] bg-[#ffd194]">
        <div className="flex flex-col gap-5 font-inter border w-[400px] h-[200px] px-[100px] py-5 bg-white rounded-md">
          <h2 className="text-2xl font-semibold mb-2 font-inter">Contact Detail</h2>
          <div className="text-lg flex gap-5 items-center">
            <i className="fas fa-user"></i>
            <p>Manajer: Brian</p>
            </div>
          <div className="text-lg flex gap-5 items-center">
            <i className="fas fa-phone"></i>
            <a href="https://wa.me/08123456789">08123456789</a>
          </div>
        </div>
        </section>
    )
}