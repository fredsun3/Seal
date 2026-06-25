import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, BookOpen, Sparkles, Scroll, Grid3x3 } from "lucide-react";
import { scripts } from "@/data/scripts";
import { surnames } from "@/data/surnames";
import ScriptCard from "@/components/ScriptCard";
import Timeline from "@/components/Timeline";
import SealCharacter from "@/components/SealCharacter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero 主视觉 */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ink">
        {/* 背景纹理 */}
        <div className="absolute inset-0 bronze-surface" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(184, 137, 58, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(200, 57, 46, 0.2) 0%, transparent 40%)",
          }}
        />

        {/* 装饰云纹 */}
        <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" stroke="#b8893a" strokeWidth="0.5">
            <path d="M20 50 Q30 30, 50 50 T80 50 Q70 70, 50 50 T20 50" />
            <path d="M20 30 Q30 10, 50 30 T80 30" />
            <path d="M20 70 Q30 50, 50 70 T80 70" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-32 h-32 opacity-10 rotate-180">
          <svg viewBox="0 0 100 100" fill="none" stroke="#b8893a" strokeWidth="0.5">
            <path d="M20 50 Q30 30, 50 50 T80 50 Q70 70, 50 50 T20 50" />
            <path d="M20 30 Q30 10, 50 30 T80 30" />
            <path d="M20 70 Q30 50, 50 70 T80 70" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* 顶部标语 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bronze/30 bg-bronze/10">
              <Sparkles size={12} className="text-bronze-light" />
              <span className="text-xs tracking-[0.3em] text-bronze-light font-serif">
                千年篆韵 · 百家姓氏
              </span>
            </div>
          </motion.div>

          {/* 三种篆体并排展示"篆"字 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center gap-4 md:gap-12 mb-10"
          >
            {scripts.map((script, idx) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.2 }}
                className="flex flex-col items-center"
              >
                <div
                  className="animate-float rounded-lg p-4"
                  style={{ animationDelay: `${idx * 0.5}s`, backgroundColor: "#c8392e" }}
                >
                  <SealCharacter
                    char="篆"
                    script={script.id}
                    size={100}
                  />
                </div>
                <div className="mt-3 text-xs tracking-widest font-serif" style={{ color: "#f0c040" }}>
                  {script.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-paper mb-4 tracking-wider"
          >
            篆书之美
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-bronze-light/80 text-base md:text-lg font-serif mb-2 tracking-[0.2em]"
          >
            李斯小篆 · 大篆金文 · 鸟虫篆
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-paper/50 text-sm font-serif max-w-xl mx-auto leading-relaxed"
          >
            以《百家姓》为引,展三种篆体字形之妙。
            从青铜铭文到秦代规范,从古朴苍茫到华美装饰,
            一字一世界,一笔千年史。
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/xiaozhuan"
              className="px-8 py-3 bg-cinnabar text-paper rounded font-serif text-sm tracking-wider hover:bg-cinnabar-dark transition-all hover:shadow-seal-hover"
            >
              始览小篆
            </Link>
            <Link
              to="/dazhuan"
              className="px-8 py-3 border border-bronze/40 text-bronze-light rounded font-serif text-sm tracking-wider hover:bg-bronze/10 transition-all"
            >
              探寻金文
            </Link>
          </motion.div>
        </div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-bronze-light/50 animate-bounce" size={24} />
        </motion.div>
      </section>

      {/* 三种篆体导航卡 */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
              三篆总览 · OVERVIEW
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-3">
              三种篆体 各擅其美
            </h2>
            <p className="text-rubbing text-sm max-w-2xl mx-auto">
              小篆端庄典雅,大篆古朴苍茫,鸟虫篆华美瑰丽。
              同一汉字,三种风韵,尽显汉字造型之美。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {scripts.map((script, index) => (
              <ScriptCard key={script.id} script={script} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 时间轴 */}
      <section className="py-20 bg-paper-dark/20">
        <div className="container mx-auto">
          <Timeline />
        </div>
      </section>

      {/* 百家姓全集网格 */}
      <section className="py-20 lg:py-28 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
              <Grid3x3 size={12} />
              百家姓全集 · SURNAMES
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-3">
              百家姓 · 三篆可览
            </h2>
            <p className="text-rubbing text-sm max-w-2xl mx-auto">
              点击任一姓氏,即可查看其在小篆、大篆、鸟虫篆三种篆体下的字形对比与详解
            </p>
          </motion.div>

          {/* 百家姓网格 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-6xl mx-auto"
          >
            {surnames.map((surname, index) => (
              <motion.div
                key={surname.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.6) }}
              >
                <Link
                  to={`/surname/${surname.id}`}
                  className="group block aspect-square rounded-lg transition-all relative overflow-hidden"
                  style={{ backgroundColor: "#c8392e" }}
                  title={`${surname.kaishu} · ${surname.pinyin} · 点击查看三篆对比`}
                >
                  {/* 汉字 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-display text-2xl md:text-3xl group-hover:scale-110 transition-transform"
                      style={{ color: "#f0c040" }}
                    >
                      {surname.kaishu}
                    </span>
                  </div>

                  {/* 拼音(悬停显示) */}
                  <div
                    className="absolute bottom-0 left-0 right-0 text-[10px] font-serif text-center py-0.5 translate-y-full group-hover:translate-y-0 transition-transform"
                    style={{ backgroundColor: "rgba(154, 26, 20, 0.95)", color: "#f0c040" }}
                  >
                    {surname.pinyin}
                  </div>

                  {/* 排名角标 */}
                  {surname.rank && (
                    <div
                      className="absolute top-1 left-1 text-[9px] font-serif"
                      style={{ color: "rgba(240, 192, 64, 0.6)" }}
                    >
                      {surname.rank}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* 底部统计与提示 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-4 text-xs font-serif text-rubbing">
              <span>
                共 <span className="text-cinnabar font-bold">{surnames.length}</span> 字
              </span>
              <span className="opacity-30">|</span>
              <span>点击任一姓氏查看三篆对比</span>
              <span className="opacity-30">|</span>
              <span>支持快捷键 <kbd className="px-1.5 py-0.5 bg-paper-dark/40 rounded border border-bronze/20">Ctrl+K</kbd> 搜索</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 文化背景 */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
              文化渊源 · HERITAGE
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-3">
              字以载道 文以传世
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Scroll,
                title: "文字之始",
                content:
                  "汉字肇始于甲骨,成熟于金文。商周先民将文字铸刻于青铜礼器,以铭功记事,传承文明。大篆承载着青铜时代的礼乐精神,每一笔皆是历史的沉淀。",
                color: "bronze",
              },
              {
                icon: BookOpen,
                title: "统一规范",
                content:
                  "秦始皇统一六国,丞相李斯主持文字规范,创小篆为天下通行的标准字体。结束了「言语异声、文字异形」的混乱,奠定了汉字统一的基础,功在千秋。",
                color: "cinnabar",
              },
              {
                icon: Sparkles,
                title: "艺术升华",
                content:
                  "鸟虫篆将文字与绘画融为一体,以鸟首虫身装饰笔画,化实用为艺术。越王勾践剑铭熠熠生辉,汉代印章鸟虫蜿蜒,展现了汉字的装饰之美。",
                color: "patina",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="paper-card p-8 rounded-lg"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                    item.color === "bronze"
                      ? "bg-bronze/15 text-bronze"
                      : item.color === "cinnabar"
                      ? "bg-cinnabar/15 text-cinnabar"
                      : "bg-patina/15 text-patina"
                  }`}
                >
                  <item.icon size={20} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed font-serif">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 引用区 */}
      <section className="py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 bronze-surface opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-6xl text-bronze/40 font-display mb-4">"</div>
            <p className="font-display text-2xl md:text-3xl text-paper leading-relaxed mb-6">
              盖文字者,经艺之本,王政之始,
              <br />
              前人所以垂后,后人所以识古。
            </p>
            <p className="text-bronze-light/70 text-sm tracking-widest font-serif">
              —— 许慎《说文解字·叙》
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
