import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import type { SurnameCharacter } from "@/data/surnames";
import type { ScriptId } from "@/data/scripts";
import SealCharacter from "./SealCharacter";

interface CharacterGridProps {
  characters: SurnameCharacter[];
  script: ScriptId;
  onSelect: (char: SurnameCharacter) => void;
  selectedId?: string;
  isDark?: boolean;
  searchTerm?: string;
}

export default function CharacterGrid({
  characters,
  script,
  onSelect,
  selectedId,
  isDark = false,
  searchTerm = "",
}: CharacterGridProps) {
  const navigate = useNavigate();

  // 点击字符跳转到单篆体单字详情页 /:scriptId/:charId
  const handleSelect = (char: SurnameCharacter) => {
    onSelect(char);
    navigate(`/${script}/${char.id}`);
  };
  // 无结果时显示提示
  if (characters.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-20 rounded-lg ${
          isDark
            ? "bg-ink/30 border border-bronze/20"
            : "paper-card"
        }`}
      >
        <SearchX
          size={48}
          className={isDark ? "text-bronze/50" : "text-rubbing/50"}
        />
        <p
          className={`mt-4 font-serif text-sm ${
            isDark ? "text-bronze-light/70" : "text-rubbing"
          }`}
        >
          未找到与「{searchTerm}」匹配的百家姓
        </p>
        <p
          className={`mt-1 text-xs font-serif ${
            isDark ? "text-bronze/50" : "text-rubbing/60"
          }`}
        >
          可尝试搜索汉字、拼音或释义
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
      {characters.map((char, index) => (
        <motion.button
          type="button"
          key={char.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: Math.min(index * 0.02, 0.3),
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.05, y: -4 }}
          onClick={() => handleSelect(char)}
          className="group relative aspect-square rounded-lg overflow-hidden transition-all duration-300"
          style={{ backgroundColor: "#c8392e" }}
        >
          {/* 序号 */}
          <div
            className="absolute top-1.5 left-2 text-[10px] font-serif z-10"
            style={{ color: "rgba(240, 192, 64, 0.6)" }}
          >
            {String(char.rank).padStart(2, "0")}
          </div>

          {/* 字形 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <SealCharacter
              char={char.kaishu}
              script={script}
              size={64}
            />
          </div>

          {/* 楷书对照(悬停显示) */}
          <div
            className="absolute bottom-0 left-0 right-0 py-1.5 px-2 transition-all duration-300"
            style={{ backgroundColor: "rgba(154, 26, 20, 0.95)" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm" style={{ color: "#f0c040" }}>
                {char.kaishu}
              </span>
              <span className="text-[10px]" style={{ color: "rgba(240, 192, 64, 0.7)" }}>
                {char.pinyin}
              </span>
            </div>
          </div>

          {/* 装饰角 */}
          <div
            className="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-80 transition-opacity"
            style={{ color: "#f0c040" }}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M1 1h4v4M11 1H7v4M1 11h4V7M11 11H7V7" />
            </svg>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
