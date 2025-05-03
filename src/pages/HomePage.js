import { FaChartLine, FaLightbulb, FaCheckDouble } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { HiOutlineArrowDown } from 'react-icons/hi';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#fdfaf5] flex justify-center items-center px-4 py-10">
            <div className="bg-[#fefcf9] rounded-[40px] shadow-md w-full max-w-sm p-6 text-black font-sans">

                {/* Header */}
                <div className="flex items-center justify-center gap-2 text-sm font-medium mb-10 mt-2">
                    <BsCheckCircleFill className="text-black" />
                    <span>processwins.app</span>
                </div>

                {/* Hero */}
                <div className="text-left mb-6">
                    <h1 className="text-3xl font-black leading-tight mb-3">
                        Reflect on<br />your<br />performance.
                    </h1>
                    <p className="text-sm text-gray-600">
                        Turn self-awareness<br />into progress.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mb-10">
                    <button className="bg-black text-white rounded-xl px-6 py-3 w-full font-medium text-sm max-w-xs">
                        Start Reflection
                    </button>
                </div>

                {/* Down Arrow */}
                <HiOutlineArrowDown className="text-2xl mx-auto mb-6" />

                {/* Icon Cards */}
                <div className="flex justify-between gap-3 mb-8">
                    <div className="bg-white rounded-xl p-4 flex-1 shadow-sm text-center">
                        <FaChartLine className="text-2xl mx-auto mb-2" />
                        <p className="text-xs font-medium leading-tight">Track<br />Progress</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 flex-1 shadow-sm text-center">
                        <FaLightbulb className="text-2xl mx-auto mb-2" />
                        <p className="text-xs font-medium leading-tight">Get<br />Insights</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 flex-1 shadow-sm text-center">
                        <FaCheckDouble className="text-2xl mx-auto mb-2" />
                        <p className="text-xs font-medium leading-tight">Build<br />Consistency</p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-[10px] text-gray-500 text-center">
                    © {new Date().getFullYear()} processwins.app
                </p>
            </div>
        </div>
    );
}