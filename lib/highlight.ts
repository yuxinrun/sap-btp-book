/**
 * 轻量同步语法高亮器
 * ---------------------------------------------------------------------------
 * 设计原因：本站需要静态生成 260+ 页面。基于 WASM 的高亮引擎在多个 Next
 * 构建 worker 冷启动时会同步阻塞事件循环，导致单页生成超时。这里用纯 JS
 * 词法扫描实现常见语言（JS / JSON / YAML / Bash / SQL / XML / INI）的高亮，
 * 零异步、零原生依赖，构建与运行都稳定。
 */

const KEYWORDS: Record<string, Set<string>> = {
  javascript: new Set([
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'async', 'await', 'require', 'import', 'export', 'from', 'default', 'new',
    'class', 'extends', 'this', 'throw', 'try', 'catch', 'finally', 'typeof',
    'instanceof', 'of', 'in', 'delete', 'void', 'break', 'continue', 'switch',
    'case', 'do', 'yield', 'static', 'super', 'null', 'true', 'false',
  ]),
  json: new Set(['true', 'false', 'null']),
  yaml: new Set(['true', 'false', 'null', 'yes', 'no', 'on', 'off']),
  bash: new Set([
    'if', 'then', 'else', 'elif', 'fi', 'for', 'in', 'do', 'done', 'while',
    'case', 'esac', 'function', 'return', 'export', 'source', 'set', 'echo',
    'cd', 'cf', 'npm', 'node', 'curl', 'mkdir', 'mbt', 'git', 'sudo', 'cat',
    'grep', 'findstr', 'Invoke-WebRequest', 'echo', 'local',
  ]),
  sql: new Set([
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
    'DELETE', 'CREATE', 'TABLE', 'VIEW', 'AS', 'JOIN', 'ON', 'AND', 'OR',
    'NOT', 'NULL', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'KEY', 'PRIMARY',
    'entity', 'using', 'namespace', 'annotate', 'service', 'projection', 'on',
  ]),
  ini: new Set(['true', 'false', 'none']),
  xml: new Set([]),
  text: new Set([]),
};

const LINE_COMMENT: Record<string, string> = {
  javascript: '//', bash: '#', yaml: '#', ini: ';', sql: '--', text: '', json: '', xml: '',
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function span(cls: string, value: string) {
  return `<span class="${cls}">${escapeHtml(value)}</span>`;
}

function isWordChar(ch: string) {
  return /[A-Za-z0-9_$-]/.test(ch);
}

function tokenize(code: string, lang: string): string {
  const keywords = KEYWORDS[lang] ?? KEYWORDS.text;
  const commentMark = LINE_COMMENT[lang] ?? '';
  const caseInsensitiveKeywords = lang === 'sql';
  let out = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    const ch = code[i];

    // XML / HTML 标签
    if (lang === 'xml' && ch === '<') {
      const end = code.indexOf('>', i);
      if (end !== -1) {
        out += span('tok-tag', code.slice(i, end + 1));
        i = end + 1;
        continue;
      }
    }

    // XML 注释
    if (lang === 'xml' && code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      const stop = end === -1 ? n : end + 3;
      out += span('tok-com', code.slice(i, stop));
      i = stop;
      continue;
    }

    // 块注释 /* ... */
    if ((lang === 'javascript' || lang === 'sql') && code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      out += span('tok-com', code.slice(i, stop));
      i = stop;
      continue;
    }

    // 行注释
    if (commentMark && code.startsWith(commentMark, i)) {
      const end = code.indexOf('\n', i);
      const stop = end === -1 ? n : end;
      out += span('tok-com', code.slice(i, stop));
      i = stop;
      continue;
    }

    // 字符串（含转义）
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === quote) { j += 1; break; }
        if (code[j] === '\n' && quote !== '`') break;
        j += 1;
      }
      const text = code.slice(i, Math.min(j, n));
      const isKey = (lang === 'json' || lang === 'yaml') && /^\s*:/.test(code.slice(Math.min(j, n)));
      out += span(isKey ? 'tok-key' : 'tok-str', text);
      i = Math.min(j, n);
      continue;
    }

    // 数字
    if (/[0-9]/.test(ch) && !isWordChar(code[i - 1] ?? '')) {
      let j = i + 1;
      while (j < n && /[0-9._a-fA-FxX]/.test(code[j])) j += 1;
      out += span('tok-num', code.slice(i, j));
      i = j;
      continue;
    }

    // 标识符与关键字
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i + 1;
      while (j < n && isWordChar(code[j])) j += 1;
      const word = code.slice(i, j);
      const lookup = caseInsensitiveKeywords ? word.toUpperCase() : word;
      if (keywords.has(lookup)) {
        out += span('tok-kw', word);
      } else if ((lang === 'yaml' || lang === 'json' || lang === 'ini') && /^\s*:/.test(code.slice(j))) {
        out += span('tok-key', word);
      } else {
        out += escapeHtml(word);
      }
      i = j;
      continue;
    }

    out += escapeHtml(ch);
    i += 1;
  }

  return out;
}

const ALIASES: Record<string, string> = {
  js: 'javascript', jsx: 'javascript', ts: 'javascript', tsx: 'javascript',
  java: 'javascript', groovy: 'javascript', c: 'javascript',
  yml: 'yaml', sh: 'bash', shell: 'bash', console: 'bash', terminal: 'bash',
  cf: 'bash', cli: 'bash', dockerfile: 'bash', powershell: 'bash',
  txt: 'text', plain: 'text', plaintext: 'text', markdown: 'text', mdx: 'text',
  css: 'text', http: 'text', abap: 'text', html: 'xml',
  cds: 'sql', sqlscript: 'sql', properties: 'ini', env: 'ini',
  jsonschema: 'json',
};

const SUPPORTED = new Set(['javascript', 'json', 'yaml', 'bash', 'sql', 'xml', 'ini', 'text']);

const cache = new Map<string, string>();

/** 与原先接口一致，保持 async 以便服务端组件直接 await */
export async function highlightCode(code: string, rawLang: string): Promise<string> {
  const input = (ALIASES[rawLang.toLowerCase()] ?? rawLang.toLowerCase());
  const lang = SUPPORTED.has(input) ? input : 'text';
  const key = `${lang}\u0000${code}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const html = `<pre class="shiki"><code>${tokenize(code, lang)}</code></pre>`;
  cache.set(key, html);
  return html;
}
