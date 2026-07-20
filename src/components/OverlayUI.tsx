"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { ROOMS, ARTIFACTS } from "@/data/museumData";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, BookOpen, Volume2, VolumeX, Minus, Plus, HelpCircle, CheckCircle2 } from "lucide-react";

export default function OverlayUI() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeHintId, setActiveHintId] = useState<string | null>(null);

  const activeRoomId = useStore((state) => state.activeRoomId);
  const setActiveRoom = useStore((state) => state.setActiveRoom);
  const activeArtifactId = useStore((state) => state.activeArtifactId);
  const setActiveArtifact = useStore((state) => state.setActiveArtifact);
  const visitedArtifactIds = useStore((state) => state.visitedArtifactIds);
  const isMuted = useStore((state) => state.isMuted);
  const toggleMute = useStore((state) => state.toggleMute);
  const zoomPercentage = useStore((state) => state.zoomPercentage);
  const zoomIn = useStore((state) => state.zoomIn);
  const zoomOut = useStore((state) => state.zoomOut);

  const activeArtifact = activeArtifactId ? ARTIFACTS.find((a) => a.id === activeArtifactId) : null;
  const currentRoom = ROOMS.find((r) => r.id === activeRoomId) || ROOMS[0];

  const formattedCounter = `${String(visitedArtifactIds.length).padStart(2, "0")}/${String(ARTIFACTS.length).padStart(2, "0")}`;

  const handleHintClick = (artifactId: string, roomId: string) => {
    setActiveHintId(activeHintId === artifactId ? null : artifactId);
    setActiveRoom(roomId);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-4 md:p-6 flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Top-Left Pill / Expandable Checklist Dropdown (Matches reference image) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex flex-col bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 text-white shadow-2xl w-full md:w-[420px] overflow-hidden"
        >
          {/* Header Bar inside Pill */}
          <div className="flex items-center justify-between gap-3 p-3.5 border-b border-white/10">
            <div className="flex-1 text-xs md:text-sm font-medium leading-snug">
              <span>
                Đây là không gian triển lãm <strong className="text-yellow-400">{currentRoom.name}</strong>. Hãy tìm đủ {ARTIFACTS.length} báu vật để khám phá nhé!
              </span>
            </div>
            <button
              onClick={() => setIsListOpen(!isListOpen)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-widest text-yellow-400 border border-white/10 shrink-0"
              title={isListOpen ? "Thu gọn danh sách" : "Mở danh sách hiện vật"}
            >
              <span>{formattedCounter}</span>
              <span className="text-gray-300 font-bold">{isListOpen ? "—" : "+"}</span>
            </button>
          </div>

          {/* Expandable Artifact Checklist (Matches reference dropdown image) */}
          <AnimatePresence>
            {isListOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-h-72 overflow-y-auto divide-y divide-white/10 text-xs bg-black/40"
              >
                {ARTIFACTS.map((artifact) => {
                  const isVisited = visitedArtifactIds.includes(artifact.id);
                  const room = ROOMS.find((r) => r.id === artifact.roomId);
                  const showHint = activeHintId === artifact.id;

                  return (
                    <div key={artifact.id} className="flex flex-col px-4 py-2.5 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        {/* Left Side: Title or ??? */}
                        <div
                          onClick={() => {
                            if (isVisited) {
                              setActiveArtifact(artifact.id);
                              setActiveRoom(artifact.roomId);
                            }
                          }}
                          className={`flex items-center gap-2 cursor-pointer ${
                            isVisited ? "line-through text-gray-400 opacity-65" : "text-white font-medium"
                          }`}
                        >
                          {isVisited ? (
                            <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          ) : (
                            <span className="font-mono text-gray-400 font-bold">???</span>
                          )}
                          <span>{isVisited ? artifact.title : "???"}</span>
                        </div>

                        {/* Right Side: Hint Button for Unvisited Items */}
                        {!isVisited && (
                          <button
                            onClick={() => handleHintClick(artifact.id, artifact.roomId)}
                            className="flex items-center gap-1 text-[11px] text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 px-2 py-1 rounded transition-colors"
                          >
                            <HelpCircle size={11} />
                            <span>Gợi ý</span>
                          </button>
                        )}
                      </div>

                      {/* Expanded Hint Info */}
                      {showHint && !isVisited && (
                        <div className="mt-1.5 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-[11px] text-yellow-200">
                          💡 <strong>Gợi ý:</strong> Nằm tại <strong className="underline">{room?.name}</strong>. Hãy di chuyển sang phòng này để tìm kiếm!
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Top-Right: Sound Toggle & Room Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          {/* Room Navigation Pill */}
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-lg p-1.5 rounded-full border border-white/10 shadow-xl">
            {ROOMS.map((room) => {
              const isActive = activeRoomId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-red-700 text-white shadow-md scale-105"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {room.name.split(":")[0]}
                </button>
              );
            })}
          </div>

          {/* Sound Toggle (Matches reference top right) */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 bg-black/80 backdrop-blur-lg px-3.5 py-2 rounded-full border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors shadow-xl"
          >
            {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-green-400" />}
            <span>Sound {isMuted ? "OFF" : "ON"}</span>
          </button>
        </motion.div>
      </div>

      {/* Artifact Details Side Modal */}
      <AnimatePresence>
        {activeArtifact && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="pointer-events-auto absolute right-6 top-24 bottom-24 w-80 md:w-96 bg-black/85 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 rounded-full font-mono text-xs font-bold uppercase">
                  Năm {activeArtifact.year}
                </span>
                <button
                  onClick={() => setActiveArtifact(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <h2 className="text-xl font-bold font-serif leading-snug mb-3 text-yellow-100">
                {activeArtifact.title}
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-4 rounded-full" />

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {activeArtifact.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <button className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 transition-colors py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white">
                <Play size={14} /> Thuyết Minh Âm Thanh
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white">
                <BookOpen size={14} /> Tài Liệu Đính Kèm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Center Zoom Pill Bar */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center gap-3 bg-black/80 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10 text-white text-xs shadow-xl"
        >
          <button
            onClick={zoomOut}
            className="p-1 hover:text-yellow-400 transition-colors text-gray-300"
            title="Thu nhỏ"
          >
            <Minus size={14} />
          </button>
          <span className="font-mono text-xs font-semibold text-gray-200 min-w-[42px] text-center">
            {zoomPercentage}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1 hover:text-yellow-400 transition-colors text-gray-300"
            title="Phóng to"
          >
            <Plus size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
