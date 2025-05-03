import { MdOutlineEditNote } from 'react-icons/md';
import { FaChartBar } from 'react-icons/fa';
import { GiProgression } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';

export default function FeatureCards() {
    const navigate = useNavigate();

    const features = [
        { icon: MdOutlineEditNote, title: 'Reflect', route: '/reflect', color: 'text-indigo-500' },
        { icon: FaChartBar, title: 'Track', route: '/track', color: 'text-green-500' },
        { icon: GiProgression, title: 'Consistency', route: '/consistency', color: 'text-yellow-500' },
    ];

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} navigate={navigate} />
            ))}
        </div>
    );
}