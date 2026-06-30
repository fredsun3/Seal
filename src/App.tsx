import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalSearch from "@/components/GlobalSearch";
import Home from "@/pages/Home";
import ScriptDetail from "@/pages/ScriptDetail";
import SurnameDetail from "@/pages/SurnameDetail";
import ScriptCharDetail from "@/pages/ScriptCharDetail";
import QianziwenDetail from "@/pages/QianziwenDetail";
import SanzijingDetail from "@/pages/SanzijingDetail";

export default function App() {
  // basename 适配 GitHub Pages 子路径 /Seal/
  return (
    <Router basename="/Seal">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/xiaozhuan" element={<ScriptDetail />} />
            <Route path="/dazhuan" element={<ScriptDetail />} />
            <Route path="/niaochongzhuan" element={<ScriptDetail />} />
            {/* 单篆体单字详情页:展示指定字在指定篆体下的放大字形 */}
            {/* 使用 :scriptId 捕获篆体名,使 ScriptCharDetail 能正确读取参数 */}
            <Route path="/:scriptId/:charId" element={<ScriptCharDetail />} />
            {/* 姓氏三篆详情页:展示指定百家姓在三种篆体下的对比 */}
            <Route path="/surname/:surnameId" element={<SurnameDetail />} />
            {/* 千字文详细介绍页:展示千字文原篇全文与逐联注释释义 */}
            <Route path="/qianziwen" element={<QianziwenDetail />} />
            {/* 三字经详细介绍页:展示三字经原篇全文与逐联注释释义 */}
            <Route path="/sanzijing" element={<SanzijingDetail />} />
          </Routes>
        </main>
        <Footer />
        {/* 全局固定搜索入口:任意页面均可快捷精准搜索百家姓 */}
        <GlobalSearch />
      </div>
    </Router>
  );
}
