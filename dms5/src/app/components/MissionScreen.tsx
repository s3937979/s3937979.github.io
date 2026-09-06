import { useState } from "react";
import TabBar from "./TabBar";

type MissionCategory = "starter" | "intermediate" | "advanced";
type MissionStatus = "not-started" | "in-progress" | "completed";

interface Mission {
  id: string;
  title: string;
  progress: string;
  progressCompleted?: string;
  reward: number;
  status: MissionStatus;
  progressPercent: number;
}

interface MissionScreenProps {
  onCategoryChange?: (category: MissionCategory) => void;
  onHomeClick?: () => void;
  onMissionClick?: () => void;
  onIslandClick?: () => void;
  onProfileClick?: () => void;
  initialCategory?: MissionCategory;
}

const missionData = {
  starter: [
    { id: "s1", title: "Reach 5,000 steps 3 times", progress: "0/3 days completed", progressCompleted: "3/3 days completed", reward: 18, status: "not-started" as MissionStatus, progressPercent: 0 },
    { id: "s2", title: "Reach 6,000 steps 5 times", progress: "0/5 days completed", progressCompleted: "5/5 days completed", reward: 35, status: "not-started" as MissionStatus, progressPercent: 0 },
    { id: "s3", title: "Buy your first house", progress: "", progressCompleted: "", reward: 5, status: "not-started" as MissionStatus, progressPercent: 0 },
    { id: "s4", title: "Reach 25,000 steps together", progress: "0/25,000 steps completed", progressCompleted: "25,000/25,000 steps completed", reward: 10, status: "not-started" as MissionStatus, progressPercent: 0 },
  ],
  intermediate: [
    { id: "i1", title: "Decorate your island with 3 new items", progress: "0/3 items completed", progressCompleted: "3/3 items completed", reward: 7, status: "not-started" as MissionStatus, progressPercent: 0 },
    { id: "i2", title: "Reach 6,000 steps 7 times", progress: "0/7 days completed", progressCompleted: "7/7 days completed", reward: 40, status: "not-started" as MissionStatus, progressPercent: 0 },
  ],
  advanced: [
    { id: "a1", title: "Reach 10,000 steps 3 times", progress: "0/3 days completed", progressCompleted: "3/3 days completed", reward: 40, status: "not-started" as MissionStatus, progressPercent: 0 },
    { id: "a2", title: "Customize your character with 3 items", progress: "0/3 items completed", progressCompleted: "3/3 items completed", reward: 10, status: "not-started" as MissionStatus, progressPercent: 0 },
  ],
};

export default function MissionScreen({ onCategoryChange, onHomeClick, onMissionClick, onIslandClick, onProfileClick, initialCategory = "starter" }: MissionScreenProps) {
  const [category, setCategory] = useState<MissionCategory>(initialCategory);
  const [missions, setMissions] = useState<Mission[]>(() => JSON.parse(JSON.stringify(missionData[initialCategory])));

  const handleCategoryClick = (newCategory: MissionCategory) => {
    setCategory(newCategory);
    setMissions(JSON.parse(JSON.stringify(missionData[newCategory])));
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  const handleStartMission = (missionId: string) => {
    setMissions(missions.map(mission => {
      if (mission.id === missionId) {
        let newProgress = mission.progress;
        let newProgressPercent = 40;

        if (missionId === "a1") {
          newProgress = "2/3 days completed";
          newProgressPercent = 67;
        } else if (missionId === "s1") {
          newProgressPercent = 40;
        } else if (missionId === "s4") {
          newProgress = "12,000/25,000 steps completed";
          newProgressPercent = 48;
        } else if (missionId === "i1") {
          newProgress = "2/3 items completed";
          newProgressPercent = 67;
        }

        return { ...mission, status: "in-progress", progressPercent: newProgressPercent, progress: newProgress };
      }
      return mission;
    }));

    // Auto-complete after 30 seconds
    setTimeout(() => {
      setMissions(prevMissions => prevMissions.map(mission => {
        if (mission.id === missionId) {
          return {
            ...mission,
            status: "completed",
            progressPercent: 100,
            progress: mission.progressCompleted || mission.progress
          };
        }
        return mission;
      }));
    }, 30000);
  };

  return (
    <div className="h-full flex flex-col bg-[#EDEDEE]">
      {/* Fixed Header */}
      <div className="flex-shrink-0 pt-5 pb-4 px-4 bg-[#EDEDEE] z-10">
        <h1 className="text-black mb-4" style={{ fontSize: '32px', fontWeight: 700 }}>
          Mission
        </h1>

        {/* Category buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleCategoryClick("starter")}
            className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
              category === "starter" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Starter
          </button>
          <button
            onClick={() => handleCategoryClick("intermediate")}
            className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
              category === "intermediate" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Intermediate
          </button>
          <button
            onClick={() => handleCategoryClick("advanced")}
            className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
              category === "advanced" ? "bg-[#7A9B5F] text-black" : "bg-white text-black"
            }`}
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Mission cards */}
        <div className="px-4 space-y-3 pb-20">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-[#B8D4A0] rounded-2xl p-4 border-2 border-black/20"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-black flex-1" style={{ fontSize: '18px', fontWeight: 700 }}>
                  {mission.title}
                </h3>
                {mission.status === "not-started" && (
                  <button
                    onClick={() => handleStartMission(mission.id)}
                    className="bg-[#7A9B5F] text-white px-4 py-1 rounded-lg border-2 border-black/20"
                    style={{ fontSize: '15px', fontWeight: 600 }}
                  >
                    Start
                  </button>
                )}
                {mission.status === "in-progress" && (
                  <div className="bg-[#7A9B5F] text-white px-3 py-1 rounded-lg border-2 border-black/20">
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>In Progress</span>
                  </div>
                )}
                {mission.status === "completed" && (
                  <div className="text-red-600 px-2 py-1">
                    <span style={{ fontSize: '16px', fontWeight: 700 }}>Completed</span>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-1">
                <div className="h-3 bg-white rounded-full border-2 border-black/30 overflow-hidden">
                  <div
                    className="h-full bg-[#7A9B5F] transition-all duration-500"
                    style={{ width: `${mission.progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black" style={{ fontSize: '13px', fontWeight: 400 }}>
                  {mission.progress}
                </span>
                <span className="text-black" style={{ fontSize: '13px', fontWeight: 600 }}>
                  Reward: {mission.reward} coins
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tab bar */}
      <TabBar activeTab="mission" onTab1Click={onHomeClick} onTab2Click={onMissionClick} onTab3Click={onIslandClick} onTab4Click={onProfileClick} />
    </div>
  );
}
