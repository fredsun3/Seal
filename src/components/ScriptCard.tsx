import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ScriptInfo } from "@/data/scripts";
import SealCharacter from "./SealCharacter";

interface ScriptCardProps {
  script: ScriptInfo;
  index: number;
}

export default function ScriptCard({ script, index }: ScriptCardProps) {
  const isBronze = script.id === "dazhuan";
  const isPatina = script.id === "niaochongzhuan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <Link
        to={`/${script.id}`}
        className={`group relative block overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2 ${
          isBronze || isPatina
            ? "bronze-surface shadow-bronze"
            : "paper-card shadow-paper"
        }`}
      >
        {/* 装饰角 */}
        <div className="absolute top-3 left-3 w-6 h-6 opacity-40 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={isBronze || isPatina ? "text-bronze-light" : "text-bronze"}>
            <path d="M2 2h8v8H4v4h8V2M14 2v8h4v4h-8v8h8v-4h-4" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 w-6 h-6 opacity-40 rotate-180 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={isBronze || isPatina ? "text-bronze-light" : "text-bronze"}>
            <path d="M2 2h8v8H4v4h8V2M14 2v8h4v4h-8v8h8v-4h-4" />
          </svg>
        </div>

        <div className="relative p-8 lg:p-10">
          {/* 字形预览 */}
          <div className="flex justify-center mb-6">
            <div
              className={`relative ${
                isBronze || isPatina ? "" : ""
              }`}
            >
              <SealCharacter
                char="篆"
                script={script.id}
                size={120}
                animated
              />
            </div>
          </div>

          {/* 标题 */}
          <div className="text-center mb-4">
            <div
              className={`inline-block px-3 py-1 mb-3 text-xs tracking-widest rounded ${
                isBronze || isPatina
                  ? "bg-bronze/20 text-bronze-light"
                  : "bg-cinnabar/10 text-cinnabar"
              }`}
            >
              {script.era} · {script.period}
            </div>
            <h3
              className={`font-display text-3xl mb-1 ${
                isBronze || isPatina ? "text-paper" : "text-ink"
              }`}
            >
              {script.fullName}
            </h3>
            <p
              className={`text-sm ${
                isBronze || isPatina ? "text-bronze-light/70" : "text-rubbing"
              }`}
            >
              {script.description}
            </p>
          </div>

          {/* 特征 */}
          <p
            className={`text-sm leading-relaxed text-center mb-6 ${
              isBronze || isPatina ? "text-paper/70" : "text-ink/70"
            }`}
          >
            {script.features}
          </p>

          {/* 进入按钮 */}
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-serif transition-all group-hover:gap-3 ${
                isBronze || isPatina
                  ? "bg-bronze/20 text-bronze-light border border-bronze/40 group-hover:bg-bronze/30"
                  : "bg-cinnabar text-paper group-hover:bg-cinnabar-dark"
              }`}
            >
              探索百家姓
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
