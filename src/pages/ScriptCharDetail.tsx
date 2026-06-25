import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Scroll,
  Layers,
  Award,
} from "lucide-react";
import { surnames } from "@/data/surnames";
import { scripts, getScriptById, type ScriptId } from "@/data/scripts";
import SealCharacter from "@/components/SealCharacter";

/**
 * 单篆体单字详情页
 * 展示指定百家姓在指定篆体下的放大字形,并提供该字在其他两种篆体下的对照入口
 * URL 形如 /xiaozhuan/qian
 */
export default function ScriptCharDetail() {
  const { scriptId, charId } = useParams<{
    scriptId: string;
    charId: string;
  }>();

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scriptId, charId]);

  // 校验篆体参数
  const validIds: ScriptId[] = ["xiaozhuan", "dazhuan", "niaochongzhuan"];
  const isValidScript = !!scriptId && validIds.includes(scriptId as ScriptId);

  // 查找字符
  const character = surnames.find((c) => c.id === charId);

  // 参数无效时跳转首页(此处所有 Hooks 已正常调用)
  if (!isValidScript || !character) {
    return <Navigate to="/" replace />;
  }

  const script = getScriptById(scriptId as ScriptId);
  const isDark = script.id === "dazhuan" || script.id === "niaochongzhuan";

  // 获取相邻字符(便于浏览)
  const currentIndex = surnames.findIndex((c) => c.id === character.id);
  const prevChar = currentIndex > 0 ? surnames[currentIndex - 1] : null;
  const nextChar =
    currentIndex < surnames.length - 1 ? surnames[currentIndex + 1] : null;

  // 其他两种篆体(用于切换查看)
  const otherScripts = scripts.filter((s) => s.id !== script.id);

  return (
    <div className={`min-h-screen ${isDark ? "bg-ink" : "bg-paper"}`}>
      {/* 顶部 Banner */}
      <section
        className={`relative overflow-hidden ${
          isDark ? "bronze-surface" : "bg-paper-dark/30"
        }`}
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${script.color}33 0%, transparent 60%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          {/* 返回链接 */}
          <Link
            to={`/${script.id}`}
            className={`inline-flex items-center gap-2 text-sm font-serif mb-8 transition-colors ${
              isDark
                ? "text-bronze-light/70 hover:text-bronze-light"
                : "text-rubbing hover:text-ink"
            }`}
          >
            <ArrowLeft size={14} />
            返回{script.name}百家姓
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧:放大字形展示 - 红底金字 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div
                className="relative p-10 lg:p-14 rounded-lg"
                style={{ backgroundColor: "#c8392e" }}
              >
                <SealCharacter
                  char={character.kaishu}
                  script={script.id}
                  size={240}
                  animated
                />
                {/* 印章落款 */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 seal-stamp flex items-center justify-center text-paper font-display text-sm">
                  {script.name}
                </div>
              </div>
            </motion.div>

            {/* 右侧:信息 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className={`inline-block px-3 py-1 mb-4 text-xs tracking-widest rounded ${
                  isDark
                    ? "bg-bronze/20 text-bronze-light"
                    : "bg-cinnabar/10 text-cinnabar"
                }`}
              >
                {script.era} · {script.period}
              </div>

              <h1
                className={`font-display text-4xl lg:text-5xl mb-3 ${
                  isDark ? "text-paper" : "text-ink"
                }`}
              >
                {script.fullName}
              </h1>

              {/* 楷书对照 */}
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className="font-serif text-3xl"
                  style={{ color: "#d4a017" }}
                >
                  {character.kaishu}
                </span>
                <span
                  className={`text-lg font-serif ${
                    isDark ? "text-bronze-light/80" : "text-rubbing"
                  }`}
                >
                  {character.pinyin}
                </span>
                {character.rank && (
                  <span
                    className={`text-xs font-serif px-2 py-0.5 rounded ${
                      isDark
                        ? "bg-bronze/15 text-bronze-light"
                        : "bg-cinnabar/10 text-cinnabar"
                    }`}
                  >
                    百家姓第 {character.rank} 位
                  </span>
                )}
              </div>

              <p
                className={`text-sm mb-6 font-serif ${
                  isDark ? "text-bronze-light/80" : "text-rubbing"
                }`}
              >
                {script.description}
              </p>

              {/* 艺术特征 */}
              <div
                className={`p-4 rounded-lg mb-4 ${
                  isDark
                    ? "bg-ink/30 border border-bronze/20"
                    : "bg-paper-dark/30 border border-bronze/15"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award
                    size={14}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`text-xs tracking-widest font-serif ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    艺术特征
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed font-serif ${
                    isDark ? "text-paper/80" : "text-ink/80"
                  }`}
                >
                  {script.features}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 字形解析 */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <div
                className={`inline-block px-4 py-1 mb-4 text-xs tracking-widest border rounded-full ${
                  isDark
                    ? "text-bronze-light border-bronze/30"
                    : "text-bronze border-bronze/30"
                }`}
              >
                字形解析 · ANALYSIS
              </div>
              <h2
                className={`font-display text-3xl lg:text-4xl ${
                  isDark ? "text-paper" : "text-ink"
                }`}
              >
                「{character.kaishu}」之详解
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 字形结构 */}
              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-ink/40 border border-bronze/20"
                    : "paper-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Layers
                    size={18}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`text-xs tracking-widest font-serif ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    字形结构
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed font-serif ${
                    isDark ? "text-paper/80" : "text-ink/80"
                  }`}
                >
                  {character.structure}
                </p>
              </div>

              {/* 姓氏源流 */}
              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-ink/40 border border-bronze/20"
                    : "paper-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Scroll
                    size={18}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`text-xs tracking-widest font-serif ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    姓氏源流
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed font-serif ${
                    isDark ? "text-paper/80" : "text-ink/80"
                  }`}
                >
                  {character.origin}
                </p>
              </div>

              {/* 释义 */}
              <div
                className={`p-6 rounded-lg ${
                  isDark
                    ? "bg-ink/40 border border-bronze/20"
                    : "paper-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen
                    size={18}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`text-xs tracking-widest font-serif ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    释义
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed font-serif ${
                    isDark ? "text-paper/80" : "text-ink/80"
                  }`}
                >
                  {character.meaning}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 切换其他篆体查看同一字 */}
      <section
        className={`py-16 ${
          isDark ? "bg-ink-light/30" : "bg-paper-dark/20"
        }`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <div
                className={`inline-block px-4 py-1 mb-4 text-xs tracking-widest border rounded-full ${
                  isDark
                    ? "text-bronze-light border-bronze/30"
                    : "text-bronze border-bronze/30"
                }`}
              >
                切换篆体 · SWITCH SCRIPT
              </div>
              <h2
                className={`font-display text-2xl lg:text-3xl mb-2 ${
                  isDark ? "text-paper" : "text-ink"
                }`}
              >
                「{character.kaishu}」在其他篆体下的形态
              </h2>
              <p
                className={`text-sm font-serif ${
                  isDark ? "text-bronze-light/60" : "text-rubbing"
                }`}
              >
                点击查看同一汉字在不同篆体中的字形演变
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherScripts.map((s, index) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link
                    to={`/${s.id}/${character.id}`}
                    className="group block h-full rounded-lg overflow-hidden transition-all hover:shadow-2xl bg-cinnabar hover:shadow-seal-hover"
                  >
                    {/* 字形展示区 - 红底金字 */}
                    <div
                      className="relative flex items-center justify-center py-10"
                      style={{ backgroundColor: "#c8392e" }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, #d4a017 0%, transparent 70%)`,
                        }}
                      />
                      <div className="relative">
                        <SealCharacter
                          char={character.kaishu}
                          script={s.id}
                          size={120}
                          animated
                        />
                        <div className="absolute -bottom-2 -right-2 w-11 h-11 seal-stamp flex items-center justify-center text-paper font-display text-xs">
                          {s.name}
                        </div>
                      </div>
                    </div>
                    {/* 信息区 - 红底金字 */}
                    <div className="p-5 bg-cinnabar">
                      <div
                        className="inline-block px-2 py-0.5 mb-2 text-[10px] tracking-widest rounded"
                        style={{
                          backgroundColor: "rgba(212, 160, 23, 0.2)",
                          color: "#f0c040",
                        }}
                      >
                        {s.era} · {s.period}
                      </div>
                      <h3
                        className="font-display text-xl mb-1"
                        style={{ color: "#f0c040" }}
                      >
                        {s.fullName}
                      </h3>
                      <p
                        className="text-xs font-serif mb-3 leading-relaxed"
                        style={{ color: "rgba(240, 192, 64, 0.75)" }}
                      >
                        {s.description}
                      </p>
                      <div
                        className="flex items-center gap-1 text-xs font-serif group-hover:gap-2 transition-all"
                        style={{ color: "#f0c040" }}
                      >
                        查看{s.name}字形
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 相邻字符导航 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
            {/* 上一个 */}
            {prevChar ? (
              <Link
                to={`/${script.id}/${prevChar.id}`}
                className={`group p-5 rounded-lg transition-all text-left ${
                  isDark
                    ? "bg-ink/40 border border-bronze/20 hover:shadow-bronze"
                    : "paper-card hover:shadow-seal-hover"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ArrowLeft
                    size={20}
                    className={`${
                      isDark
                        ? "text-bronze-light/70 group-hover:text-bronze-light"
                        : "text-rubbing group-hover:text-cinnabar"
                    } transition-colors`}
                  />
                  <div>
                    <div
                      className={`text-xs font-serif mb-1 ${
                        isDark ? "text-bronze-light/60" : "text-rubbing"
                      }`}
                    >
                      上一字
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-display text-2xl ${
                          isDark
                            ? "text-paper group-hover:text-bronze-light"
                            : "text-ink group-hover:text-cinnabar"
                        } transition-colors`}
                      >
                        {prevChar.kaishu}
                      </span>
                      <span
                        className={`text-xs font-serif ${
                          isDark ? "text-bronze-light/60" : "text-rubbing"
                        }`}
                      >
                        {prevChar.pinyin}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* 下一个 */}
            {nextChar ? (
              <Link
                to={`/${script.id}/${nextChar.id}`}
                className={`group p-5 rounded-lg transition-all text-right ${
                  isDark
                    ? "bg-ink/40 border border-bronze/20 hover:shadow-bronze"
                    : "paper-card hover:shadow-seal-hover"
                }`}
              >
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <div
                      className={`text-xs font-serif mb-1 ${
                        isDark ? "text-bronze-light/60" : "text-rubbing"
                      }`}
                    >
                      下一字
                    </div>
                    <div className="flex items-baseline justify-end gap-2">
                      <span
                        className={`text-xs font-serif ${
                          isDark ? "text-bronze-light/60" : "text-rubbing"
                        }`}
                      >
                        {nextChar.pinyin}
                      </span>
                      <span
                        className={`font-display text-2xl ${
                          isDark
                            ? "text-paper group-hover:text-bronze-light"
                            : "text-ink group-hover:text-cinnabar"
                        } transition-colors`}
                      >
                        {nextChar.kaishu}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`${
                      isDark
                        ? "text-bronze-light/70 group-hover:text-bronze-light"
                        : "text-rubbing group-hover:text-cinnabar"
                    } transition-colors`}
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
