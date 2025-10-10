export default function TabWarningModal({ show, playerName, onConfirm, onCancel }: any) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 border-2 border-[var(--star-wars-yellow)] rounded-lg p-6 max-w-md mx-4">
                <h2 className="text-xl font-bold text-[var(--star-wars-yellow)] mb-4">
                    ⚠️ Player Switch Warning
                </h2>
                <p className="text-white mb-4">
                    You are about to switch to{' '}
                    <strong className="text-[var(--star-wars-yellow)]">{playerName}</strong>'s view.
                </p>
                <p className="text-white mb-6">
                    The information displayed will be specific to this player. Other players should
                    not view this data to maintain game secrecy.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-[var(--star-wars-yellow)] text-black font-semibold rounded hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        Continue
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
