import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Scroll, Layers } from "lucide-react";
import type { SurnameCharacter } from "@/data/surnames";
import type { ScriptId, ScriptInfo } from "@/data/scripts";
import SealCharacter from "./SealCharacter";

interface CharacterDetailProps {
  character: SurnameCharacter | null;
  script: ScriptId;
  scriptInfo: ScriptInfo;
  onClose: () => void;
}

export default function CharacterDetail({
  character,
  script,
  scriptInfo,
  onClose,
}: CharacterDetailProps) {
  const isDark = script === "dazhuan" || script === "niaochongzhuan";

  return (
    <AnimatePresence>
      {character && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
          />

          {/* 抽屉 */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] z-50 overflow-y-auto ${
              isDark ? "bronze-surface" : "bg-paper"
            }`}
          >
            <div className="relative p-6 lg:p-8">
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark
                    ? "text-bronze-light hover:bg-bronze/20"
                    : "text-ink hover:bg-ink/10"
                }`}
                aria-label="关闭"
              >
                <X size={20} />
              </button>

              {/* 字形展示 - 红底金字 */}
              <div className="flex flex-col items-center mb-8 mt-4">
                <div
                  className="relative p-8 rounded-lg mb-4"
                  style={{ backgroundColor: "#c8392e" }}
                >
                  <SealCharacter
                    char={character.kaishu}
                    script={script}
                    size={160}
                  />
                  {/* 印章落款 */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 seal-stamp flex items-center justify-center text-paper font-display text-xs">
                    {scriptInfo.name}
                  </div>
                </div>

                {/* 楷书对照 */}
                <div className="text-center">
                  <div
                    className="font-serif text-5xl mb-2"
                    style={{ color: "#d4a017" }}
                  >
                    {character.kaishu}
                  </div>
                  <div
                    className="text-lg font-serif"
                    style={{ color: "#d4a017" }}
                  >
                    {character.pinyin}
                  </div>
                  {character.rank && (
                    <div
                      className="text-xs mt-1"
                      style={{ color: "rgba(212, 160, 23, 0.7)" }}
                    >
                      百家姓第 {character.rank} 位
                    </div>
                  )}
                </div>
              </div>

              {/* 信息列表 */}
              <div className="space-y-5">
                {/* 字形结构 */}
                <div
                  className={`p-4 rounded-lg ${
                    isDark
                      ? "bg-ink/30 border border-bronze/20"
                      : "bg-paper-dark/40 border border-bronze/15"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Layers
                      size={16}
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
                  className={`p-4 rounded-lg ${
                    isDark
                      ? "bg-ink/30 border border-bronze/20"
                      : "bg-paper-dark/40 border border-bronze/15"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Scroll
                      size={16}
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
                  className={`p-4 rounded-lg ${
                    isDark
                      ? "bg-ink/30 border border-bronze/20"
                      : "bg-paper-dark/40 border border-bronze/15"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen
                      size={16}
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

              {/* 底部篆体标识 */}
              <div className="mt-8 pt-6 border-t border-bronze/20 text-center">
                <div
                  className={`text-xs tracking-widest ${
                    isDark ? "text-bronze/50" : "text-rubbing/60"
                  }`}
                >
                  {scriptInfo.fullName} · {scriptInfo.era}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
