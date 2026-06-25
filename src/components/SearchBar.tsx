import { Search, X, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
  isDark?: boolean;
}

/**
 * 百家姓搜索框
 * 支持按汉字、拼音、释义模糊搜索
 * 包含明确的搜索按钮与重置按钮
 */
export default function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
  isDark = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // 快捷键 / 聚焦搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (document.activeElement?.tagName || "") as string
        )
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onChange]);

  // 主题样式
  const themeStyles = isDark
    ? {
        container: "bg-ink/50 border-bronze/30 focus-within:border-bronze focus-within:bg-ink/70",
        text: "text-paper",
        placeholder: "placeholder:text-bronze-light/40",
        btn: "bg-bronze/20 text-bronze-light border-bronze/40 hover:bg-bronze/30",
        resetBtn: "text-bronze-light/60 hover:text-bronze-light hover:bg-bronze/20",
        icon: "text-bronze-light/60",
        stat: "text-bronze-light/60",
        highlight: "text-bronze-light",
        empty: "text-cinnabar-light",
      }
    : {
        container: "bg-paper-light border-bronze/20 focus-within:border-cinnabar focus-within:bg-paper",
        text: "text-ink",
        placeholder: "placeholder:text-rubbing/50",
        btn: "bg-cinnabar text-paper hover:bg-cinnabar-dark",
        resetBtn: "text-rubbing/60 hover:text-ink hover:bg-ink/10",
        icon: "text-rubbing/70",
        stat: "text-rubbing",
        highlight: "text-cinnabar",
        empty: "text-cinnabar",
      };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 搜索输入区域 */}
      <div
        className={`relative flex items-center gap-2 pl-4 pr-2 py-2 rounded-lg border-2 transition-all ${themeStyles.container} ${
          isFocused ? (isDark ? "ring-2 ring-bronze/30" : "ring-2 ring-cinnabar/20") : ""
        }`}
      >
        {/* 搜索图标 */}
        <Search size={18} className={`flex-shrink-0 pointer-events-none ${themeStyles.icon}`} />

        {/* 输入框 */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            // 阻止回车键触发表单提交或页面跳转
            if (e.key === "Enter") {
              e.preventDefault();
              inputRef.current?.blur();
            }
          }}
          placeholder="搜索百家姓(汉字 / 拼音 / 释义)"
          className={`flex-1 min-w-0 bg-transparent outline-none font-serif text-sm ${themeStyles.text} ${themeStyles.placeholder}`}
        />

        {/* 清除按钮(有输入内容时显示) */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${themeStyles.resetBtn}`}
            aria-label="清除搜索"
            title="清除搜索"
          >
            <X size={16} />
          </button>
        )}

        {/* 搜索按钮 */}
        <button
          type="button"
          onClick={() => {
            // 点击搜索按钮时,确保输入框失焦,触发已输入内容的过滤结果展示
            inputRef.current?.blur();
          }}
          className={`flex-shrink-0 px-4 py-1.5 rounded-md font-serif text-sm transition-all border ${themeStyles.btn}`}
          title="搜索"
        >
          搜索
        </button>
      </div>

      {/* 搜索结果统计 */}
      {value && (
        <div className={`mt-3 flex items-center justify-center gap-3 text-xs font-serif ${themeStyles.stat}`}>
          {resultCount > 0 ? (
            <>
              <span>
                找到 <span className={themeStyles.highlight}>{resultCount}</span> / {totalCount} 字
              </span>
              <span className="opacity-40">|</span>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  inputRef.current?.focus();
                }}
                className={`inline-flex items-center gap-1 transition-colors ${themeStyles.resetBtn}`}
              >
                <RotateCcw size={12} />
                重置
              </button>
            </>
          ) : (
            <span className={themeStyles.empty}>
              未找到与「{value}」匹配的百家姓,请尝试其他关键词
            </span>
          )}
        </div>
      )}

      {/* 快捷键提示 */}
      {!value && (
        <div className={`mt-2 text-center text-[10px] font-serif opacity-50 ${themeStyles.stat}`}>
          支持汉字、拼音、释义搜索 · 按 <kbd className={`px-1.5 py-0.5 rounded border ${isDark ? "border-bronze/30" : "border-bronze/20"}`}>/</kbd> 快速聚焦
        </div>
      )}
    </div>
  );
}
