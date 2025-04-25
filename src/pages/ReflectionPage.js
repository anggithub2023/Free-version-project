import SportSelectionModal from '../components/ReflectionModal/SportSelectionModal';

function ReflectionPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <SportSelectionModal onSelect={(sport) => console.log('Selected:', sport)} />
        </div>
    );
}

export default ReflectionPage;