import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdHealthAndSafety,
    MdDirectionsRun,
    MdOutlineIcecream,
    MdOutlineFlag,
    MdReportProblem,
    MdAccessibilityNew,
    MdTimer,
    MdSelfImprovement,
    MdSportsBasketball
} from 'react-icons/md';
import StickyCtaBar from '../components/StickyCtaBar';

export default function InjuryPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-6 py-8 font-poppins pb-24">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-600 flex justify-center items-center gap-2 tracking-tight">
                        <MdHealthAndSafety className="text-white bg-rose-500 p-2 rounded-full text-5xl shadow-md" />
                        Injury Prevention
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
                        Stay in the game by training smart, recovering well, and spotting red flags early.
                    </p>
                </div>

                {/* Intro Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-rose-100 dark:border-gray-700 mb-10">
                    <h2 className="text-lg font-semibold mb-3 text-rose-700 flex items-center gap-2">
                        <MdOutlineFlag className="text-2xl text-rose-500" />
                        Why Injury Prevention Matters
                    </h2>
                    <p className="text-sm mb-2">
                        Prevent injuries before they happen. This section provides real-world knowledge and routines from a certified athletic trainer — helping you stay healthy, move better, and stay in the game.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Videos, daily recovery guidance, and red-flag warnings are coming soon.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card title="Warm-Up Routines" icon={<MdDirectionsRun />} items={[
                        'Dynamic mobility before games',
                        'Joint-specific activation drills',
                        'Pre-practice stabilization sets'
                    ]} />

                    <Card title="Recovery Tips" icon={<MdOutlineIcecream />} items={[
                        'Post-game stretching & foam rolling',
                        'Hydration & sleep guidance',
                        'Nutrition that supports recovery'
                    ]} />

                    <Card title="Video Series (Coming Soon)" icon={<MdHealthAndSafety />} description="Watch certified trainers break down how elite athletes warm up, strengthen, and recover from real-life injuries." />

                    <Card title="Injury Red Flags" icon={<MdReportProblem />} items={[
                        'When soreness signals something more',
                        'Warning signs for ankle, hip, and knee stress',
                        'Know when to stop and seek help'
                    ]} />

                    <Card title="Strength & Stability" icon={<MdAccessibilityNew />} items={[
                        'Single-leg balance drills',
                        'Hip and core stabilization sets',
                        'Bulletproofing weak links'
                    ]} />

                    <Card title="Load Management" icon={<MdTimer />} items={[
                        'Track minutes, intensity, and rest ratios',
                        'Avoid spikes in workload',
                        'Log games vs. recovery days'
                    ]} />

                    <Card title="Readiness Check-ins" icon={<MdSelfImprovement />} items={[
                        'Daily energy or soreness self-rating',
                        'Track how you feel pre- and post-session',
                        'Log sleep, hydration, and mood'
                    ]} />

                    <Card title="Sport-Specific Guidance" icon={<MdSportsBasketball />} items={[
                        'Basketball: Ankle, knee, shoulder care',
                        'Soccer: Hamstrings, hips, and ACL prep',
                        'Baseball: Throwing recovery, shoulder hygiene'
                    ]} />
                </div>

                {/* Footer */}
                <div className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center">
                    This content is provided for educational purposes by licensed professionals. For any symptoms or concerns, consult a physician or physical therapist.
                </div>
            </div>

            <StickyCtaBar onHome={() => navigate('/')} />
        </div>
    );
}

function Card({ title, icon, items = [], description }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow hover:shadow-rose-200 dark:hover:shadow-rose-700 transition-all">
            <h3 className="text-md font-semibold text-rose-700 mb-2 flex items-center gap-2">
                <span className="text-xl text-rose-500">{icon}</span>
                {title}
            </h3>
            {description && <p className="text-sm leading-relaxed">{description}</p>}
            {items.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1 leading-relaxed">
                    {items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}