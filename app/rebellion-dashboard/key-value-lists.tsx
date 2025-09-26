import { useCallback, useState } from 'react';

type KeyValueList<T> = {
    keyName: string;
    keyPlaceholder: string;
    queue: KeyValueTodo[];
    setQueue: (value: KeyValueTodo[]) => void;
    title: string;
    valueName: string;
    valuePlaceholder: string;
};

type KeyValueTodo = {
    completed: boolean;
    id: number;
    key: string;
    value: string;
};

export default function KeyValueLists<T>({
    keyName,
    keyPlaceholder,
    queue,
    setQueue,
    title,
    valueName,
    valuePlaceholder,
}: KeyValueList<T>) {
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');
    const newId = useCallback(() => Date.now(), []);

    const addTodo = () => {
        if (newKey.trim() && newValue.trim()) {
            setQueue([
                ...queue,
                {
                    id: newId(),
                    key: newKey.trim(),
                    value: newValue.trim(),
                    completed: false,
                },
            ]);
            setNewKey('');
            setNewValue('');
        }
    };

    const toggleTodo = (id: number): void => {
        setQueue(
            queue.map((todo: KeyValueTodo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    const removeTodo = (id: number): void => {
        setQueue(queue.filter((todo: KeyValueTodo) => todo.id !== id));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className="text-left w-full">
            <label className="mb-2 inline-block" htmlFor="queue">
                {title}
            </label>

            <div className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700">
                {/* Todo Items */}
                <div className="space-y-2 mb-4 min-h-[120px] max-h-[200px] overflow-y-auto">
                    {queue.map((todo: KeyValueTodo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 transition-colors"
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span
                                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}
                            >
                                <span className="font-medium text-blue-300">{todo.key}:</span>{' '}
                                <span>{todo.value}</span>
                            </span>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {queue.length === 0 && (
                        <div className="text-gray-400 text-center py-4">
                            No items in queue. Add some tasks below.
                        </div>
                    )}
                </div>

                {/* Add New Todo */}
                <div className="border-t border-gray-700 pt-3">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                            onKeyUp={handleKeyPress}
                            placeholder={`${keyName} (e.g., ${keyPlaceholder})...`}
                            className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyUp={handleKeyPress}
                            placeholder={`${valueName} (e.g., ${valuePlaceholder})...`}
                            className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={addTodo}
                        disabled={!newKey.trim() || !newValue.trim()}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        Add Entry
                    </button>
                </div>
            </div>
        </div>
    );
}
