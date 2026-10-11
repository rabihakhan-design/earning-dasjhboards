const KEY = "myqr";

export type SavedCode = {
  id: number;
  type: string;
  data: string;
  fg: string;
  bg: string;
  date: string;
};

export function loadCodes(): SavedCode[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") || [];
  } catch {
    return [];
  }
}

export function saveCode(c: Omit<SavedCode, "id" | "date">) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify([
        { ...c, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
        ...loadCodes(),
      ])
    );
  } catch {}
}

export function removeCode(id: number) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify(loadCodes().filter((x) => x.id !== id))
    );
  } catch {}
}
