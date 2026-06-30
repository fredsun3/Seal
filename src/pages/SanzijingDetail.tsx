import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Scroll,
  Search,
  Layers,
  Feather,
  Calendar,
} from "lucide-react";
import {
  sanzijing,
  sanzijingChapters,
  SANZIJING_TOTAL_CHARS,
  SANZIJING_TOTAL_LINES,
  SANZIJING_TOTAL_COUPLETS,
} from "@/data/sanzijing";

/**
 * 《三字经》详细介绍页
 * 展示三字经原篇全文,并逐联附注释释义
 * 支持按篇章筛选与关键字搜索
 */
export default function SanzijingDetail() {
  const [activeChapter, setActiveChapter] = useState<string>("全部");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCouplets = useMemo(() => {
    return sanzijing.filter((c) => {
      const matchChapter =
        activeChapter === "全部" || c.chapter === activeChapter;
      const matchSearch =
        searchTerm.trim() === "" ||
        c.text.includes(searchTerm.trim()) ||
        c.meaning.includes(searchTerm.trim()) ||
        c.pinyinUpper.includes(searchTerm.trim()) ||
        c.pinyinLower.includes(searchTerm.trim());
      return matchChapter && matchSearch;
    });
  }, [activeChapter, searchTerm]);

  const fullText = useMemo(() => {
    return sanzijing.map((c) => c.text);
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      {/* ===== 顶部 Banner ===== */}
      <section className="relative overflow-hidden bronze-surface">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #c8392e33 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" stroke="#b8893a" strokeWidth="0.5">
            <path d="M20 50 Q30 30, 50 50 T80 50 Q70 70, 50 50 T20 50" />
            <path d="M20 30 Q30 10, 50 30 T80 30" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-serif mb-8 text-bronze-light/70 hover:text-bronze-light transition-colors"
          >
            <ArrowLeft size={14} />
            返回首页
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-bronze/30 bg-bronze/10">
              <Scroll size={12} className="text-bronze-light" />
              <span className="text-xs tracking-[0.3em] text-bronze-light font-serif">
                蒙学经典 · THREE CHARACTER CLASSIC
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl text-paper mb-4 tracking-wider">
              三字经
            </h1>

            <p className="text-bronze-light/80 text-base font-serif mb-2 tracking-[0.2em]">
              南宋 · 王应麟 编次
            </p>
            <p className="text-paper/50 text-sm font-serif max-w-2xl mx-auto leading-relaxed">
              相传为王应麟所作,三字一句,两句一韵。涵盖教育、人伦、常识、历史、勤学,
              朗朗上口,流传最广,与《百家姓》《千字文》并称「三百千」。
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 text-bronze-light">
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {SANZIJING_TOTAL_CHARS}
                </div>
                <div className="text-[10px] tracking-widest mt-1">字</div>
              </div>
              <div className="w-px h-10 bg-bronze/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {SANZIJING_TOTAL_LINES}
                </div>
                <div className="text-[10px] tracking-widest mt-1">句</div>
              </div>
              <div className="w-px h-10 bg-bronze/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {SANZIJING_TOTAL_COUPLETS}
                </div>
                <div className="text-[10px] tracking-widest mt-1">联</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 典籍溯源 ===== */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
                典籍溯源 · ORIGIN
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-ink mb-3">
                蒙学第一书
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: Calendar,
                  title: "成书年代",
                  content: "相传成书于南宋末年(约公元13世纪),距今约八百年,明清以来广为流传。",
                },
                {
                  icon: Feather,
                  title: "编撰者",
                  content: "王应麟,字伯厚,号深宁居士,南宋学者。博学多识,著述甚丰,学者称「厚斋先生」。",
                },
                {
                  icon: Layers,
                  title: "体例特色",
                  content: "三字一句,两句一联,朗朗上口。以最浅显之语,涵盖最广博之知,便于蒙童记诵。",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="paper-card p-6 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-cinnabar/10 text-cinnabar">
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-display text-xl text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed font-serif">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="paper-card p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-cinnabar" />
                <span className="text-xs tracking-widest font-serif text-cinnabar">
                  背景概述
                </span>
              </div>
              <p className="text-sm text-ink/80 leading-loose font-serif mb-3">
                《三字经》相传为南宋学者王应麟所作(亦有区适子所作之说),
                全书三字一句,两句一联,朗朗上口,便于记诵。
                其内容包罗万象,从教育理念到人伦常识,从天文地理到历史朝代,从勤学典故到励志劝勉,
                以最浅白的语言涵盖最广博的知识,被誉为「蒙学之冠」。
              </p>
              <p className="text-sm text-ink/80 leading-loose font-serif">
                自宋元以来,《三字经》一直是儿童启蒙教育的首选读本,
                与《百家姓》《千字文》并称「三百千」,影响深远。
                其开篇「人之初,性本善」六字,几乎妇孺皆知,成为中国传统文化中最广为人知的格言之一。
                全书虽短,却浓缩了中华文化的核心价值与历史脉络,堪称袖珍版的中国文化百科全书。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 全文通览 ===== */}
      <section className="py-16 bg-paper-dark/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
                原篇通览 · FULL TEXT
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-ink mb-3">
                三字经全文
              </h2>
              <p className="text-rubbing text-sm">
                三字一句,两句一联,朗朗上口
              </p>
            </div>

            <div className="paper-card p-8 lg:p-12 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
                {fullText.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.005, 0.5) }}
                    className="text-center font-serif text-sm text-ink/85 leading-loose tracking-wider"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 逐联注释 ===== */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
                逐联释义 · ANNOTATIONS
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-ink mb-3">
                原文与注释
              </h2>
              <p className="text-rubbing text-sm">
                逐联解读三字经意涵,明其典故,通其义理
              </p>
            </div>

            {/* 搜索框 */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-rubbing"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索原文或注释..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-bronze/20 bg-paper-light/50 text-sm font-serif text-ink placeholder:text-rubbing/50 focus:outline-none focus:border-bronze/50 transition-colors"
                />
              </div>
            </div>

            {/* 篇章筛选 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {["全部", ...sanzijingChapters].map((chapter) => (
                <button
                  key={chapter}
                  type="button"
                  onClick={() => setActiveChapter(chapter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all ${
                    activeChapter === chapter
                      ? "bg-cinnabar text-paper shadow-seal"
                      : "bg-paper-dark/30 text-rubbing border border-bronze/20 hover:border-bronze/40 hover:text-ink"
                  }`}
                >
                  {chapter}
                </button>
              ))}
            </div>

            {/* 注释列表 */}
            <div className="space-y-4">
              {filteredCouplets.length === 0 ? (
                <div className="text-center py-20 text-rubbing font-serif text-sm">
                  未找到匹配的内容,请尝试其他关键词。
                </div>
              ) : (
                filteredCouplets.map((couplet, index) => (
                  <motion.div
                    key={couplet.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                    className="paper-card rounded-lg overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* 左侧:序号与原文 */}
                      <div
                        className="md:w-2/5 p-6 lg:p-8 flex flex-col justify-center"
                        style={{ backgroundColor: "#c8392e" }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-[10px] font-serif tracking-widest px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "rgba(212, 160, 23, 0.2)",
                              color: "#f0c040",
                            }}
                          >
                            第 {couplet.id} 联
                          </span>
                          <span
                            className="text-[10px] font-serif tracking-widest px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "rgba(212, 160, 23, 0.15)",
                              color: "rgba(240, 192, 64, 0.85)",
                            }}
                          >
                            {couplet.chapter}
                          </span>
                        </div>

                        {/* 原文 */}
                        <div className="font-display text-2xl lg:text-3xl tracking-[0.2em] mb-2" style={{ color: "#f0c040" }}>
                          {couplet.text.split(" ")[0]}
                        </div>
                        <div className="font-display text-2xl lg:text-3xl tracking-[0.2em] mb-4" style={{ color: "#f0c040" }}>
                          {couplet.text.split(" ")[1] || ""}
                        </div>

                        {/* 拼音 */}
                        <div className="text-xs font-serif tracking-wider" style={{ color: "rgba(240, 192, 64, 0.65)" }}>
                          {couplet.pinyinUpper}　{couplet.pinyinLower}
                        </div>
                      </div>

                      {/* 右侧:注释释义 */}
                      <div className="md:w-3/5 p-6 lg:p-8 flex items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen size={14} className="text-cinnabar" />
                            <span className="text-xs tracking-widest font-serif text-cinnabar">
                              注释释义
                            </span>
                          </div>
                          <p className="text-sm text-ink/80 leading-loose font-serif">
                            {couplet.meaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 底部引用 ===== */}
      <section className="py-16 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bronze-surface opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-5xl text-bronze/40 font-display mb-4">"</div>
            <p className="font-display text-xl md:text-2xl text-paper leading-relaxed mb-4">
              人之初,性本善。
              <br />
              性相近,习相远。
            </p>
            <p className="text-bronze-light/70 text-sm tracking-widest font-serif">
              —— 《三字经》开篇
            </p>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-cinnabar text-paper rounded font-serif text-sm tracking-wider hover:bg-cinnabar-dark transition-all hover:shadow-seal-hover"
              >
                <ArrowLeft size={14} />
                返回首页
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
