import { useState, useEffect, useMemo } from "react";
import { useParams, Navigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookMarked, Scroll, Award } from "lucide-react";
import { getScriptById, scripts, type ScriptId } from "@/data/scripts";
import { surnames, type SurnameCharacter } from "@/data/surnames";
import CharacterGrid from "@/components/CharacterGrid";
import CharacterDetail from "@/components/CharacterDetail";
import SearchBar from "@/components/SearchBar";
import SealCharacter from "@/components/SealCharacter";

export default function ScriptDetail() {
  const { scriptId } = useParams<{ scriptId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<SurnameCharacter | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 验证路由参数(仅用于判断,不在此处提前返回,避免破坏 Hooks 调用顺序)
  const validIds: ScriptId[] = ["xiaozhuan", "dazhuan", "niaochongzhuan"];
  const isValidScript = !!scriptId && validIds.includes(scriptId as ScriptId);

  // 切换篆体时重置搜索与选中状态(避免上一页的搜索词/详情残留,影响新页面继续搜索)
  useEffect(() => {
    setSearchTerm("");
    setSelected(null);
  }, [scriptId]);

  // 读取 URL query 参数 ?q=xxx,实现从全局搜索精准跳转后自动填充搜索框
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchTerm(q);
      // 消费后清除 URL 中的 q 参数,避免刷新或返回时残留
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // 搜索过滤:支持汉字、拼音、释义模糊匹配(忽略大小写与空格)
  const filteredCharacters = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return surnames;
    return surnames.filter((char) => {
      return (
        char.kaishu.includes(searchTerm.trim()) ||
        char.pinyin.toLowerCase().includes(term) ||
        char.meaning.toLowerCase().includes(term) ||
        char.origin.toLowerCase().includes(term) ||
        char.structure.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  // 路由参数无效时跳转首页(此时所有 Hooks 已正常调用,不会导致顺序错乱)
  if (!isValidScript) {
    return <Navigate to="/" replace />;
  }

  const script = getScriptById(scriptId as ScriptId);
  const isDark = script.id === "dazhuan" || script.id === "niaochongzhuan";

  // 获取下一个篆体(用于底部切换)
  const currentIndex = scripts.findIndex((s) => s.id === script.id);
  const nextScript = scripts[(currentIndex + 1) % scripts.length];

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
              backgroundImage: `radial-gradient(circle at 30% 50%, ${script.color}33 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          {/* 返回链接 */}
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-serif mb-8 transition-colors ${
              isDark
                ? "text-bronze-light/70 hover:text-bronze-light"
                : "text-rubbing hover:text-ink"
            }`}
          >
            <ArrowLeft size={14} />
            返回总览
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧:字形展示 - 红底金字 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div
                className="relative p-12 rounded-lg"
                style={{ backgroundColor: "#c8392e" }}
              >
                <SealCharacter char="篆" script={script.id} size={180} />
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

              <p
                className={`text-sm mb-6 font-serif ${
                  isDark ? "text-bronze-light/80" : "text-rubbing"
                }`}
              >
                {script.description}
              </p>

              {/* 特征 */}
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

              {/* 代表作 */}
              <div
                className={`p-4 rounded-lg ${
                  isDark
                    ? "bg-ink/30 border border-bronze/20"
                    : "bg-paper-dark/30 border border-bronze/15"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookMarked
                    size={14}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`text-xs tracking-widest font-serif ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    代表作
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed font-serif ${
                    isDark ? "text-paper/80" : "text-ink/80"
                  }`}
                >
                  {script.representative}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 百家姓字形网格 */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div
              className={`inline-block px-4 py-1 mb-4 text-xs tracking-widest border rounded-full ${
                isDark
                  ? "text-bronze-light border-bronze/30"
                  : "text-bronze border-bronze/30"
              }`}
            >
              百家姓 · {script.name} · {surnames.length} 字
            </div>
            <h2
              className={`font-display text-3xl lg:text-4xl mb-3 ${
                isDark ? "text-paper" : "text-ink"
              }`}
            >
              {script.fullName}百家姓
            </h2>
            <p
              className={`text-sm font-serif ${
                isDark ? "text-bronze-light/60" : "text-rubbing"
              }`}
            >
              点击任一汉字,查看楷书对照、释义与字形解析
            </p>
          </motion.div>

          {/* 搜索框 */}
          <div className="mb-8">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={filteredCharacters.length}
              totalCount={surnames.length}
              isDark={isDark}
            />
          </div>

          <CharacterGrid
            characters={filteredCharacters}
            script={script.id}
            onSelect={setSelected}
            selectedId={selected?.id}
            isDark={isDark}
            searchTerm={searchTerm}
          />
        </div>
      </section>

      {/* 历史背景 */}
      <section
        className={`py-16 lg:py-20 ${
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
                历史渊源 · HISTORY
              </div>
              <h2
                className={`font-display text-3xl lg:text-4xl ${
                  isDark ? "text-paper" : "text-ink"
                }`}
              >
                {script.fullName}之源
              </h2>
            </div>

            <div
              className={`p-8 lg:p-10 rounded-lg relative ${
                isDark
                  ? "bg-ink/40 border border-bronze/20"
                  : "paper-card"
              }`}
            >
              {/* 装饰引号 */}
              <div
                className={`absolute top-4 left-6 text-6xl font-display opacity-20 ${
                  isDark ? "text-bronze" : "text-bronze"
                }`}
              >
                "
              </div>

              <div className="relative pt-4">
                <div className="flex items-center gap-2 mb-6">
                  <Scroll
                    size={18}
                    className={isDark ? "text-bronze-light" : "text-cinnabar"}
                  />
                  <span
                    className={`font-serif text-sm tracking-widest ${
                      isDark ? "text-bronze-light" : "text-cinnabar"
                    }`}
                  >
                    {script.era} · {script.period}
                  </span>
                </div>

                <p
                  className={`text-base leading-loose font-serif ${
                    isDark ? "text-paper/85" : "text-ink/85"
                  }`}
                  style={{ textIndent: "2em" }}
                >
                  {script.history}
                </p>

                {/* 代表作标签 */}
                <div className="mt-8 pt-6 border-t border-bronze/20">
                  <div
                    className={`text-xs tracking-widest mb-3 font-serif ${
                      isDark ? "text-bronze-light/70" : "text-rubbing"
                    }`}
                  >
                    传世代表
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {script.representative.split("、").map((item) => (
                      <span
                        key={item}
                        className={`px-3 py-1.5 rounded text-sm font-serif ${
                          isDark
                            ? "bg-bronze/15 text-bronze-light border border-bronze/30"
                            : "bg-cinnabar/8 text-cinnabar border border-cinnabar/20"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 切换其他篆体 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Link
            to={`/${nextScript.id}`}
            className={`group block max-w-4xl mx-auto p-8 rounded-lg transition-all ${
              nextScript.id === "dazhuan" || nextScript.id === "niaochongzhuan"
                ? "bronze-surface hover:shadow-bronze"
                : "paper-card hover:shadow-seal-hover"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`text-xs tracking-widest mb-2 font-serif ${
                    nextScript.id === "dazhuan" ||
                    nextScript.id === "niaochongzhuan"
                      ? "text-bronze-light/70"
                      : "text-rubbing"
                  }`}
                >
                  继续探索 · NEXT
                </div>
                <h3
                  className={`font-display text-2xl mb-1 ${
                    nextScript.id === "dazhuan" ||
                    nextScript.id === "niaochongzhuan"
                      ? "text-paper"
                      : "text-ink"
                  }`}
                >
                  {nextScript.fullName}
                </h3>
                <p
                  className={`text-sm font-serif ${
                    nextScript.id === "dazhuan" ||
                    nextScript.id === "niaochongzhuan"
                      ? "text-bronze-light/70"
                      : "text-rubbing"
                  }`}
                >
                  {nextScript.description}
                </p>
              </div>
              <div
                className={`flex-shrink-0 ${
                  nextScript.id === "dazhuan" ||
                  nextScript.id === "niaochongzhuan"
                    ? "text-bronze-light"
                    : "text-cinnabar"
                } group-hover:translate-x-2 transition-transform`}
              >
                <ArrowRight size={28} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 字形详情抽屉 */}
      <CharacterDetail
        character={selected}
        script={script.id}
        scriptInfo={script}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
