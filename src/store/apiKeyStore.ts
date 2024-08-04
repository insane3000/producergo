import { create } from "zustand";

interface ApiKeyStoreIT {
  apiKey: string;
  setApiKey: any;
  modelInput: string;
  setModelInput: any;
}

export const useApiKeyStore = create<ApiKeyStoreIT>((set) => ({
  apiKey: "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",
  setApiKey: (value: "") => set((state: ApiKeyStoreIT) => ({ ...state, apiKey: value })),
  modelInput: "llama-3-sonar-small-32k-chat",
  setModelInput: (value: "") => set((state: ApiKeyStoreIT) => ({ ...state, modelInput: value })),
}));
