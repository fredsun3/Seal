import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-bronze/20 bg-paper-dark/30">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 seal-stamp flex items-center justify-center text-paper font-display text-lg">
                篆
              </div>
              <div>
                <div className="font-display text-lg text-ink">篆书之美</div>
                <div className="text-[10px] text-rubbing tracking-widest">
                  SEAL SCRIPT GALLERY
                </div>
              </div>
            </div>
            <p className="text-sm text-ink/60 leading-relaxed font-serif">
              以《百家姓》为引,展三种篆体之形。
              承千年文脉,赏汉字之美。
            </p>
          </div>

          {/* 篆体导航 */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4 tracking-wider">
              三种篆体
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/xiaozhuan"
                  className="text-sm text-ink/60 hover:text-cinnabar transition-colors font-serif"
                >
                  李斯小篆 · 秦代规范
                </Link>
              </li>
              <li>
                <Link
                  to="/dazhuan"
                  className="text-sm text-ink/60 hover:text-bronze transition-colors font-serif"
                >
                  大篆金文 · 商周青铜
                </Link>
              </li>
              <li>
                <Link
                  to="/niaochongzhuan"
                  className="text-sm text-ink/60 hover:text-patina transition-colors font-serif"
                >
                  鸟虫篆 · 春秋装饰
                </Link>
              </li>
            </ul>
          </div>

          {/* 文化引用 */}
          <div>
            <h4 className="font-serif text-sm text-ink mb-4 tracking-wider">
              文献
            </h4>
            <ul className="space-y-2 text-sm text-ink/60 font-serif">
              <li>《说文解字》许慎</li>
              <li>《仓颉篇》李斯</li>
              <li>《百家姓》北宋</li>
              <li>《毛公鼎》西周</li>
            </ul>
          </div>
        </div>

        {/* 底部 */}
        <div className="pt-6 border-t border-bronze/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-rubbing font-serif">
            书者,散也。欲书先散怀抱,任情恣性,然后书之。
          </p>
          <p className="text-xs text-rubbing/60">
            篆书之美 · 百家姓字形展示
          </p>
        </div>
      </div>
    </footer>
  );
}
