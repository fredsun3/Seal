import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { surnames, type SurnameCharacter } from "@/data/surnames";
import { scripts, type ScriptId } from "@/data/scripts";

/**
 * 全局固定搜索入口
 * 右下角浮动按钮 + 弹出式搜索面板
 * 支持从任意页面快速搜索百家姓并跳转到指定篆体页面
 */
export default function GlobalSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [targetScript, setTargetScript] = useState<ScriptId>("xiaozhuan");
  const inputRef = useRef<HTMLInputElement>(null);

  // 快捷键 Ctrl/Cmd + K 打开全局搜索
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // 打开时自动聚焦输入框并清空上次搜索
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // 搜索过滤:支持汉字、拼音、释义、源流、结构模糊匹配
  const results = useMemo<SurnameCharacter[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return surnames.filter((char) => {
      return (
        char.kaishu.includes(query.trim()) ||
        char.pinyin.toLowerCase().includes(term) ||
        char.meaning.toLowerCase().includes(term) ||
        char.origin.toLowerCase().includes(term) ||
        char.structure.toLowerCase().includes(term)
      );
    });
  }, [query]);

  // 跳转到姓氏三篆详情页,展示该字在三种篆体下的对比
  const handleSelect = (char: SurnameCharacter) => {
    navigate(`/surname/${char.id}`);
    setOpen(false);
  };

  // 直接以当前关键词跳转(在目标篆体页面内查看全部匹配结果)
  const handleSearchAll = () => {
    if (!query.trim()) return;
    const target = scripts.find((s) => s.id === targetScript) || scripts[0];
    navigate(`/${target.id}?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <>
      {/* 浮动搜索按钮 */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cinnabar text-paper shadow-seal-hover flex items-center justify-center hover:bg-cinnabar-dark transition-colors group"
        aria-label="搜索百家姓"
        title="搜索百家姓 (Ctrl+K)"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={24} className="group-hover:scale-110 transition-transform" />
        {/* 脉冲动画提示 */}
        <span className="absolute inset-0 rounded-full bg-cinnabar animate-ping opacity-20" />
      </motion.button>

      {/* 搜索面板模态框 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-ink/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-2xl bg-paper rounded-xl shadow-2xl border border-bronze/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 搜索输入区 */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-bronze/20 bg-paper-light/50">
                <Search size={20} className="flex-shrink-0 text-cinnabar" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearchAll();
                    }
                  }}
                  placeholder="搜索百家姓(汉字 / 拼音 / 释义 / 源流)"
                  className="flex-1 min-w-0 bg-transparent outline-none font-serif text-base text-ink placeholder:text-rubbing/50"
                />
                <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-serif text-rubbing bg-paper-dark/40 rounded border border-bronze/20">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 text-rubbing/60 hover:text-ink hover:bg-ink/10 rounded transition-colors"
                  aria-label="关闭"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 篆体选择 */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-bronze/15 bg-paper">
                <span className="text-xs font-serif text-rubbing flex-shrink-0">
                  查看于:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scripts.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setTargetScript(s.id)}
                      className={`px-3 py-1 rounded-full text-xs font-serif transition-all border ${
                        targetScript === s.id
                          ? "bg-cinnabar text-paper border-cinnabar"
                          : "bg-paper-light text-rubbing border-bronze/30 hover:border-cinnabar/50 hover:text-cinnabar"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 搜索结果 */}
              <div className="max-h-[50vh] overflow-y-auto">
                {!query.trim() ? (
                  /* 空状态:显示搜索提示与热门姓氏 */
                  <div className="px-5 py-8">
                    <div className="text-center text-sm font-serif text-rubbing/70 mb-6">
                      输入百家姓汉字、拼音或释义进行精准搜索
                    </div>
                    <div className="text-xs tracking-widest font-serif text-bronze mb-3">
                      热门姓氏
                    </div>
                    <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
                      {surnames.map((char) => (
                        <button
                          key={char.id}
                          type="button"
                          onClick={() => handleSelect(char)}
                          className="aspect-square flex items-center justify-center rounded font-display text-lg transition-all"
                          style={{ backgroundColor: "#c8392e", color: "#f0c040" }}
                          title={`${char.kaishu} · ${char.pinyin}`}
                        >
                          {char.kaishu}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  /* 无结果 */
                  <div className="px-5 py-12 text-center">
                    <div className="text-cinnabar font-serif text-sm mb-2">
                      未找到与「{query}」匹配的百家姓
                    </div>
                    <div className="text-xs font-serif text-rubbing/60">
                      请尝试其他关键词,如汉字、拼音或释义
                    </div>
                  </div>
                ) : (
                  /* 结果列表 */
                  <div className="py-2">
                    <div className="px-5 py-2 text-xs font-serif text-rubbing/70 flex items-center justify-between">
                      <span>
                        找到 <span className="text-cinnabar font-bold">{results.length}</span> 个匹配结果 · 点击查看三篆对比
                      </span>
                      <button
                        type="button"
                        onClick={handleSearchAll}
                        className="inline-flex items-center gap-1 text-cinnabar hover:text-cinnabar-dark transition-colors"
                      >
                        在{scripts.find((s) => s.id === targetScript)?.name}中查看全部
                        <ArrowRight size={12} />
                      </button>
                    </div>
                    {results.map((char) => (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => handleSelect(char)}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-cinnabar/5 transition-colors text-left group"
                      >
                        {/* 汉字 */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded bg-paper-light border border-bronze/20 group-hover:border-cinnabar/40 group-hover:bg-cinnabar/10 transition-all">
                          <span className="font-display text-2xl text-ink group-hover:text-cinnabar transition-colors">
                            {char.kaishu}
                          </span>
                        </div>
                        {/* 信息 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-sm text-ink font-bold">
                              {char.kaishu}
                            </span>
                            <span className="text-xs font-serif text-rubbing">
                              {char.pinyin}
                            </span>
                            {char.rank && (
                              <span className="text-[10px] font-serif text-bronze bg-bronze/10 px-1.5 py-0.5 rounded">
                                第{char.rank}位
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-serif text-rubbing/80 truncate mt-0.5">
                            {char.meaning}
                          </div>
                        </div>
                        {/* 跳转箭头 */}
                        <ArrowRight
                          size={16}
                          className="flex-shrink-0 text-rubbing/40 group-hover:text-cinnabar group-hover:translate-x-1 transition-all"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 底部提示 */}
              <div className="px-5 py-2.5 border-t border-bronze/15 bg-paper-light/30 flex items-center justify-between text-[10px] font-serif text-rubbing/60">
                <span>支持汉字 · 拼音 · 释义 · 源流 · 结构</span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-paper-dark/40 rounded border border-bronze/20 mr-1">↵</kbd>
                  查看全部
                  <kbd className="px-1.5 py-0.5 bg-paper-dark/40 rounded border border-bronze/20 mx-1">ESC</kbd>
                  关闭
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
