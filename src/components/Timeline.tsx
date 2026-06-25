import { motion } from "framer-motion";

const timelineData = [
  {
    era: "商代",
    period: "约前1300年",
    title: "甲骨文",
    desc: "刻于龟甲兽骨,汉字之始",
    color: "#8b6f47",
  },
  {
    era: "西周",
    period: "约前1000年",
    title: "大篆·金文",
    desc: "铸于青铜礼器,古朴苍茫",
    color: "#b8893a",
    highlight: true,
  },
  {
    era: "春秋战国",
    period: "约前500年",
    title: "鸟虫篆",
    desc: "鸟虫入笔,华美装饰",
    color: "#5a6b4a",
    highlight: true,
  },
  {
    era: "秦代",
    period: "前221年",
    title: "小篆",
    desc: "李斯统一文字,规范天下",
    color: "#c8392e",
    highlight: true,
  },
  {
    era: "汉代",
    period: "前206年",
    title: "隶书",
    desc: "隶变古今,化圆为方",
    color: "#3a4b5a",
  },
];

export default function Timeline() {
  return (
    <div className="relative py-12">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block px-4 py-1 mb-4 text-xs tracking-widest text-bronze border border-bronze/30 rounded-full">
          汉字演变 · EVOLUTION
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-ink mb-3">
          千年文脉 字形流变
        </h2>
        <p className="text-rubbing text-sm">
          从青铜铭文到秦代小篆,汉字在岁月中淬炼成形
        </p>
      </motion.div>

      {/* 时间轴 */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* 横线 */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-bronze/40 to-transparent" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 relative">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col items-center ${
                index % 2 === 0 ? "md:mt-0" : "md:mt-16"
              }`}
            >
              {/* 节点 */}
              <div className="relative z-10 mb-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    item.highlight
                      ? "bg-paper border-current"
                      : "bg-paper/50 border-bronze/40"
                  }`}
                  style={{ color: item.color }}
                >
                  {item.highlight && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </div>
              </div>

              {/* 内容卡片 */}
              <div
                className={`text-center px-2 ${
                  item.highlight ? "" : "opacity-70"
                }`}
              >
                <div
                  className="text-[10px] tracking-widest mb-1"
                  style={{ color: item.color }}
                >
                  {item.era}
                </div>
                <div
                  className={`font-display text-lg mb-1 ${
                    item.highlight ? "text-ink" : "text-ink/60"
                  }`}
                >
                  {item.title}
                </div>
                <div className="text-[10px] text-rubbing mb-2">
                  {item.period}
                </div>
                <p className="text-xs text-ink/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
