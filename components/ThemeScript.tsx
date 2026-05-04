/**
 * FOUC 回避用の同期インラインスクリプト。
 * - localStorage の "theme" を読む（"light" | "dark" | "system"）。
 * - 値が "dark"、または "system"（または未保存）で OS が dark のときに <html> に `.dark` を付ける。
 * - 例外時は何もしない（= light）。
 *
 * Server Component。ルートレイアウトの <body> の最初に置く想定（<head> に置くのが理想だが、
 * App Router の仕様上 <body> 冒頭でも同期実行されるため、最初の描画前に class が決まる）。
 *
 * NOTE: 文字列リテラルで埋め込む（ビルド時に最小化される）。
 */
const THEME_INIT_SCRIPT =
  '(function(){try{var t=localStorage.getItem("theme");var s=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=t==="dark"||(t!=="light"&&s);document.documentElement.classList.toggle("dark",d);}catch(e){}})();';

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}
