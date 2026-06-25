import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import type { ScriptId } from "@/data/scripts";

interface SealCharacterProps {
  char: string;
  script: ScriptId;
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * 三种篆体对应的字体 ID 列表(来自 yishuzi.org 篆体图片生成服务)
 * 按优先级排列,前一个缺字时自动回退到下一个
 * - xiaozhuan: 周崇谦小篆(字库最全)→ 迷你篆书 → 说文小篆(字库不全,仅作兜底)
 * - dazhuan: 金文大篆体(字库较全)
 * - niaochongzhuan: 经典繁印篆 → 经典繁方篆(印篆风格装饰性篆体)
 */
const FONT_MAP: Record<ScriptId, string[]> = {
  xiaozhuan: ["10086", "10081", "10087"],
  dazhuan: ["10078"],
  niaochongzhuan: ["10080", "10079"],
};

// 篆体图片 API 基址:开发环境走 vite 代理,生产环境直连 yishuzi.org(支持 HTTPS)
const SEAL_API_BASE = import.meta.env.DEV ? "/seal-api/make/" : "https://www.yishuzi.org/make/";

interface SingleCharProps {
  char: string;
  script: ScriptId;
  size: number;
}

/**
 * 单字篆体渲染
 * 通过 yishuzi.org 接口生成真正的篆体字形图片,红底金字
 * 支持字体回退:主字体缺字时自动尝试下一个字体
 * 所有字体都缺字时回退到楷书显示,保证内容可见
 */
function SingleSealChar({ char, script, size }: SingleCharProps) {
  const fontList = FONT_MAP[script];
  const [fontIndex, setFontIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // 字符或篆体变化时重置状态
  useEffect(() => {
    setFontIndex(0);
    setLoaded(false);
    setFailed(false);
  }, [char, script]);

  const currentFont = fontList[Math.min(fontIndex, fontList.length - 1)];

  // 构造篆体图片 URL(经 vite 代理,避免跨域)
  // 画布远大于字体,确保文字完整显示不被裁剪(鸟虫篆等字形较宽)
  const imgSrc = useMemo(() => {
    const imgSize = Math.round(size * 2.5);
    const fontSize = Math.round(size * 1.2);
    const params = new URLSearchParams({
      text: char,
      font: `${currentFont}.ttf`,
      size: String(fontSize),
      jiaodu: "0",
      bjys: "c8392e",
      ztys: "d4a017",
      width: String(imgSize),
      height: String(imgSize),
    });
    return `${SEAL_API_BASE}?${params.toString()}`;
  }, [char, currentFont, size]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // 缺字时服务端返回极小尺寸的空白图,通过 naturalWidth 判断
    if (img.naturalWidth < 10 || img.naturalHeight < 10) {
      tryNextFont();
      return;
    }

    // 进一步用 canvas 检测图片是否有实际内容
    // 缺字时服务端可能返回正常尺寸但内容为空白或方框的图片
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 缩小采样以提升性能
        const sampleSize = 50;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const data = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
        // 背景色为红色 #c8392e = (200, 57, 46)
        // 统计非背景像素数量(金色文字 #d4a017 = (212, 160, 23))
        let contentPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // 非红色背景像素视为内容(金色文字)
          if (!(r > 180 && g < 80 && b < 80)) {
            contentPixels++;
          }
        }
        // 内容像素占比小于 2% 视为缺字空白图
        const totalPixels = sampleSize * sampleSize;
        if (contentPixels < totalPixels * 0.02) {
          tryNextFont();
          return;
        }
      }
    } catch {
      // canvas 读取失败(跨域等),忽略检测,直接显示
    }
    setLoaded(true);
  };

  const tryNextFont = () => {
    if (fontIndex < fontList.length - 1) {
      setFontIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  const handleError = () => {
    if (fontIndex < fontList.length - 1) {
      setFontIndex((prev) => prev + 1);
    } else {
      setFailed(true);
    }
  };

  return (
    <div
      className="seal-char inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <>
          {/* 篆体图片 - 真正的篆体字形 */}
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`${char} - ${script}`}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: size,
              height: size,
              objectFit: "contain",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
          {/* 加载中占位 - 显示楷书淡影 */}
          {!loaded && (
            <span
              className="absolute font-serif select-none"
              style={{
                fontSize: size * 0.7,
                color: "rgba(240, 192, 64, 0.3)",
              }}
            >
              {char}
            </span>
          )}
        </>
      ) : (
        /* 所有字体都缺字时的回退 - 显示楷书金字 */
        <span
          className="font-serif select-none"
          style={{
            fontSize: size * 0.7,
            color: "#d4a017",
            fontWeight: 700,
          }}
        >
          {char}
        </span>
      )}
    </div>
  );
}

/**
 * 篆体字形渲染组件
 * 单字:直接渲染一张篆体图片
 * 复姓(多字):逐字独立渲染,每个字单独处理字体回退
 * 这样复姓中某字缺字时可单独回退,不影响其他字显示
 */
export default function SealCharacter({
  char,
  script,
  size = 80,
  className = "",
  animated = false,
}: SealCharacterProps) {
  // 复姓(多字):逐字独立渲染,横向排列
  // 每个字用独立图片请求与独立字体回退,避免一字缺字导致整图回退
  const content = char.length > 1 ? (
    <div
      className={`seal-char inline-flex items-center justify-center ${className}`}
      style={{ height: size }}
    >
      <div className="inline-flex items-center justify-center gap-1">
        {Array.from(char).map((c, i) => (
          <SingleSealChar key={`${c}-${i}`} char={c} script={script} size={size} />
        ))}
      </div>
    </div>
  ) : (
    <div className={`seal-char inline-flex items-center justify-center ${className}`}>
      <SingleSealChar char={char} script={script} size={size} />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.08, rotate: 2 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
