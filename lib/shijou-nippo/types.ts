export type ShijouMarketId = "toyosu" | "ohta" | "toshima" | "yodobashi" | "itabashi" | "setagaya" | "kitaadachi" | "tama_nt" | "kasai";

export type ShijouMarketMeta = {
  id: ShijouMarketId;
  label: string;
  csvSuffix: string;
};

export type SeiDetailRow = {
  itemName: string;
  /** ブロック先頭行の卸売数量計（参考） */
  blockTotalVolume: number | null;
  saleMethod: string;
  volume: number | null;
  variety: string;
  origin: string;
  unitKg: number | null;
  highYen: number | null;
  midYen: number | null;
  lowYen: number | null;
};

export type CabbageSizeLabel = "M" | "L" | "2L";

/** 日報CSVの1行相当（サイト上の「詳しい価格」用） */
export type SeiCsvLineSummary = {
  saleMethod: string;
  variety: string;
  origin: string;
  unitKg: number | null;
  volume: number | null;
  highYen: number | null;
  midYen: number | null;
  lowYen: number | null;
};

export type SeiItemRetailRow = {
  marketLabel: string;
  marketId: ShijouMarketId;
  itemName: string;
  /** キャベツ用。品種欄が空の日は同一卸値から換算した旨をUIで示す */
  cabbageSize: CabbageSizeLabel | null;
  /** 数量加重・円/kg（CSVの高値÷単位キロ） */
  wholesaleHighYenPerKg: number | null;
  wholesaleMidYenPerKg: number | null;
  wholesaleLowYenPerKg: number | null;
  /** @deprecated wholesaleMidYenPerKg と同一。後方互換のため残す */
  wholesaleYenPerKg: number | null;
  /** 一般的な小売の目安（倍率のみ機械的に反映、実店舗とは大きく異なる場合あり） */
  retailYenPerPieceEst: number | null;
  detailNote: string;
  /** この集計に対応する日報行（数量上位・高・中・安はCSV表記のまま円） */
  csvTopLines: SeiCsvLineSummary[];
};

export type ShijouSeiDashboardPayload = {
  ok: true;
  requestedDateIso: string;
  /** CSV先頭の令和日付を西暦にしたもの（取得できた場合） */
  reportDateIso: string | null;
  reportDateLabel: string | null;
  referenceMismatch: boolean;
  rows: SeiItemRetailRow[];
  fetchedAt: string;
};

export type ShijouSeiDashboardError = {
  ok: false;
  message: string;
  requestedDateIso: string;
};
