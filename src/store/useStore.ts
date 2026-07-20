import { create } from 'zustand';
import { ARTIFACTS, ROOMS, ArtifactData, RoomData } from '@/data/museumData';

interface AppState {
  activeRoomId: string;
  activeArtifactId: string | null;
  
  // Computed getters
  getCurrentRoom: () => RoomData;
  getActiveArtifact: () => ArtifactData | null;
  
  // Actions
  setActiveRoom: (roomId: string) => void;
  setActiveArtifact: (artifactId: string | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  activeRoomId: 'main-hall',
  activeArtifactId: null,

  getCurrentRoom: () => {
    const { activeRoomId } = get();
    return ROOMS.find((r) => r.id === activeRoomId) || ROOMS[0];
  },

  getActiveArtifact: () => {
    const { activeArtifactId } = get();
    if (!activeArtifactId) return null;
    return ARTIFACTS.find((a) => a.id === activeArtifactId) || null;
  },

  setActiveRoom: (roomId) => {
    set({ activeRoomId: roomId, activeArtifactId: null });
  },

  setActiveArtifact: (artifactId) => {
    set({ activeArtifactId: artifactId });
  },
}));
