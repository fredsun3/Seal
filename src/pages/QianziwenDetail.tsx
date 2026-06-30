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
  X,
} from "lucide-react";
import {
  qianziwen,
  qianziwenChapters,
  QIANZIWEN_TOTAL_CHARS,
  QIANZIWEN_TOTAL_LINES,
  QIANZIWEN_TOTAL_COUPLETS,
} from "@/data/qianziwen";
import SealCharacter from "@/components/SealCharacter";
import { scripts, type ScriptId } from "@/data/scripts";

/**
 * 《千字文》详细介绍页
 * 展示千字文原篇全文,并逐联附注释释义
 * 支持按篇章筛选与关键字搜索
 */
export default function QianziwenDetail() {
  const [activeChapter, setActiveChapter] = useState<string>("全部");
  const [searchTerm, setSearchTerm] = useState("");
  // 全文篆体展示类型:原文 / 小篆 / 大篆 / 鸟虫篆
  const [activeScript, setActiveScript] = useState<string>("original");
  // 篆体模式下分批加载,避免一次请求过多图片
  const [displayCount, setDisplayCount] = useState(25);
  // 注释区篆体展示类型:原文 / 小篆 / 大篆 / 鸟虫篆
  const [annotationScript, setAnnotationScript] = useState<string>("original");
  // 注释区篆体模式分批加载
  const [annotationDisplayCount, setAnnotationDisplayCount] = useState(20);
  // 大图弹窗:选中的联索引(null=关闭)
  const [selectedCoupletIndex, setSelectedCoupletIndex] = useState<number | null>(null);

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ESC 键关闭大图弹窗
  useEffect(() => {
    if (selectedCoupletIndex === null) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCoupletIndex(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedCoupletIndex]);

  // 切换篆体时重置分批加载数量
  useEffect(() => {
    setDisplayCount(25);
  }, [activeScript]);

  // 切换注释区篆体或筛选条件时重置分批加载
  useEffect(() => {
    setAnnotationDisplayCount(20);
  }, [annotationScript, activeChapter, searchTerm]);

  // 按篇章与关键字筛选
  const filteredCouplets = useMemo(() => {
    return qianziwen.filter((c) => {
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

  // 全文原篇(仅原文,用于通览展示)
  const fullText = useMemo(() => {
    return qianziwen.map((c) => c.text);
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

        {/* 装饰云纹 */}
        <div className="absolute top-8 left-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" stroke="#b8893a" strokeWidth="0.5">
            <path d="M20 50 Q30 30, 50 50 T80 50 Q70 70, 50 50 T20 50" />
            <path d="M20 30 Q30 10, 50 30 T80 30" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          {/* 返回链接 */}
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
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-bronze/30 bg-bronze/10">
              <Scroll size={12} className="text-bronze-light" />
              <span className="text-xs tracking-[0.3em] text-bronze-light font-serif">
                蒙学经典 · THOUSAND CHARACTER CLASSIC
              </span>
            </div>

            {/* 标题 */}
            <h1 className="font-display text-5xl md:text-7xl text-paper mb-4 tracking-wider">
              千字文
            </h1>

            {/* 副标题 */}
            <p className="text-bronze-light/80 text-base font-serif mb-2 tracking-[0.2em]">
              南朝梁 · 周兴嗣 编次
            </p>
            <p className="text-paper/50 text-sm font-serif max-w-2xl mx-auto leading-relaxed">
              梁武帝命周兴嗣从王羲之书法中拓取一千个不重复的汉字,
              编成四言韵文。涵盖天文地理、修身治国,流传千年,为蒙学之首。
            </p>

            {/* 统计数据 */}
            <div className="mt-8 flex items-center justify-center gap-6 text-bronze-light">
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {QIANZIWEN_TOTAL_CHARS}
                </div>
                <div className="text-[10px] tracking-widest mt-1">字</div>
              </div>
              <div className="w-px h-10 bg-bronze/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {QIANZIWEN_TOTAL_LINES}
                </div>
                <div className="text-[10px] tracking-widest mt-1">句</div>
              </div>
              <div className="w-px h-10 bg-bronze/30" />
              <div className="text-center">
                <div className="font-display text-3xl text-paper">
                  {QIANZIWEN_TOTAL_COUPLETS}
                </div>
                <div className="text-[10px] tracking-widest mt-1">联</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 千字文简介 ===== */}
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
                天下第一字书
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: Calendar,
                  title: "成书年代",
                  content: "南朝梁武帝天监年间(约公元502-519年),距今约一千五百年。",
                },
                {
                  icon: Feather,
                  title: "编撰者",
                  content: "周兴嗣,字思纂,梁朝散骑侍郎。一夜编成,须发皆白,传为佳话。",
                },
                {
                  icon: Layers,
                  title: "体例特色",
                  content: "一千字无一重复,四字一句,两句一韵,文理贯通,便于记诵。",
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

            {/* 背景说明 */}
            <div className="paper-card p-8 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} className="text-cinnabar" />
                <span className="text-xs tracking-widest font-serif text-cinnabar">
                  背景概述
                </span>
              </div>
              <p className="text-sm text-ink/80 leading-loose font-serif mb-3">
                梁武帝萧衍为了教导诸王书法,命人从王羲之的书法作品中拓出一千个不重复的字,
                然后召见散骑侍郎周兴嗣,令其将这一千字编成有意义的韵文。
                周兴嗣苦思冥想,一夜之间将这一千个字编成了一篇四言韵文,
                传说他因用脑过度而须发皆白,留下了「白头周郎」的典故。
              </p>
              <p className="text-sm text-ink/80 leading-loose font-serif">
                《千字文》全文共二百五十句,每句四字,计一千字。
                内容上自天地开辟,下至为人处世,涵盖天文、地理、历史、修身、治学、农事等,
                知识广博而文辞优美。自隋唐以来,它一直是儿童启蒙教育的首选读本,
                与《三字经》《百家姓》并称「三百千」,影响深远。
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
                千字文全文
              </h2>
              <p className="text-rubbing text-sm">
                四字一句,两句一联,共二百五十句
              </p>
            </div>

            {/* 篆体选择器 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              <button
                type="button"
                onClick={() => setActiveScript("original")}
                className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all ${
                  activeScript === "original"
                    ? "bg-cinnabar text-paper shadow-seal"
                    : "bg-paper-dark/30 text-rubbing border border-bronze/20 hover:border-bronze/40 hover:text-ink"
                }`}
              >
                原文
              </button>
              {scripts.map((script) => (
                <button
                  key={script.id}
                  type="button"
                  onClick={() => setActiveScript(script.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all ${
                    activeScript === script.id
                      ? "bg-cinnabar text-paper shadow-seal"
                      : "bg-paper-dark/30 text-rubbing border border-bronze/20 hover:border-bronze/40 hover:text-ink"
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>

            {/* 全文展示 */}
            <div className="paper-card p-6 lg:p-10 rounded-lg">
              {activeScript === "original" ? (
                /* 原文展示 - 传统横排版式 */
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
              ) : (
                /* 篆体展示 - 红底金字,逐字渲染,分批加载 */
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {fullText.slice(0, displayCount).map((line, index) => {
                      const chars = Array.from(line).filter((c) => c !== " ");
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.005, 0.5) }}
                          className="rounded-md p-2.5 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
                          style={{ backgroundColor: "#c8392e" }}
                          onDoubleClick={() => setSelectedCoupletIndex(index)}
                          title="双击查看大图"
                        >
                          <div
                            className="text-[9px] font-serif tracking-widest mb-1 text-center"
                            style={{ color: "rgba(240, 192, 64, 0.6)" }}
                          >
                            第{index + 1}联
                          </div>
                          <div className="grid grid-cols-4 gap-0.5">
                            {chars.map((ch, i) => (
                              <SealCharacter
                                key={`${ch}-${i}`}
                                char={ch}
                                script={activeScript as ScriptId}
                                size={32}
                              />
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  {displayCount < fullText.length && (
                    <div className="text-center mt-8">
                      <button
                        type="button"
                        onClick={() => setDisplayCount((prev) => prev + 25)}
                        className="px-6 py-2.5 rounded-full text-xs font-serif tracking-wider transition-all bg-cinnabar/10 text-cinnabar border border-cinnabar/30 hover:bg-cinnabar hover:text-paper"
                      >
                        加载更多(已显示 {displayCount} / {fullText.length} 联)
                      </button>
                    </div>
                  )}
                </>
              )}
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
                逐联解读千字文意涵,明其典故,通其义理
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
              {["全部", ...qianziwenChapters].map((chapter) => (
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

            {/* 篆体切换 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              <span className="text-xs font-serif text-rubbing tracking-widest mr-2">篆体</span>
              <button
                type="button"
                onClick={() => setAnnotationScript("original")}
                className={`px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all ${
                  annotationScript === "original"
                    ? "bg-bronze text-paper"
                    : "bg-paper-dark/30 text-rubbing border border-bronze/20 hover:border-bronze/40 hover:text-ink"
                }`}
              >
                楷书
              </button>
              {scripts.map((script) => (
                <button
                  key={script.id}
                  type="button"
                  onClick={() => setAnnotationScript(script.id)}
                  className={`px-3 py-1 rounded-full text-xs font-serif tracking-wider transition-all ${
                    annotationScript === script.id
                      ? "bg-bronze text-paper"
                      : "bg-paper-dark/30 text-rubbing border border-bronze/20 hover:border-bronze/40 hover:text-ink"
                  }`}
                >
                  {script.name}
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
                <>
                  {(annotationScript === "original"
                    ? filteredCouplets
                    : filteredCouplets.slice(0, annotationDisplayCount)
                  ).map((couplet, index) => (
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
                        {annotationScript === "original" ? (
                          <>
                            <div className="font-display text-2xl lg:text-3xl tracking-[0.15em] mb-2" style={{ color: "#f0c040" }}>
                              {couplet.text.split(" ")[0]}
                            </div>
                            <div className="font-display text-2xl lg:text-3xl tracking-[0.15em] mb-4" style={{ color: "#f0c040" }}>
                              {couplet.text.split(" ")[1] || ""}
                            </div>
                          </>
                        ) : (
                          <div className="mb-4">
                            <div className="flex justify-center gap-1 mb-1.5">
                              {Array.from(couplet.text.split(" ")[0]).map((ch, i) => (
                                <SealCharacter
                                  key={`u-${i}`}
                                  char={ch}
                                  script={annotationScript as ScriptId}
                                  size={42}
                                />
                              ))}
                            </div>
                            <div className="flex justify-center gap-1">
                              {Array.from(couplet.text.split(" ")[1] || "").map((ch, i) => (
                                <SealCharacter
                                  key={`l-${i}`}
                                  char={ch}
                                  script={annotationScript as ScriptId}
                                  size={42}
                                />
                              ))}
                            </div>
                          </div>
                        )}

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
                  ))}
                  {annotationScript !== "original" &&
                    annotationDisplayCount < filteredCouplets.length && (
                      <div className="text-center pt-4">
                        <button
                          type="button"
                          onClick={() =>
                            setAnnotationDisplayCount((prev) => prev + 20)
                          }
                          className="px-6 py-2.5 rounded-full text-xs font-serif tracking-wider transition-all bg-cinnabar/10 text-cinnabar border border-cinnabar/30 hover:bg-cinnabar hover:text-paper"
                        >
                          加载更多(已显示 {annotationDisplayCount} / {filteredCouplets.length} 联)
                        </button>
                      </div>
                    )}
                </>
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
              天地玄黄,宇宙洪荒。
              <br />
              日月盈昃,辰宿列张。
            </p>
            <p className="text-bronze-light/70 text-sm tracking-widest font-serif">
              —— 《千字文》开篇
            </p>

            {/* 返回首页 */}
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

      {/* ===== 大图弹窗(双击联卡片触发) ===== */}
      {selectedCoupletIndex !== null && activeScript !== "original" && (() => {
        const couplet = qianziwen[selectedCoupletIndex];
        if (!couplet) return null;
        const upperChars = Array.from(couplet.text.split(" ")[0] || "");
        const lowerChars = Array.from(couplet.text.split(" ")[1] || "");
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            onClick={() => setSelectedCoupletIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#c8392e" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={() => setSelectedCoupletIndex(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", color: "#f0c040" }}
                aria-label="关闭"
              >
                <X size={18} />
              </button>

              {/* 联序号 */}
              <div className="text-center pt-6 pb-2">
                <span
                  className="inline-block px-4 py-1 rounded-full text-xs font-serif tracking-widest"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#f0c040" }}
                >
                  第 {selectedCoupletIndex + 1} 联 · {couplet.chapter}
                </span>
              </div>

              {/* 篆体大字展示 */}
              <div className="px-6 py-6">
                {/* 上句 */}
                <div className="flex justify-center gap-3 mb-4">
                  {upperChars.map((ch, i) => (
                    <SealCharacter
                      key={`u-${ch}-${i}`}
                      char={ch}
                      script={activeScript as ScriptId}
                      size={72}
                    />
                  ))}
                </div>
                {/* 下句 */}
                <div className="flex justify-center gap-3 mb-4">
                  {lowerChars.map((ch, i) => (
                    <SealCharacter
                      key={`l-${ch}-${i}`}
                      char={ch}
                      script={activeScript as ScriptId}
                      size={72}
                    />
                  ))}
                </div>
                {/* 拼音 */}
                <div
                  className="text-center text-sm font-serif tracking-wider mb-4"
                  style={{ color: "rgba(240, 192, 64, 0.7)" }}
                >
                  {couplet.pinyinUpper}　{couplet.pinyinLower}
                </div>
              </div>

              {/* 注释释义 */}
              <div className="px-6 pb-6">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={12} style={{ color: "#f0c040" }} />
                    <span
                      className="text-xs tracking-widest font-serif"
                      style={{ color: "#f0c040" }}
                    >
                      注释释义
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed font-serif"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    {couplet.meaning}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </div>
  );
}
