export type ScriptId = "xiaozhuan" | "dazhuan" | "niaochongzhuan";

export interface ScriptInfo {
  id: ScriptId;
  name: string;
  fullName: string;
  era: string;
  period: string;
  features: string;
  history: string;
  representative: string;
  color: string;
  bgClass: string;
  textClass: string;
  accent: string;
  description: string;
}

export const scripts: ScriptInfo[] = [
  {
    id: "xiaozhuan",
    name: "小篆",
    fullName: "李斯小篆",
    era: "秦代",
    period: "公元前221年",
    features:
      "线条匀称挺拔,结构对称方正,笔画粗细一致,字形呈纵长方形,端庄典雅,为汉字规范化之始。",
    history:
      "秦始皇统一六国后,丞相李斯主持统一文字,以秦国大篆为基础,简化规范而成小篆。李斯亲书《仓颉篇》,赵高作《爰历篇》,胡毋敬作《博学篇》,作为标准字书颁行天下。小篆结束了春秋战国时期「言语异声、文字异形」的混乱局面,是中国历史上第一次大规模的文字规范化运动。",
    representative: "泰山刻石、琅琊台刻石、峄山碑",
    color: "#c8392e",
    bgClass: "bg-paper",
    textClass: "text-ink",
    accent: "cinnabar",
    description: "秦相李斯所定,统一天下文字,端庄典雅",
  },
  {
    id: "dazhuan",
    name: "大篆",
    fullName: "大篆(金文)",
    era: "商周",
    period: "公元前1300年",
    features:
      "笔画浑厚古朴,结体错落多变,字形不拘一格,带有浓厚的象形意味,常铸刻于青铜器之上,斑驳苍茫。",
    history:
      "大篆是商周时期通行的汉字书体,以青铜器铭文(金文)为代表。商代甲骨文已具大篆雏形,西周时期金文趋于成熟,字形规整,笔画饱满。代表作毛公鼎铭文长达497字,为现存最长金文;散氏盘、大盂鼎、虢季子白盘并称「四大国宝」。大篆承载着青铜时代的礼乐文明,每一字皆是历史的印记。",
    representative: "毛公鼎、散氏盘、大盂鼎、虢季子白盘",
    color: "#b8893a",
    bgClass: "bg-ink",
    textClass: "text-bronze-light",
    accent: "bronze",
    description: "铸于钟鼎彝器,古朴苍茫,承载青铜文明",
  },
  {
    id: "niaochongzhuan",
    name: "鸟虫篆",
    fullName: "鸟虫篆",
    era: "春秋战国",
    period: "公元前500年",
    features:
      "笔画融入鸟、虫、鱼等动物形态,装饰性极强,线条婉转流动,华美瑰丽,为篆书中的装饰艺术巅峰。",
    history:
      "鸟虫篆源于春秋战国时期楚、吴、越等国,由篆书演变而来,以鸟首、虫身、鱼尾等纹样装饰笔画。越王勾践剑铭「越王鸠浅,自作用剑」即鸟虫篆典范。汉代广泛用于印章、铜镜、兵器,王莽时期尤为盛行。鸟虫篆将文字与绘画融为一体,是中国书法史上最具装饰美感的书体。",
    representative: "越王勾践剑铭、楚王酓鼎、汉代鸟虫书印",
    color: "#5a6b4a",
    bgClass: "bg-ink",
    textClass: "text-patina-light",
    accent: "patina",
    description: "鸟虫入笔,华美瑰丽,装饰篆书之巅",
  },
];

export const getScriptById = (id: ScriptId): ScriptInfo => {
  return scripts.find((s) => s.id === id) || scripts[0];
};
