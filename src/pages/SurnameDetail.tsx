import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Scroll, Layers, Award } from "lucide-react";
import { surnames } from "@/data/surnames";
import { scripts } from "@/data/scripts";
import SealCharacter from "@/components/SealCharacter";

/**
 * 姓氏三篆详情页
 * 展示指定百家姓在三种篆体(小篆、大篆、鸟虫篆)下的字形对比
 */
export default function SurnameDetail() {
  const { surnameId } = useParams<{ surnameId: string }>();

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [surnameId]);

  const character = surnames.find((c) => c.id === surnameId);

  // 字不存在时跳转首页
  if (!character) {
    return <Navigate to="/" replace />;
  }

  // 获取相邻姓氏(便于浏览)
  const currentIndex = surnames.findIndex((c) => c.id === character.id);
  const prevSurname = currentIndex > 0 ? surnames[currentIndex - 1] : null;
  const nextSurname =
    currentIndex < surnames.length - 1 ? surnames[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-paper">
      {/* 顶部 Banner */}
      <section className="relative overflow-hidden bg-paper-dark/30">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #c8392e22 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          {/* 返回链接 */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-serif mb-8 text-rubbing hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} />
            返回总览
          </Link>

          {/* 标题区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* 楷书大字 */}
            <div className="inline-block relative mb-6">
              <div className="font-serif text-7xl lg:text-8xl text-ink leading-none">
                {character.kaishu}
              </div>
              <div className="absolute -top-2 -right-8 w-14 h-14 seal-stamp flex items-center justify-center text-paper font-display text-xs rotate-6">
                百家姓
              </div>
            </div>

            <div className="text-2xl font-serif text-cinnabar mb-2">
              {character.pinyin}
            </div>
            {character.rank && (
              <div className="inline-block px-3 py-1 text-xs font-serif text-bronze bg-bronze/10 rounded-full border border-bronze/20">
                百家姓第 {character.rank} 位
              </div>
            )}
            <p className="mt-4 text-sm font-serif text-rubbing max-w-xl mx-auto">
              {character.meaning}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 三篆对比展示 */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest border rounded-full text-bronze border-bronze/30">
              三篆对照 · TRIPLE SCRIPT
            </div>
            <h2 className="font-display text-3xl lg:text-4xl mb-3 text-ink">
              「{character.kaishu}」之三篆
            </h2>
            <p className="text-sm font-serif text-rubbing">
              同一汉字在三种篆体下的形态演变,点击进入对应篆体页面
            </p>
          </motion.div>

          {/* 三篆卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {scripts.map((script, index) => {
              return (
                <motion.div
                  key={script.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link
                    to={`/${script.id}/${character.id}`}
                    className="group block h-full rounded-lg overflow-hidden transition-all hover:shadow-2xl bg-cinnabar hover:shadow-seal-hover"
                  >
                    {/* 字形展示区 - 红底金字 */}
                    <div
                      className="relative flex items-center justify-center py-12"
                      style={{ backgroundColor: "#c8392e" }}
                    >
                      {/* 背景装饰 */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, #d4a017 0%, transparent 70%)`,
                        }}
                      />

                      <div className="relative">
                        <SealCharacter
                          char={character.kaishu}
                          script={script.id}
                          size={140}
                          animated
                        />
                        {/* 印章落款 */}
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 seal-stamp flex items-center justify-center text-paper font-display text-xs">
                          {script.name}
                        </div>
                      </div>
                    </div>

                    {/* 信息区 - 红底金字 */}
                    <div className="p-6 bg-cinnabar">
                      <div
                        className="inline-block px-2 py-0.5 mb-3 text-[10px] tracking-widest rounded"
                        style={{ backgroundColor: "rgba(212, 160, 23, 0.2)", color: "#f0c040" }}
                      >
                        {script.era} · {script.period}
                      </div>

                      <h3
                        className="font-display text-2xl mb-2"
                        style={{ color: "#f0c040" }}
                      >
                        {script.fullName}
                      </h3>

                      <p
                        className="text-xs font-serif mb-4 leading-relaxed"
                        style={{ color: "rgba(240, 192, 64, 0.75)" }}
                      >
                        {script.description}
                      </p>

                      {/* 进入提示 */}
                      <div
                        className="flex items-center gap-1 text-xs font-serif group-hover:gap-2 transition-all"
                        style={{ color: "#f0c040" }}
                      >
                        查看{script.name}字形
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 详细信息 */}
      <section className="py-16 lg:py-20 bg-paper-dark/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest border rounded-full text-bronze border-bronze/30">
                字形解析 · ANALYSIS
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-ink">
                「{character.kaishu}」之详解
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 字形结构 */}
              <div className="p-6 rounded-lg paper-card">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={18} className="text-cinnabar" />
                  <span className="text-xs tracking-widest font-serif text-cinnabar">
                    字形结构
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-serif text-ink/80">
                  {character.structure}
                </p>
              </div>

              {/* 姓氏源流 */}
              <div className="p-6 rounded-lg paper-card">
                <div className="flex items-center gap-2 mb-3">
                  <Scroll size={18} className="text-cinnabar" />
                  <span className="text-xs tracking-widest font-serif text-cinnabar">
                    姓氏源流
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-serif text-ink/80">
                  {character.origin}
                </p>
              </div>

              {/* 释义 */}
              <div className="p-6 rounded-lg paper-card">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={18} className="text-cinnabar" />
                  <span className="text-xs tracking-widest font-serif text-cinnabar">
                    释义
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-serif text-ink/80">
                  {character.meaning}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 相邻姓氏导航 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
            {/* 上一个 */}
            {prevSurname ? (
              <Link
                to={`/surname/${prevSurname.id}`}
                className="group p-5 rounded-lg paper-card hover:shadow-seal-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <ArrowLeft
                    size={20}
                    className="text-rubbing group-hover:text-cinnabar transition-colors"
                  />
                  <div>
                    <div className="text-xs font-serif text-rubbing mb-1">
                      上一字
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-ink group-hover:text-cinnabar transition-colors">
                        {prevSurname.kaishu}
                      </span>
                      <span className="text-xs font-serif text-rubbing">
                        {prevSurname.pinyin}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* 下一个 */}
            {nextSurname ? (
              <Link
                to={`/surname/${nextSurname.id}`}
                className="group p-5 rounded-lg paper-card hover:shadow-seal-hover transition-all text-right"
              >
                <div className="flex items-center justify-end gap-3">
                  <div>
                    <div className="text-xs font-serif text-rubbing mb-1">
                      下一字
                    </div>
                    <div className="flex items-baseline justify-end gap-2">
                      <span className="text-xs font-serif text-rubbing">
                        {nextSurname.pinyin}
                      </span>
                      <span className="font-display text-2xl text-ink group-hover:text-cinnabar transition-colors">
                        {nextSurname.kaishu}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-rubbing group-hover:text-cinnabar transition-colors"
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
