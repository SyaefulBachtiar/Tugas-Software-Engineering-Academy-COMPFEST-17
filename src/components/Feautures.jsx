import Waves from "./Waves"
import WavesBottom from "./WavesBottom"

export default function Feautures(){
  const TextValue = [
    {text: "Customize meals to suit your nutritional needs", image: "/Images/nutrisi.png"},
    {text: "Fast delivery to major cities in Indonesia", image: "/Images/delivery.png"},
    {text: "Detailed nutritional information on each menu", image: "/Images/nutrisi2.png"}
  ]
    return(
        // {/* Fitur */}
                <section className="w-full h-[200vh] -my-[130px] sm:-my-[10px] sm:h-screen relative bg-[#0099ff]">
                  <Waves />
                    <div className="w-full h-full flex flex-col justify-center items-center font-inter">
                  <h2 className="text-4xl font-semibold mb-[100px] text-white">Our services</h2>
                  <ul className="text-lg flex items-center gap-[100px] text-center justify-center flex-wrap">
                    {
                      TextValue.map((texts, i) => (
                        <li 
                        key={i}
                        className="w-[300px] h-[200px] relative bg-white rounded-md p-2 flex flex-col items-center z-10"
                        >
                          <div className="w-[200px] absolute bottom-[120px]">
                          <img src={texts.image} alt="kk" className="w-full object-cover" />
                          </div>
                          <div className="py-[100px] p-2">
                          {texts.text}
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  </div>
                  <WavesBottom />
                </section>
    )
}