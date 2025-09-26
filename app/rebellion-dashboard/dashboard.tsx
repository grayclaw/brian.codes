'use client';

import { useGameContext } from '@hooks';

import KeyValueLists from './key-value-lists';
import Lists from './lists';

export default function Dashboard() {
    const {
        activeTab,
        buildQueue,
        leaderAssignment,
        missionPlan,
        planetControl,
        setActiveTab,
        setBuildQueue,
        setLeaderAssignment,
        setMissionPlan,
        setPlanetControl,
        tabs,
    } = useGameContext();

    return (
        <div className="p-6">
            {/* Page Header */}
            <h1 className="text-3xl font-bold mb-6 text-[var(--star-wars-yellow)]">
                Star Wars Rebellion Dashboard
            </h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
                <div className="mx-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`p-8 px-4 py-2 -mb-px border-b-2 transition-colors ${
                                activeTab === tab
                                    ? 'border-[var(--star-wars-yellow)] text-[var(--star-wars-yellow)]'
                                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Column 1 */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-semibold mb-2 text-2xl">Objectives Tracker</h2>
                        <Lists
                            queue={buildQueue}
                            setQueue={setBuildQueue}
                            title="Building Queue Manager"
                        />
                        <KeyValueLists
                            queue={leaderAssignment}
                            setQueue={setLeaderAssignment}
                            title="Leader Assignment Board"
                            keyName="Leader"
                            keyPlaceholder="Han Solo"
                            valueName="Quest"
                            valuePlaceholder="Smuggling Run"
                        />
                    </div>

                    {/* Column 2 */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <KeyValueLists
                            queue={planetControl}
                            setQueue={setPlanetControl}
                            title="Planet Control Tracker"
                            keyName="Planet"
                            keyPlaceholder="Kashyyyk"
                            valueName="Controller"
                            valuePlaceholder="Brian"
                        />
                    </div>

                    {/* Column 3 */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="font-semibold mb-8 text-2xl">Holonet Updates</h2>
                        <div className="text-left w-full">
                            <label className="mb-2 inline-block" htmlFor="introCrawl">
                                Intro Crawl Generator
                            </label>
                            <textarea
                                cols={45}
                                id="introCrawl"
                                name="introCrawl"
                                placeholder="Intro Crawl Generator"
                                rows={8}
                                className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div className="text-left w-full">
                            <label className="mb-2 inline-block" htmlFor="turnLog">
                                Turn Log / Journal
                            </label>
                            <textarea
                                cols={45}
                                id="turnLog"
                                name="turnLog"
                                placeholder="Turn Log / Journal"
                                rows={8}
                                className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="text-center">
                    <h2 className="font-semibold text-2xl">Mission Planning</h2>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 bg-gray-800 p-4 rounded-lg">
                        <textarea
                            cols={45}
                            id="missionPlanning"
                            name="missionPlanning"
                            placeholder="Mission Planning"
                            rows={12}
                            className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700"
                        />
                        {/* <Lists
                            queue={missionPlan}
                            setQueue={setMissionPlan}
                            title="Mission Planning"
                        /> */}
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-left w-full">
                            <label className="mb-2 inline-block" htmlFor="turnLog">
                                Probe Droid Tracker
                            </label>
                            <textarea
                                cols={45}
                                id="probeDroidTracker"
                                name="probeDroidTracker"
                                placeholder="Probe Droid Tracker"
                                rows={4}
                                className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div className="text-left w-full">
                            <label className="mb-2 inline-block" htmlFor="turnLog">
                                Win Probability Estimator
                            </label>
                            <textarea
                                cols={45}
                                id="probabilityEstimator"
                                name="probabilityEstimator"
                                placeholder="Win Probability Estimator"
                                rows={4}
                                className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
