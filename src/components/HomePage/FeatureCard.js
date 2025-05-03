export default function FeatureCard({ icon: Icon, title, route, color, navigate }) {
    return (
        <div
            onClick={() => navigate(route)}
            className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition p-6 rounded-xl text-center w-full sm:w-1/3"
        >
            <Icon className={`mx-auto text-4xl mb-2 ${color}`} />
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    );
}