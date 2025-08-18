import { InventoryItem } from "./types";

export const INITIAL_ITEMS: InventoryItem[] = [
  {
    id: "nacl100",
    name: "NaCl 0.9% 100cc",
    qty: 8,
    unit: "pcs",
    supplierId: "ELDAN",
  },
  {
    id: "nacl500",
    name: "NaCl 0.9% 500cc",
    qty: 2,
    unit: "pcs",
    supplierId: "ELDAN",
  },
  {
    id: "nacl1000",
    name: "NaCl 0.9% 1000cc",
    qty: 8,
    unit: "pcs",
    supplierId: "ELDAN",
  },
  {
    id: "bicarb",
    name: "ביקרבונט 650 גרם",
    qty: 23,
    unit: "box",
    supplierId: "ELDAN",
  },
  {
    id: "highca",
    name: "תמיסת HIGH CA",
    qty: 20,
    unit: "box",
    supplierId: "ELDAN",
  },
  {
    id: "normca",
    name: "תמיסת NORMAL CA",
    qty: 13,
    unit: "box",
    supplierId: "ELDAN",
  },
  {
    id: "lowca",
    name: "תמיסת LOW CA",
    qty: 10,
    unit: "box",
    supplierId: "ELDAN",
  },
  {
    id: "lowca5l",
    name: "LOW CA מיכל גדול 500 ליטר",
    qty: 3,
    unit: "pcs",
    supplierId: "ELDAN",
  },
  { id: "16g", name: "מחט 16G", qty: 9, unit: "box", supplierId: "ELDAN" },
  { id: "17g", name: "מחט 17G", qty: 15, unit: "box", supplierId: "ELDAN" },
  {
    id: "sn",
    name: "סט ליניפרו SN",
    qty: 31,
    unit: "box",
    supplierId: "ELDAN",
  },
  {
    id: "cut",
    name: "CUT FILTER אולטראפילטר",
    qty: 8,
    unit: "pcs",
    supplierId: "ELDAN",
  },

  // ──────────────────────────
  // MAHER (added from your paper list; names are kept simple/usable)
  // Feel free to adjust qty and text to your exact wording.
  // ──────────────────────────

  {
    id: "ster_glove_7",
    name: "כפפות סטריליות מס' 7",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "ster_glove_7_5",
    name: "כפפות סטריליות מס' 7.5",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "ster_glove_8",
    name: "כפפות סטריליות מס' 8",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "ster_glove_8_5",
    name: "כפפות סטריליות מס' 8.5",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "nitrile_m",
    name: "כפפות ניטריל M",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "nitrile_l",
    name: "כפפות ניטריל L",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "nitrile_xl",
    name: "כפפות ניטריל XL",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "nitrile_s",
    name: "כפפות ניטריל S",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "tape_0_5cm",
    name: "מדבק 0.5 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "syr_2_5",
    name: "מזרק 2.5 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  { id: "syr_5", name: "מזרק 5 ס״מ", qty: 0, unit: "box", supplierId: "MAHER" },
  {
    id: "syr_10",
    name: "מזרק 10 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "syr_20",
    name: "מזרק 20 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "needle_pink",
    name: "מחט ורודה",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "needle_green",
    name: "מחט ירוקה",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "needle_blue",
    name: "מחט כחולה",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "heparin_cap",
    name: "פקק הפרין",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },
  { id: "iv_set", name: "סט עירוי", qty: 0, unit: "pcs", supplierId: "MAHER" },

  { id: "eye_pad", name: "פד עיני", qty: 0, unit: "box", supplierId: "MAHER" },
  {
    id: "gauze_nonsterile",
    name: "גזה לא סטרילית",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "gauze_pad_10x10",
    name: "פד גזה סטרילי 10×10 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "cotton_balls",
    name: "כדורי צמר גפן",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "gauze_balls",
    name: "כדורי גזה",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "ecg_electrode",
    name: "אלקטרודה למוניטור",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "micropore",
    name: "מיקרופור",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "surgical_mask",
    name: "מסיכה כירורגית",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "elastic_net_4",
    name: "רשת אלסטית מס' 4",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "syr_20_thread",
    name: "מזרק 20 ס״מ עם הברגה",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "cosmopor_10x8",
    name: "COSMOPOR 10×8 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "cosmopor_7_2x5",
    name: "COSMOPOR 7.2×5 ס״מ",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  { id: "gown", name: "חלוק", qty: 0, unit: "pcs", supplierId: "MAHER" },

  {
    id: "o2_mask",
    name: "מסיכת חמצן",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },
  {
    id: "o2_glasses",
    name: "משקפי חמצן",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },
  {
    id: "o2_mask_nebulizer",
    name: "מסיכת חמצן עם אנהלציה",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },

  {
    id: "chlorine_tabs",
    name: "כדורי כלור",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },
  {
    id: "stitch_cutter",
    name: "stitch cutter",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },

  {
    id: "septol_pump",
    name: "משאבת ספטול",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },
  {
    id: "green_paper",
    name: "נייר ירוק",
    qty: 0,
    unit: "box",
    supplierId: "MAHER",
  },

  {
    id: "medical_alcohol",
    name: "אלכוהול רפואי",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },

  { id: "septol", name: "ספטול", qty: 0, unit: "pcs", supplierId: "MAHER" },
  {
    id: "septol_scrub",
    name: "ספטול סקרב",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },

  { id: "povidone", name: "פולידין", qty: 0, unit: "pcs", supplierId: "MAHER" },
  {
    id: "foam_soap",
    name: "סבון קצף",
    qty: 0,
    unit: "pcs",
    supplierId: "MAHER",
  },
];
