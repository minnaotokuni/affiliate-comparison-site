/** 1日・1品目の代表値（産地横断で入荷量加重の代表中値） */
export type OtaDailyPoint = {
  date: string;
  /** 円・市場取引単位（表記は kg 未換算のケースあり） */
  midWeighted: number | null;
  hiMax: number | null;
  loMin: number | null;
  volumeT: number;
  hasShipment: boolean;
  /** データに現れた品目名（代表） */
  itemLabel: string;
};

export type OtaItemConfig = {
  id: string;
  itemCode: string;
  category: "v" | "f";
  displayName: string;
};

export type OtaHistoryFile = {
  version: 1;
  marketCode: string;
  marketName: string;
  /**
   * itemCode -> 日付 ISO (YYYY-MM-DD) -> point
   * 日付は市況APIの「日付」列（市場取引日）に合わせる
   */
  byItem: Record<string, Record<string, OtaDailyPoint>>;
  lastSnapshotAt: string | null;
};

export type OtaRow = {
  date: string;
  itemName: string;
  itemCode: string;
  volume: number | null;
  high: number | null;
  mid: number | null;
  low: number | null;
};
