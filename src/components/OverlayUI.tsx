"use client";

import { useStore } from "@/store/useStore";
import { ROOMS, ARTIFACTS } from "@/data/museumData";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, BookOpen, Compass, Layers } from "lucide-react";

export default function OverlayUI() {
  const activeRoomId = useStore((state) => state.activeRoomId);
  const setActiveRoom = useStore((state) => state.setActiveRoom);
  const activeArtifactId = useStore((state) => state.activeArtifactId);
  const setActiveArtifact = useStore((state) => state.setActiveArtifact);

  const activeArtifact = activeArtifactId ? ARTIFACTS.find(a => a.id === activeArtifactId) : null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-6 flex flex-col justify-between select-none">
      {/* Top Bar - Header & Navigation Menu */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg"
        >
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
          <span className="font-serif font-bold text-sm tracking-wider text-white uppercase">
            Bảo Tàng Lịch Sử Đảng 3D
          </span>
        </motion.div>

        {/* Room Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex flex-wrap justify-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg"
        >
          {ROOMS.map((room) => {
            const isActive = activeRoomId === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-red-700 text-white shadow-md scale-105"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {room.name.split(":")[0]}
              </button>
            );
          })}
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
            className="pointer-events-auto absolute right-6 top-24 bottom-24 w-80 md:w-96 bg-black/75 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 rounded-full font-mono text-xs font-bold uppercase">
                  Năm {activeArtifact.year}
                </span>
                <button
                  onClick={() => setActiveArtifact(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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
              <button className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 transition-colors py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider">
                <Play size={14} /> Thuyết Minh Âm Thanh
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider">
                <BookOpen size={14} /> Tài Liệu Đính Kèm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Status / Controls Hint */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between text-xs text-gray-400"
      >
        <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
          <Compass size={14} className="text-yellow-500" />
          <span>Kéo chuột để xoay camera 3D · Click hiện vật để xem chi tiết</span>
        </div>

        <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
          <Layers size={14} className="text-red-500" />
          <span>Đang ở: {ROOMS.find((r) => r.id === activeRoomId)?.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
